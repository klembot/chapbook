import {CustomElement} from '../../util/custom-element';

/**
 * A custom element class that implements functionality shared by BodyContent
 * and MarginalContent. It is not directly available in the DOM.
 */
export class ContentElement extends CustomElement {
	/**
	 * Returns whether all input child elements are valid (for example, if they
	 * are `required`, a value has been entered). If any are invalid, this
	 * requests that the browser show a validation message for them.
	 */
	allChildInputsValid() {
		let result = true;

		for (const input of this.querySelectorAll<
			HTMLInputElement | HTMLSelectElement
		>('input, select')) {
			result = result && input.reportValidity();
		}

		return result;
	}

	/**
	 * Moves all child content to an offscreen `<div>` which is returned, then
	 * copies the content back into this container. This is done in preparation
	 * for a display transition. This causes child content to potentially lose
	 * event handlers.
	 */
	moveContentsOffscreen() {
		const originalHtml = this.innerHTML;
		const workingEl = document.createElement('div');

		// Move contents to an offscreen container. We can't copy here because the
		// callback will be working on these elements.

		while (this.firstChild) {
			workingEl.appendChild(this.firstChild);
		}

		// Copy the HTML back over.

		this.innerHTML = originalHtml;
		return workingEl;
	}
}
