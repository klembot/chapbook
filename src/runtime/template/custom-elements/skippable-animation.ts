import {CustomElement} from '../../util/custom-element';

/**
 * Allows modifying the delay of a CSS animation on this element by changing its
 * `skippable-delay` attribute (which corresponds to the delay it should have in
 * milliseconds). Changes to this attribute cause changes to its
 * `animation-delay` CSS property.
 *
 * This is used by the `after` modifier.
 *
 * Available as `<skippable-animation>`.
 */
export class SkippableAnimation extends CustomElement {
	static observedAttributes = ['skippable-delay'];

	attributeChangedCallback() {
		const rawDelay = this.getAttribute('skippable-delay');

		if (!rawDelay) {
			return;
		}

		const delay = parseInt(rawDelay);

		if (!isFinite(delay)) {
			return;
		}

		if (delay === 0) {
			this.style.animationDelay = '';

			// Reset the element class, then force a document reflow to restart
			// the animation. Otherwise, the element will transition immediately.

			const className = this.className;

			this.className = '';
			void this.offsetWidth;
			this.className = className;
		} else {
			this.style.animationDelay = `${delay}ms`;
		}
	}
}
