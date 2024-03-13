import {get} from '../../../state';
import {CustomElement} from '../../../util/custom-element';
import './config.css';

// State keys we care about.

const keys = ['page', 'page.header', 'page.footer'].reduce<string[]>(
	(out, key) =>
		out.concat([
			`config.style.${key}.font`,
			`config.style.${key}.color`,
			`config.style.${key}.link.font`,
			`config.style.${key}.link.color`,
			`config.style.${key}.link.lineColor`,
			`config.style.${key}.link.active.font`,
			`config.style.${key}.link.active.color`,
			`config.style.${key}.link.active.lineColor`
		]),
	[]
);

/**
 * Shows a read-only text field showing code that reflects the current style.
 * It's available as `<backstage-style-config>` and is used by the Config
 * section of the Style backstage tab.
 */
export class StyleConfig extends CustomElement {
	connectedCallback() {
		this.defaultHtml(`
			<details open>
				<summary>Config</summary>
				<label for="cb-backstage-style-config">
					Enter this code into your first passage&rsquo;s variables section to
					permanently use this style:
				</label>
				<textarea
					readonly
					id="cb-backstage-style-config"
				></textarea>
			</details>
		`);
		window.addEventListener('state-change', this);
		this.update();
	}

	disconnectedCallback() {
		window.removeEventListener('state-change', this);
	}

	handleEvent() {
		this.update();
	}

	update() {
		this.query<HTMLTextAreaElement>('textarea').value = keys
			.reduce((out, key) => {
				const value = get(key);

				if (value) {
					return out + `${key}: ${JSON.stringify(value)}\n`;
				}

				return out;
			}, '')
			.trim();
	}
}
