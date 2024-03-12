import {CustomElement} from '../../../util/custom-element';
import './tabs.css';

/**
 * A container for tabs used in the backstage UI. Available as `<backstage-tabs>`.
 */
export class Tabs extends CustomElement {
	connectedCallback() {
		this.setAttribute('role', 'tablist');

		// Let children complete their setup.

		window.setTimeout(() => this.selectTab(0));
	}

	selectTab(selectedIndexOrName: number | string) {
		[...this.children]
			.filter(node => node.getAttribute('role') === 'tab')
			.forEach((tab, index) => {
				const panelId = tab.getAttribute('aria-controls');
				const selected =
					typeof selectedIndexOrName === 'number'
						? index == selectedIndexOrName
						: tab.textContent === selectedIndexOrName;

				tab.setAttribute('aria-selected', selected.toString());

				if (panelId) {
					if (selected) {
						document.getElementById(panelId)?.removeAttribute('hidden');
					} else {
						document.getElementById(panelId)?.setAttribute('hidden', '');
					}
				}
			});
	}
}
