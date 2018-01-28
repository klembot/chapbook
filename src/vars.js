/*
This manages variables set during the course of play, specifically:
	- saving them automatically to browser local storage when changed
	- allowing other modules to subscribe to changes
	  (e.g. to update something displayed when a variable changes)

This also maintains proxies on the window object so that authors can use
variable names without scoping.
*/

import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';

export default class {
	constructor(saveKey) {
		this.saveKey = saveKey;
		this.state = {};
		this.defaults = {};
		this.keys = [];
		this.listeners = [];
		this.autosave = true;
		this.verbose = false;
	}

	/*
	Sets a key's value, saving it to local storage and triggering relevant
	listeners.
	*/

	set(key, value) {
		const prevValue = this.get(key);

		if (this.verbose) {
			console.log(`Setting var "${key}" to "${value}"`);
		}

		set(this.state, key, value);

		if (this.keys.indexOf(key) === -1) {
			this.keys.push(key);

			/* Set up the proxy on the window object. */

			if (this.verbose) {
				console.log(`Setting up proxy properties on window for "${key}"`);
			}	

			unset(window, key);

			let target = window;
			const dottedProps = key.split('.');
			const targetKey = dottedProps[dottedProps.length - 1];

			for (let i = 0; i < dottedProps.length - 1; i++) {
				target[dottedProps[i]] = target[dottedProps[i]] || {};
				target = target[dottedProps[i]];
			}

			Object.defineProperty(target, targetKey, {
				get: () => this.get(key),
				set: value => this.set(key, value),

				/* Allow overwriting. */
				configurable: true
			});
		}

		if (this.autosave && this.canSave()) {
			this.save();
		}

		this.listeners.forEach(l => {
			if (l.regexp.test(key)) {
				l.func(key, value, prevValue, this);
			}
		});
	}

	/*
	Sets a default value for a key. This does *not* trigger an event the same
	way that set() does. 
	*/

	default(key, value) {
		this.defaults[key] = value;
	}

	/*
	Retrieves a key's value.
	*/

	get(key) {
		return get(this.state, key) || get(this.defaults, key);
	}

	/*
	Adds a function that is called back when a particular key is changed. Pass
	'*' to listen to all key changes. This will also call back if a subproperty
	is called; that is, if a function listens to 'foo', changes to 'foo.bar' or
	'foo.bar.baz' will also trigger a callback.
	*/

	addListener(key, func) {
		let regexp;

		if (key === '*') {
			regexp = /.*/;
		}
		else {
			regexp = new RegExp('^' + key);
		}

		this.listeners.push({regexp, func});
	}

	/*
	Removes an event listener. If the function actually wasn't set as a
	listener, this does nothing.
	*/

	removeListener(func) {
		this.listeners = this.listeners.filter(l => l.func !== func);
	}

	/*
	Returns whether it is possible to save values to local storage.
	*/

	canSave() {
		try {
			window.localStorage.setItem('chapbook-test', 'a');
			window.localStorage.removeItem('chapbook-test');
			return true;
		}
		catch (e) {
			return false;
		}
	}

	/*
	Saves all values to local storage for later retrieval by restore().
	*/

	save() {
		if (this.verbose) {
			console.log('Saving vars');
		}

		try {
			window.localStorage.setItem(
				this.saveKey,
				JSON.stringify({
					vars: this.keys.reduce(
						(result, r) => {
							result[r] = get(this.state, r);
							return result;
						},
						{}
					)
				})
			);
		}
		catch (e) {
			throw new Error(`Could not save the story state (${e.message}).`);
		}
	}

	canRestore() {
		return this.canSave() &&
			window.localStorage.getItem(this.saveKey) !== null;
	}

	restore() {
		if (this.verbose) {
			console.log('Restoring vars');
		}

		if (this.canRestore()) {
			const toRestore = JSON.parse(window.localStorage.getItem(this.saveKey));

			Object.keys(toRestore.vars).forEach(v => {
				this.set(v, toRestore.vars[v]);
			});

			if (this.verbose) {
				console.log('Restore complete', this.state);
			}
			
			return true;
		}
		else {
			if (this.verbose) {
				console.log('Restoring not possible');
			}

			return false;
		}
	}

	/*
	Forgets all values, but does not remove defaults. (If you want to do that,
	default a key to undefined.)
	*/

	forgetAll() {
		if (this.verbose) {
			console.log('Forgetting all vars');
		}

		this.state = {};
		this.keys = [];
		window.localStorage.removeItem(this.saveKey);
	}
}