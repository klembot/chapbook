import get from 'lodash.get';
import set from 'lodash.set';

class Persistence {
	static browserEnabled() {
		try {
			window.localStorage.setItem('chapbook-test', 'a');
			window.localStorage.removeItem('chapbook-test');
			return true;
		}
		catch (e) {
			return false;
		}
	}

	constructor(key) {
		this.key = key;
		this.remembered = [];
	}

	remembered(varName) {
		return this.remembered.indexOf(varName) !== -1;
	}

	remember(varName) {
		if (this.remembered.indexOf(varName) !== -1) {
			return;
		}

		this.remembered.push(varName);
	}

	save(trail) {
		try {
			window.localStorage.setItem(
				this.key,
				JSON.stringify({
					trail,
					vars: this.remembered.reduce(
						(result, r) => {
							result[r] = get(window, r);
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
		return Persistence.browserEnabled() &&
			window.localStorage.getItem(this.key) !== null;
	}

	restore() {
		if (this.canRestore()) {
			const toRestore = JSON.parse(window.localStorage.getItem(this.key));

			Object.keys(toRestore.vars).forEach(v => {
				this.remember(v);
				set(window, v, toRestore.vars[v]);
			});

			return toRestore.trail;
		}
		else {
			return false;
		}
	}

	delete() {
		window.localStorage.removeItem(this.key);
	}
}

export default Persistence;