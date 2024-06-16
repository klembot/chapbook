import {CustomElement} from '../../util/custom-element';
import './backstage.css';

/**
 * The parent custom element for the entire backstage UI. It's available as
 * `<backstage-sidebar>` and expands or collapses depending on the presence of a
 * `collapsed` attribute.
 */
export class BackstageSidebar extends CustomElement {
	constructor() {
		super();
		this.addEventListener('click', event => {
			if ((event.target as HTMLElement).closest('[data-toggle-collapsed]')) {
				if (this.hasAttribute('collapsed')) {
					this.removeAttribute('collapsed');
				} else {
					this.setAttribute('collapsed', '');
				}
			}
		});
	}

	connectedCallback() {
		this.innerHTML = `
			<button data-toggle-collapsed></button>
			<div class="content">
				<backstage-tabs aria-label="Backstage">
				<backstage-tab
					aria-controls="backstage-state-tab-panel"
					id="backstage-state-tab"
				>
					State
				</backstage-tab>
				<backstage-tab
					aria-controls="backstage-history-tab-panel"
					id="backstage-history-tab"
				>
					History
				</backstage-tab>
				<backstage-tab
					aria-controls="backstage-style-tab-panel"
					id="backstage-style-tab"
				>
					Style
				</backstage-tab>
				<backstage-tab
					aria-controls="backstage-notes-tab-panel"
					id="backstage-notes-tab"
				>
					Notes
				</backstage-tab>
			</backstage-tabs>
			<backstage-tab-panel
				aria-labelledby="backstage-state-tab"
				id="backstage-state-tab-panel"
			>
				<backstage-state-variables></backstage-state-variables>
				<backstage-state-snapshots></backstage-state-snapshots>
			</backstage-tab-panel>
			<backstage-tab-panel
				aria-labelledby="backstage-history-tab"
				id="backstage-history-tab-panel"
			>
				<backstage-history-table></backstage-history-table>
			</backstage-tab-panel>
			<backstage-tab-panel
				aria-labelledby="backstage-style-tab"
				id="backstage-style-tab-panel"
			>
				<backstage-style-theme></backstage-style-theme>
				<backstage-style-config></backstage-style-config>
				<backstage-style-group title="Page" prefix="page"></backstage-style-group>
				<backstage-style-group title="Header"></backstage-style-group>
				<backstage-style-group title="Footer"></backstage-style-group>
			</backstage-tab-panel>
			<backstage-tab-panel
				aria-labelledby="backstage-notes-tab"
				id="backstage-notes-tab-panel"
			>
				<backstage-notes></backstage-notes>
			</backstage-tab-panel>
		</div>`;
		this.update();
	}

	attributeChangedCallback() {
		this.update();
	}

	update() {
		const toggleButtons = this.querySelectorAll('[data-toggle-collapsed]');

		if (this.hasAttribute('collapsed')) {
			for (const button of toggleButtons) {
				button.innerHTML = '&larr;';
				button.setAttribute('aria-label', 'Show Backstage');
			}

			document.body.classList.remove('backstage-visible');
		} else {
			for (const button of toggleButtons) {
				button.innerHTML = '&rarr;';
				button.setAttribute('aria-label', 'Hide Backstage');
			}

			document.body.classList.add('backstage-visible');
		}
	}

	static observedAttributes = ['collapsed'];
}
