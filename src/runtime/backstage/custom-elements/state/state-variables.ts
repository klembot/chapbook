import {escape} from 'lodash-es';
import {varNames} from '../../../state';
import {CustomElement} from '../../../util/custom-element';
import './state-variables.css';

export class StateVariables extends CustomElement {
	showDefaults = false;

	constructor() {
		super();
		this.delegate('change', 'input[type="checkbox"]', event => {
			this.showDefaults = (event.target as HTMLInputElement).checked;
			this.update();
		});
	}

	connectedCallback() {
		this.defaultHtml(`
			<details open>
				<summary>Variables</summary>
				<label>
					<input type="checkbox" />
					Show Defaults
				</label>
				<div class="variables"></div>
			</details>
		`);
		this.update();
		window.addEventListener('state-change', this);
	}

	disconnectedCallback() {
		window.removeEventListener('state-change', this);
	}

	handleEvent() {
		this.update();
	}

	update() {
		this.query('.variables').innerHTML = varNames(this.showDefaults)
			.map(
				name =>
					`<div><label><span>${escape(
						name
					)}</span><backstage-variable-input name="${escape(
						name
					)}"></backstage-variable-input></label></div>`
			)
			.join('');
	}
}
