import {DisplayChangeEventDetail} from '../../custom-events';
import {get} from '../../state';
import {transition} from '../transitions';
import {ContentElement} from './content-element';
import './marginal-content.css';

/**
 * Shows either header or footer content. This is available as
 * `<marginal-content>` and the type of content to show is set via its `type`
 * attribute. `type` must be either `header` or `footer`; any other value, or
 * omitting this attribute, will cause it to throw an error.
 */
export class MarginalContent extends ContentElement {
	get validatedType(): 'footer' | 'header' {
		const type = this.getAttribute('type') ?? '';

		if (!['footer', 'header'].includes(type)) {
			throw new Error(
				`Don't know how to update marginal content with type "${type}".`
			);
		}

		return type as 'footer' | 'header';
	}

	connectedCallback() {
		window.addEventListener('display-change', this);
	}

	disconnectedCallback() {
		window.removeEventListener('display-change', this);
	}

	/**
	 * Changes content using a transition. Unlike `BodyContent`, this doesn't
	 * dispatch an event on completion because the UI only so far needs to react
	 * to body content changing.
	 */
	async changeContent(callback: (el: HTMLElement) => void | Promise<void>) {
		const content = super.moveContentsOffscreen();

		await callback(content);

		let hasContent = false;

		for (const part of ['left', 'center', 'right']) {
			const el = content.querySelector(`.${part}`);

			if (el?.innerHTML.trim() !== '') {
				hasContent = true;
				break;
			}
		}

		if (hasContent) {
			this.removeAttribute('hidden');
			return transition(
				this,
				content.innerHTML,
				get(`config.${this.validatedType}.transition.name`),
				get(`config.${this.validatedType}.transition.duration`)
			);
		}

		this.setAttribute('hidden', '');
	}

	handleEvent({detail}: CustomEvent<DisplayChangeEventDetail>) {
		this.changeContent(content => {
			content.innerHTML = ['left', 'center', 'right'].reduce(
				(result, part) =>
					result +
					`<div class="${part}">${
						detail[this.validatedType][part as 'left' | 'center' | 'right']
					}</div>`,
				''
			);
		});
	}
}
