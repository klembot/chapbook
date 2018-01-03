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
			throw new Error(`"${varName}" is already being persisted.`);
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
						(result, r) => result.r = window[r],
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

			Object.keys(toRestore.vars).forEach(v => window[v] = toRestore.vars[v]);
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

module.exports = Persistence;