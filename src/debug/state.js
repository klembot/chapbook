/* A panel displaying the story state. */

import Panel from './panel';
import escape from 'lodash.escape';

export default class extends Panel {
	constructor(vars) {
		super('State');
		this.showDefaults = false;
		this.vars = vars;
		this.vars.addListener('*', () => this.update());

		const checkBox = document.createElement('input');

		checkBox.setAttribute('type', 'checkbox');
		checkBox.setAttribute('id', 'cb-debug-state-show-defaults');
		checkBox.addEventListener('change', () => {
			this.showDefaults = !this.showDefaults;
			this.update();
		});

		const label = document.createElement('label');

		label.setAttribute('for', 'cb-debug-state-show-defaults');
		label.appendChild(document.createTextNode('Show Defaults'));

		const toggleEl = document.createElement('p');

		toggleEl.appendChild(checkBox);
		toggleEl.appendChild(label);

		this.dataEl = document.createElement('div');
		this.contentEl.appendChild(toggleEl);
		this.contentEl.appendChild(this.dataEl);
		this.update();
	}

	update() {
		let keys = this.vars.keys;

		if (!this.showDefaults) {
			keys = keys.filter(k => this.vars.defaults[k] !== this.vars.get(k));
		}

		this.dataEl.innerHTML = `<table>${keys.reduce(
			(result, k) =>
				result +
				`<tr><td>${escape(k)}</td><td class="force-wrap">${escape(
					JSON.stringify(this.vars.get(k))
				)}</td></tr>`,
			''
		)}</table>`;
	}
}
