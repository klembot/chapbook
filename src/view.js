import CustomEvent from 'custom-event';

export default class {
	constructor(el, vars) {
		this.el = el;
		this.vars = vars;

		this.vars.default('config.view.crossfade', true);
		this.vars.default('config.view.transitionDuration', 1);

		const elStyle = window.getComputedStyle(el);

		/* Force a new stacking context. */

		if (elStyle.position === 'static') {
			this.el.style.position = 'relative';
		}
	}

	show(html) {
		const segmentLength =
			this.vars.get('config.view.transitionDuration') / 2 + 's';
		let inEl = document.createElement('div');
		let outEl;

		if (this.el.innerHTML.trim() !== '') {
			outEl = document.createElement('div');
			outEl.innerHTML = this.el.innerHTML;
			outEl.setAttribute('aria-hidden', true);
			outEl.style.animationDuration = segmentLength;
			outEl.style.pointerEvents = 'none';
			outEl.style.position = 'absolute';
			outEl.style.top = '0';
			outEl.style.left = '0';
			outEl.className = 'fade-out';

			let removeOut;

			if (this.vars.get('config.view.crossfade')) {
				removeOut = e => {
					if (e.target === outEl) {
						outEl.removeEventListener('animationend', removeOut);
						outEl.parentNode.removeChild(outEl);
					}
				};
			} else {
				removeOut = e => {
					if (e.target === outEl) {
						outEl.removeEventListener('animationend', removeOut);
						outEl.parentNode.removeChild(outEl);
						this.el.appendChild(inEl);
					}
				};
			}

			outEl.addEventListener('animationend', removeOut);
		}

		inEl.innerHTML = html;
		inEl.className = 'fade-in';
		inEl.style.animationDuration = segmentLength;
		this.el.innerHTML = '';

		/*
		After animating in, we have to remove the fade-in class so that it
		doesn't re-fade as part of the out element in the next transition.
		*/

		const finishIn = () => {
			inEl.className = '';
			inEl.removeEventListener('animationend', finishIn);
		};

		inEl.addEventListener('animationend', finishIn);

		if (this.vars.get('config.view.crossfade')) {
			this.el.appendChild(inEl);

			if (outEl) {
				this.el.appendChild(outEl);
			}
		} else {
			/*
			We are fading in the new content after the existing content
			disappears. If there isn't any content to fade out, fade it in
			immediately.
			*/

			if (outEl) {
				this.el.appendChild(outEl);
			} else {
				this.el.appendChild(inEl);
			}
		}

		this.el.dispatchEvent(new CustomEvent('content-change'));
	}
}
