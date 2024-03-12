import {CustomElement} from '../../../util/custom-element';
import './tab-panel.css';

/**
 * A tab panel used in the backstage UI. Available as `<backstage-tab-panel>`.
 */
export class TabPanel extends CustomElement {
	connectedCallback() {
		this.setAttribute('role', 'tabpanel');
	}
}
