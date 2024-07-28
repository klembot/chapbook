import {get} from '../../state';
import {transition} from '../transitions';
import {ContentElement} from './content-element';
import './body-content.css';
import {DisplayChangeEventDetail} from '../../custom-events';

/**
 * Shows the main body content. Available as `<body-content>` and listens for
 * `display-change` events on `window` to perform updates.
 *
 * If this has a `disablescroll` attribute, this will not scroll the window when
 * its content changes as the result of a `display-change` event.
 */
export class BodyContent extends ContentElement {
	connectedCallback() {
		window.addEventListener('display-change', this);
	}

	disconnectedCallback() {
		window.removeEventListener('display-change', this);
	}

	/**
	 * Changes child content using a transition, then dispatches a
	 * `body-content-change` event on itself.
	 */
	async changeContent(callback: (el: HTMLElement) => void | Promise<void>) {
		const content = super.moveContentsOffscreen();

		await callback(content);
		await transition(
			this,
			content.innerHTML,
			get(`config.body.transition.name`),
			get(`config.body.transition.duration`)
		);
		this.dispatchEvent(new CustomEvent('body-content-change', {bubbles: true}));
	}

	handleEvent({detail}: CustomEvent<DisplayChangeEventDetail>) {
		this.changeContent(content => {
			content.innerHTML = detail.body;
		});

    if (this.getAttribute('disablescroll') === null) {
      window.scrollTo(0, 0);
    }
	}
}
