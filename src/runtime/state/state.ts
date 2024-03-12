/**
 * Manages all state, automatically persisting to browser local storage. This
 * stores state under the key chapbook-state-[story name]. This key cannot be
 * set in the state itself, since Chapbook would lose its ability to retrieve it
 * after a reload.
 *
 * This must be loaded *after* the story module initializes so it can see the
   story name.
 * @packageDocumentation
 */

import {get as deepGet, set as deepSet, unset as deepUnset} from 'lodash-es';
import {createLoggers} from '../logger';
import {ifid, name} from '../story/story';
import {isSettable} from '../util';
import {Lookup, Settable} from './types';

const {log, warn} = createLoggers('state');
let saveKey: string;
const defaults: Record<string, Settable> = {};
const lookups: Record<string, Lookup> = {};
const vars: Record<string, Settable> = {};

/**
 * Adds a state proxy to a target (usually `window`) so that both reading and
 * changing the value there also updates state. This is used so that state
 * variables are available in global context.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addStateProxy(target: any, property: string) {
	// If the property already exists on the target, do nothing.

	if (target[property]) {
		return;
	}

	// Set up the proxy.

	Object.defineProperty(target, property, {
		get() {
			return get(property);
		},
		set(value) {
			set(property, value);
		},

		// Allow overwriting.
		configurable: true
	});

	// If there are dots in the property, walk upwards. Doing this in ascending
	// order does *not* cause problems with the existence check at the top of this
	// function, because defining a 'foo.bar' property on an object does not
	// automatically create a 'foo' property.

	const dottedProps = property.split('.');

	if (dottedProps.length > 1) {
		dottedProps.pop();
		addStateProxy(target, dottedProps.join('.'));
	}
}

/**
 * Adds a read-only proxy to a target (usually `window`) which allows reading a
 * state value. This is used so that lookups are available in global context.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addLookupProxy(target: any, property: string) {
	// If the property already exists on the target, do nothing.

	if (target[property]) {
		return;
	}

	// Unlike state proxies, we walk downward, creating empty objects as need be.
	// This is because lookups aren't composable: that is, the lookup `foo` may
	// return a completely different value than `foo.bar`, instead of `{bar: 'some
	// value'}`.

	const dottedProps = property.split('.');
	const targetName = dottedProps[dottedProps.length - 1];

	for (let i = 0; i < dottedProps.length - 1; i++) {
		target[dottedProps[i]] = target[dottedProps[i]] || {};
		target = target[dottedProps[i]];
	}

	// Set up the proxy.

	Object.defineProperty(target, targetName, {
		get() {
			return get(property);
		},
		set() {
			throw new Error('Chapbook lookup variables may only be read.');
		},

		// Allow overwriting.
		configurable: true
	});
}

/**
 * Removes a state or lookup proxy from a target.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeProxy(target: any, property: string) {
	deepUnset(target, property);
}

/**
 * Does basic initialization of the state. This must be called before any other
 * calls, and must occur after the story is loaded from the DOM.
 */
export function initState() {
	const storyIfid = ifid();
	const storyName = name();

	if (storyName === undefined) {
		throw new Error('Cannot set up state: the story has no name');
	}

	saveKey = `chapbook-${storyName}-${storyIfid}`;
	setDefault('config.state.autosave', true);
}

/**
 * Resets all set variables, but not defaults. (If you want to do that, default
 * a key to undefined.) This also has no effect on lookups. This emits
 * `state-change` events on the window as it works, and a `state-reset` event
 * when it finishes.
 */
export function reset() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function deleteProps(obj: any, objName: string) {
		Object.keys(obj).forEach(k => {
			const keyName = objName === '' ? k : `${objName}.${k}`;

			if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
				deleteProps(obj[k], keyName);
			} else {
				// We can't use a `set()` call here because we would be setting off
				// a ton of local storage serializations at once.

				const previous = obj[k];

				delete obj[k];
				removeProxy(window, objName);
				window.dispatchEvent(
					new CustomEvent('state-change', {
						detail: {name: keyName, value: get(keyName), previous}
					})
				);
			}
		});
	}

	deleteProps(vars, '');
	window.dispatchEvent(new CustomEvent('state-reset'));

	if (get('config.state.autosave')) {
		saveToStorage();
	}
}

/**
 * Sets a state variable, emitting a `state-change` event on the window if it
 * is changing a previous value and saving changes.
 */
export function set(name: string, value: unknown) {
	const previous = get(name);

	if (!isSettable(value)) {
		warn(
			`Setting ${name} to ${JSON.stringify(
				value
			)} can't be saved permanently. This will work in the current session, but will not persist between sessions.`
		);
	}

	deepSet(vars, name, value);
	addStateProxy(window, name);

	if (value !== previous) {
		window.dispatchEvent(
			new CustomEvent('state-change', {detail: {previous, name, value}})
		);
	}

	if (get('config.state.autosave')) {
		saveToStorage();
	}
}

/**
 * Sets a state default, emitting a `state-change` event on the window if
 * that effectively causes the variable value's to change (e.g. if it is
 * currently undefined).
 */
export function setDefault(name: string, value: Settable) {
	const previous = get(name);

	log(`Defaulting "${name}" to ${JSON.stringify(value)}`);
	deepSet(defaults, name, value);
	addStateProxy(window, name);

	if (previous === null || previous === undefined) {
		window.dispatchEvent(
			new CustomEvent('state-change', {detail: {previous, name, value}})
		);
	}
}

/**
 * A convenience function that calls `setDefault()` for a set of names.
 */
export function setDefaults(defaults: Record<string, Settable>) {
	for (const name in defaults) {
		setDefault(name, defaults[name]);
	}
}

/**
 * Sets a lookup variable -- read only, and whose value is generated by a
 * function. The function will receive `get()` and `set()` from this module as
 * arguments. Lookup variables are not persisted.
 */
export function setLookup(name: string, callback: () => unknown) {
	const previous = get(name);

	log(`Adding lookup variable ${name}`);
	deepSet(lookups, name, callback);
	addLookupProxy(window, name);

	if (previous === null || previous === undefined) {
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {previous, name, value: get(name)}
			})
		);
	}
}

/**
 * Gets the value of a variable or lookup. The return type of this function is
 * unknown because an author may have altered it outside of this code.
 */
export function get(name: string): unknown {
	const lookup = deepGet(lookups, name);

	if (typeof lookup === 'function') {
		return lookup(get, set);
	}

	const varValue = deepGet(vars, name);
	const defaultValue = deepGet(defaults, name);

	// Fall back to a default if it is unset in variables.

	if (varValue === undefined || varValue === null) {
		return defaultValue;
	}

	// If either the variable or default is an object, we need to construct a
	// proxied object. We have two needs:
	//
	// 1. Merge together defaults and set variables on the object. e.g. if
	//    `config.foo` is set to `true` and `config.bar` is defaulted to `true`,
	//    then calling `get('config')` must return `{ foo: true, bar: true }`.
	// 2. Changing a property of the object must proxy to calling `set()`.

	if (
		typeof varValue === 'object' &&
		varValue !== null &&
		!Array.isArray(varValue) &&
		typeof defaultValue === 'object' &&
		defaultValue !== null &&
		!Array.isArray(defaultValue)
	) {
		const result = {};
		const keys = [...Object.keys(defaultValue), ...Object.keys(varValue)];

		for (const key of keys) {
			Object.defineProperty(result, key, {
				get() {
					return get(name + '.' + key);
				},
				set(value) {
					set(name + '.' + key, value);
				},

				// Allow overwriting.
				configurable: true,

				// Allow enumerating (e.g. shows up in Object.keys()).
				enumerable: true
			});
		}

		return result;
	}

	// Just return the variable value--it may be undefined but we don't have a
	// default.

	return varValue;
}

/**
 * Returns an object representing the current state, that can be given back to
 * `restoreFromObject()`. Although this a plain JavaScript object, it should be
 * considered read-only.
 */
export function saveToObject() {
	return {...vars};
}

/**
 * Sets state based on a previously serialized object. This will trigger
 *  `state-change` events as it works.
 */
export function restoreFromObject(previous: Record<string, Settable>) {
	reset();

	for (const key in previous) {
		set(key, previous[key]);
	}
}

/**
 * Returns whether it is possible to save values to local storage.
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

/**
 * Saves all values to local storage for later retrieval by
 * `restoreFromStorage()`.
 */
export function saveToStorage() {
	log('Saving to local storage: ' + JSON.stringify(saveToObject()));
	window.localStorage.setItem(saveKey, JSON.stringify(saveToObject()));
	log('Save complete');
}

/**
 * Returns whether there is state to restore in local storage.
 */
export function canRestoreFromStorage() {
	return canSaveToStorage() && window.localStorage.getItem(saveKey) !== null;
}

/**
 * Restores state from local storage.
 */
export function restoreFromStorage() {
	log('Restoring variables from local storage');

	const raw = window.localStorage.getItem(saveKey);

	if (!raw) {
		throw new Error(`No value is set in local storage at "${saveKey}"`);
	}

	restoreFromObject(JSON.parse(raw));
	log('Restore complete');
}

/**
 * Deletes the state from local storage. This should only be used in
 * emergencies, when something has gone very wrong; see `display/crash.js`.
 * Under normal circumstances, call `reset()` instead.
 *
 * This has a `quiet` option which does not try to log any messages-- this is so
 * that the function does the minimum necessary, again if we suspect the state
 * of affairs is badly broken.
 */
export function purgeFromStorage(quiet?: boolean) {
	if (!quiet) {
		log('Purging variables from local storage');
	}

	const raw = window.localStorage.getItem(saveKey);

	if (!raw) {
		throw new Error(`No value is set in local storage at "${saveKey}"`);
	}

	restoreFromObject(JSON.parse(raw));

	if (!quiet) {
		log('Purge complete');
	}
}

/**
 * Returns all variable names currently set.
 */
export function varNames(includeDefaults?: boolean) {
	function catalog(
		obj: Record<string, unknown>,
		prefix?: string,
		result: string[] = []
	) {
		return Object.keys(obj).reduce<string[]>((out, key) => {
			if (
				typeof obj[key] === 'object' &&
				obj[key] &&
				!Array.isArray(obj[key])
			) {
				catalog(
					obj[key] as Record<string, unknown>,
					prefix ? `${prefix}.${key}` : key,
					out
				);
			} else {
				const varName = prefix ? `${prefix}.${key}` : key;

				if (!out.includes(varName)) {
					out.push(varName);
				}
			}

			return out;
		}, result);
	}

	if (includeDefaults) {
		return catalog(defaults, undefined, catalog(vars)).sort();
	}

	return catalog(vars).sort();
}
