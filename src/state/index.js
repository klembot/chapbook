/*
Manages all state, automatically persisting to browser local storage. This
stores state under the key chapbook-state-[story name]. This key cannot be set
in the state itself, since Chapbook would lose its ability to retrieve it after
a reload.

This must be loaded *after* the story module initializes so it can see the story
name.
*/

import deepGet from 'get-value';
import deepSet from 'set-value';
import deepUnset from 'unset-value';
import event from '../event';
import logger from '../logger';
import {name} from '../story';

const {log} = logger('state');
let saveKey;
let vars = {};
let defaults = {};
let computed = {};

const stateDefaults = {'config.state.autosave': true};

export {stateDefaults as defaults};

function addStateProxy(target, property) {
	/* If the property already exists on the target, do nothing. */

	if (target[property]) {
		return;
	}

	/* Set up the proxy. */

	Object.defineProperty(target, property, {
		get() {
			return get(property);
		},
		set(value) {
			set(property, value);
		},

		/* Allow overwriting. */
		configurable: true
	});

	/*
	If there are dots in the property, walk upwards. Doing this in ascending
	order does *not* cause problems with the existence check at the top of this
	function, because defining a 'foo.bar' property on an object does not
	automatically create a 'foo' property.
	*/

	const dottedProps = property.split('.');

	if (dottedProps.length > 1) {
		dottedProps.pop();
		addStateProxy(target, dottedProps.join('.'));
	}
}

function addLookupProxy(target, property) {
	/* If the property already exists on the target, do nothing. */

	if (target[property]) {
		return;
	}

	/*
	Unlike state proxies, we walk downward, creating empty objects as need be.
	This is because lookups aren't composable: that is, the lookup `foo` may
	return a completely different value than `foo.bar`, instead of `{bar: 'some
	value'}`.
	*/

	const dottedProps = property.split('.');
	const targetName = dottedProps[dottedProps.length - 1];

	for (let i = 0; i < dottedProps.length - 1; i++) {
		target[dottedProps[i]] = target[dottedProps[i]] || {};
		target = target[dottedProps[i]];
	}

	/* Set up the proxy. */

	Object.defineProperty(target, targetName, {
		get() {
			return get(property);
		},
		set() {
			throw new Error('Chapbook lookup variables may only be read.');
		},

		/* Allow overwriting. */
		configurable: true
	});
}

function removeProxy(target, property) {
	deepUnset(target, property);
}

/*
Does basic initialization of the state. This must be called before any other
calls, and must occur after the story is loaded from the DOM.
*/

export function init() {
	const storyName = name();

	if (storyName === undefined) {
		throw new Error('Cannot set up state: the story has no name');
	}

	saveKey = `chapbook-state-${storyName}`;
}

/*
Resets all set variables, but not defaults. (If you want to do that, default a
key to undefined.) This also has no effect on lookups. This emits `state-change`
events as it works.
*/

export function reset() {
	function deleteProps(obj, objName) {
		Object.keys(obj).forEach(k => {
			const keyName = objName === '' ? k : `${objName}.${k}`;

			if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
				deleteProps(obj[k], keyName);
			} else {
				/*
				We can't use a `set()` call here because we would be setting off
				a ton of local storage serializations at once.
				*/

				const previous = obj[k];

				delete obj[k];
				removeProxy(window, objName);
				event.emit('state-change', {
					name: keyName,
					value: get(keyName),
					previous
				});
			}
		});
	}

	deleteProps(vars, '');
	event.emit('state-reset');

	if (get('config.state.autosave')) {
		saveToStorage();
	}
}

/*
Returns whether two variable names belong to the same object. If two identical
variable names are passed, this returns true--this helps when listening to state
changes when a parent key is changed, e.g. if you want to listen to changes to
foo.bar, you should also listen to changes on foo.
*/

export function sameObject(a, b) {
	const aParts = a.split('.');
	const bParts = b.split('.');

	for (let i = 0; i < aParts.length && i < bParts.length; i++) {
		if (aParts[i] !== bParts[i]) {
			return false;
		}
	}

	return true;
}

/*
Sets a state variable, triggering a `state-change` event if it is changing a
previous value.
*/

export function set(name, value) {
	const previous = get(name);

	deepSet(vars, name, value);
	addStateProxy(window, name);

	if (value !== previous) {
		event.emit('state-change', {name, previous, value});
	}

	if (get('config.state.autosave')) {
		saveToStorage();
	}
}

/*
Sets a state default, triggering a `state-change` event if that effectively
causes the variable value's to change (e.g. if it is currently undefined).
*/

export function setDefault(name, value) {
	const previous = get(name);

	log(`Defaulting "${name}" to ${JSON.stringify(value)}`);
	deepSet(defaults, name, value);
	addStateProxy(window, name);

	if (previous === null || previous === undefined) {
		event.emit('state-change', {name, value, previous});
	}
}

/*
Sets a lookup variable -- read only, and whose value is generated by a
function. The function will receive get() and set() from this module as
arguments.

Lookup variables are not persisted.
*/

export function setLookup(name, callback) {
	const previous = get(name);

	log(`Adding lookup variable ${name}`);
	deepSet(computed, name, callback);
	addLookupProxy(window, name);

	if (previous === null || previous === undefined) {
		event.emit('state-change', {name, value: get(name), previous});
	}
}

/*
Gets the value of a variable.
*/

export function get(name) {
	const computedCallback = deepGet(computed, name);

	if (typeof computedCallback === 'function') {
		return computedCallback(get, set);
	}

	const varValue = deepGet(vars, name);

	return varValue === undefined || varValue === null
		? deepGet(defaults, name)
		: varValue;
}

/*
Returns an object representing the current state, that can be given back to
restoreFromObject(). Although this a plain JavaScript object, it should be
considered read-only.
*/

export function saveToObject() {
	return Object.assign({}, vars);
}

/*
Sets state based on a previously serialized object. This will trigger
`state-change` events as it works.
*/

export function restoreFromObject(previous) {
	reset();
	Object.keys(previous).forEach(v => set(v, previous[v]));
}

/*
Returns whether it is possible to save values to local storage.
*/

export function canSaveToStorage() {
	try {
		window.localStorage.setItem('chapbook-test', 'a');
		window.localStorage.removeItem('chapbook-test');
		return true;
	} catch (e) {
		return false;
	}
}

/*
Saves all values to local storage for later retrieval by restoreFromStorage().
*/

export function saveToStorage() {
	log('Saving to local storage: ' + JSON.stringify(saveToObject()));
	window.localStorage.setItem(saveKey, JSON.stringify(saveToObject()));
	log('Save complete');
}

/*
Returns whether there is state to restore in local storage.
*/

export function canRestoreFromStorage() {
	return canSaveToStorage() && window.localStorage.getItem(saveKey) !== null;
}

/*
Restores state from local storage.
*/

export function restoreFromStorage() {
	log('Restoring variables from local storage');
	restoreFromObject(JSON.parse(window.localStorage.getItem(saveKey)));
	log('Restore complete');
}

/*
Deletes the state from local storage. This should only be used in emergencies,
when something has gone very wrong; see `display/crash.js`. Under normal
circumstances, call `reset()` instead.

This has a `quiet` option which does not try to log any messages-- this is so
that the function does the minimum necessary, again if we suspect the state of
affairs is badly broken.
*/

export function purgeFromStorage(quiet) {
	if (!quiet) {
		log('Purging variables from local storage');
	}

	restoreFromObject(JSON.parse(window.localStorage.getItem(saveKey)));

	if (!quiet) {
		log('Purge complete');
	}
}

/*
Returns all variable names currently set.
*/

export function varNames(includeDefaults) {
	function catalog(obj, prefix, result = []) {
		return Object.keys(obj).reduce((out, k) => {
			if (typeof obj[k] === 'object' && obj[k] && !Array.isArray(obj[k])) {
				catalog(obj[k], prefix ? prefix + '.' + k : k, out);
			} else {
				let varName = prefix ? prefix + '.' + k : k;

				if (out.indexOf(varName) === -1) {
					out.push(varName);
				}
			}

			return out;
		}, result);
	}

	if (includeDefaults) {
		return catalog(defaults, null, catalog(vars, null)).sort();
	}

	return catalog(vars).sort();
}
