import {CustomElement} from '../../util/custom-element';
import './inline-button.css';

/**
 * It's not possible to make a <button> element display truly inline, e.g. word
 * wrap inline with a paragaph. This element acts like a button, including focus
 * and keyboard handling, but has no styling.
 *
 * By default, this uses the ARIA role `button`, but this respects any role set
 * on it directly.
 *
 * Available as `<inline-button>`.
 */
export class InlineButton extends CustomElement {
	// Implementation is based on
	// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#examples

	constructor() {
		super();
		this.addEventListener('keydown', event => {
			if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault();
				this.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			}
		});
	}

	connectedCallback() {
		this.setAttribute('tabindex', '0');

		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'button');
		}
	}
}
