// Manages all state, automatically persisting to browser local storage.

import deepGet from 'get-value';
import deepSet from 'set-value';
import deepUnset from 'unset-value';
import event from '../event';
import logger from '../logger';
import {story} from '../story';

const {log} = logger('state');
let vars = {};
let defaults = {};

const stateDefaults = {
	'config.state.autosave': true,
	'config.state.saveKey': () => 'chapbook-state-' + story.name
};
export {stateDefaults as defaults};

function addGlobalProxy(target, name) {
	// If the property already exists on the target, do nothing.

	if (deepGet(target, name)) {
		return;
	}

	// Navigate through any nested object properties.

	const dottedProps = name.split('.');
	const targetName = dottedProps[dottedProps.length - 1];

	for (let i = 0; i < dottedProps.length - 1; i++) {
		target[dottedProps[i]] = target[dottedProps[i]] || {};
		target = target[dottedProps[i]];
	}

	// Set up the proxy.

	Object.defineProperty(target, targetName, {
		get() {
			get(name);
		},
		set(value) {
			set(name, value);
		},

		// Allow overwriting.
		configurable: true
	});
}

function removeGlobalProxy(target, name) {
	deepUnset(target, name);
}

// Resets all set variables, but not defaults. (If you want to do that, default
// a key to undefined.) This emits `state-change` events as it works.

export function reset() {
	function deleteProps(obj, objName) {
		Object.keys(obj).forEach(k => {
			const keyName = objName === '' ? k : `${objName}.${k}`;

			if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
				deleteProps(obj[k], keyName);
			} else {
				// We can't use a `set()` call here because we would be setting
				// off a ton of local storage serializations at once.

				const previous = obj[k];

				delete obj[k];
				removeGlobalProxy(window, objName);
				event.emit('state-change', {
					name: keyName,
					value: get(keyName),
					previous
				});
			}
		});
	}

	deleteProps(vars, '');

	if (get('config.state.autosave')) {
		save();
	}
}

// Sets a state variable, triggering a `state-change` event if it is changing a
// previous value.

export function set(name, value) {
	const previous = get(name);

	log(`Setting "${name}" to ${JSON.stringify(value)}`);
	deepSet(vars, name, value);
	addGlobalProxy(window, name);

	const now = get(name);

	if (now !== previous) {
		event.emit('state-change', {name, value: get(name), previous});
	}

	if (get('config.state.autosave')) {
		save();
	}
}

// Sets a state default, triggering a `state-change` event if that effectively
// causes the variable value's to change (e.g. if it is currently undefined).

export function setDefault(name, value) {
	const previous = get(name);

	log(`Defaulting "${name}" to ${JSON.stringify(value)}`);
	deepSet(defaults, name, value);
	addGlobalProxy(window, name);

	if (previous === null || previous === undefined) {
		event.emit('state-change', {name, value, previous});
	}
}

// Gets the value of a variable.

export function get(name) {
	const varValue = deepGet(vars, name);

	return varValue === undefined || varValue === null
		? deepGet(defaults, name)
		: varValue;
}

// Returns whether it is possible to save values to local storage.

export function canSave() {
	try {
		window.localStorage.setItem('chapbook-test', 'a');
		window.localStorage.removeItem('chapbook-test');
		return true;
	} catch (e) {
		return false;
	}
}

// Saves all values to local storage for later retrieval by restore().

export function save() {
	log('Saving to local storage');
	window.localStorage.setItem(
		get('config.state.saveKey'),
		JSON.stringify(vars)
	);
	log('Save complete');
}

// Returns whether there is state to restore in local storage.

export function canRestore() {
	return (
		canSave() &&
		window.localStorage.getItem(get('config.state.saveKey')) !== null
	);
}

// Restores state from local storage.

export function restore() {
	log('Restoring variables from local storage');

	const toRestore = JSON.parse(
		window.localStorage.getItem(get('config.state.saveKey'))
	);

	Object.keys(toRestore).forEach(v => set(v, toRestore[v]));
	log('Restore complete');
}
