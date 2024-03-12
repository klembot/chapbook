import {CustomElement} from '../../../util/custom-element';
import {Tabs} from './tabs';
import './tab.css';

/**
 * A tab used in the backstage UI. Available as `<backstage-tab>`.
 */
export class Tab extends CustomElement {
	constructor() {
		super();
		this.addEventListener('click', () => {
			if (!this.textContent) {
				return;
			}

			(this.closest('backstage-tabs') as Tabs)?.selectTab(this.textContent);
		});
	}

	connectedCallback() {
		this.setAttribute('role', 'tab');
	}
}
