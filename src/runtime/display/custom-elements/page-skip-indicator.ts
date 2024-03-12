import {CustomElement} from '../../util/custom-element';
import './page-skip-indicator.css';

/**
 * Shows a skip indicator when the user could skip forward (e.g. past delayed
 * content). This is available as `<page-skip-indicator>` and must be placed
 * inside a `<page-skip>` element for it to work properly. It listens to events
 * dispatched by that element to decide when it should be visible.
 */
export class PageSkipIndicator extends CustomElement {
	connectedCallback() {
		this.closest('page-skip')?.addEventListener(
			'page-skip-indicator-hide',
			this
		);
		this.closest('page-skip')?.addEventListener(
			'page-skip-indicator-show',
			this
		);
	}

	disconnectedCallback() {
		this.closest('page-skip')?.removeEventListener(
			'page-skip-indicator-hide',
			this
		);
		this.closest('page-skip')?.removeEventListener(
			'page-skip-indicator-show',
			this
		);
	}

	handleEvent(event: CustomEvent) {
		switch (event.type) {
			case 'page-skip-indicator-hide':
				this.removeAttribute('active');
				break;
			case 'page-skip-indicator-show':
				this.setAttribute('active', '');
				break;
		}
	}
}
