import {CustomElement} from '../../../util/custom-element';

const fields = [
	{name: 'Font', suffix: 'font'},
	{name: 'Color', suffix: 'color'},
	{name: 'Link Font', suffix: 'link.font'},
	{name: 'Link Color', suffix: 'link.color'},
	{name: 'Link Line Color', suffix: 'link.lineColor'},
	{name: 'Active Link Font', suffix: 'link.active.font'},
	{name: 'Active Link Color', suffix: 'link.active.color'},
	{name: 'Active Link Line Color', suffix: 'link.active.lineColor'}
];

/**
 * Shows a set of text inputs allowing editing a set of related style
 * properties. Available as `<backstage-style-group>` and is used repeatedly
 * under the Style backstage tab. The `prefix` attribute controls the variables
 * the inputs are bound to, and `title` controls the visible title.
 */
export class StyleGroup extends CustomElement {
	connectedCallback() {
		const prefix = this.getAttribute('prefix');
		const title = this.getAttribute('title');

		this.defaultHtml(`
			<details open>
				<summary>${title}</summary>
				${fields
					.map(
						({name, suffix}) => `
						<label data-prefix="config.style.%.${suffix}">
							${name}
							<backstage-variable-input name="config.style.${prefix}.${suffix}" string />
						</label>
					`
					)
					.join('')}
			</details>
		`);
	}

	attributeChangedCallback(name: string, _: string, value: string) {
		if (this.innerHTML === '') {
			return;
		}

		switch (name) {
			case 'title':
				this.query('summary').innerText = value;
				break;
			case 'prefix':
				for (const input of this.queryAll('backstage-variable-input')) {
					const newName = (input.closest('[data-prefix]') as HTMLElement | null)
						?.dataset.prefix;

					if (newName) {
						input.setAttribute('name', newName.replace('%', value));
					}
				}
		}
	}

	static observedAttributes = ['prefix', 'title'];
}
