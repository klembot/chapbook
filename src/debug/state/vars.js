/* A panel displaying the current vars. */

import closest from 'closest';
import escape from 'lodash.escape';
import Panel from '../panel';
import html from './vars.html';

export default class extends Panel {
	constructor(vars) {
		super('Variables', html);
		this.showDefaults = false;
		this.vars = vars;
		this.vars.addListener('*', () => this.update());
		this.varsTable = this.hook('vars-table');

		this.varsTable.addEventListener('change', e => {
			const input = closest(e.target, '[data-var]', true);

			if (input) {
				try {
					const newValue = new Function(`return ${input.value}`)();

					this.vars.set(input.dataset.var, newValue);
				} catch (e) {
					window.alert(
						`The expression "${escape(input.value)}" could not be evaluated (${
							e.message
						}).`
					);

					input.value = this.vars.get(input.dataset.var);
				}
			}
		});
		this.varsTable.addEventListener('click', e => {
			const input = closest(e.target, '[data-var]', true);

			if (input) {
				input.select();
			}
		});

		this.update();
	}

	update() {
		let keys = this.vars.keys;

		if (!this.showDefaults) {
			keys = keys.filter(k => this.vars.defaults[k] !== this.vars.get(k));
		}

		this.varsTable.innerHTML = `<table>${keys.reduce((result, key) => {
			const k = escape(key);
			const value = escape(JSON.stringify(this.vars.get(k)));

			return (
				result +
				`<tr><td class="disabled">${k}</td><td><input type="text" id="cb-debug-variable-${k}" data-var="${k}" value="${value}"></td></tr>`
			);
		}, '')}</table>`;
	}
}
