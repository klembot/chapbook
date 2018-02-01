export default class {
	constructor(el, vars) {
		this.el = el;
		this.vars = vars;

		this.vars.default('config.view.crossfade', true);
		this.vars.default('config.view.transitionDuration', 0.5);

		const elStyle = window.getComputedStyle(el);

		/* Force a new stacking context. */

		if (elStyle.position === 'static') {
			this.el.style.position = 'relative';
		}
	}

	show(html) {
		let inEl = document.createElement('div');
		let outEl;
		
		if (this.el.innerHTML.trim() !== '') {
			outEl = document.createElement('div');

			outEl.innerHTML = this.el.querySelector('[data-cb-fader]').innerHTML;
			outEl.setAttribute('aria-hidden', true);
			outEl.style.pointerEvents = 'none';
			outEl.style.position = 'absolute';
			outEl.style.top = '0';
			outEl.style.left = '0';
			outEl.className = 'fade-out';

			if (this.vars.get('config.view.crossfade')) {
				outEl.style.animationDuration = this.vars.get('config.view.transitionDuration') / 2 + 's';
				outEl.addEventListener('animationend', () => outEl.parentNode.removeChild(outEl));
			}
			else {
				outEl.style.animationDuration = this.vars.get('config.view.transitionDuration') / 2 + 's';
				outEl.addEventListener('animationend', () => {
					outEl.parentNode.removeChild(outEl);
					this.el.appendChild(inEl);
				});
			}
		}

		inEl.innerHTML = html;
		inEl.className = 'fade-in fast-animation';
		inEl.setAttribute('data-cb-fader', true);
		inEl.style.animationDuration = this.vars.get('config.view.transitionDuration') / 2 + 's';
		this.el.innerHTML = '';

		if (this.vars.get('config.view.crossfade')) {
			this.el.appendChild(inEl);

			if (outEl) {
				this.el.appendChild(outEl);
			}
		}
		else {
			/*
			We are fading in the new content after the existing content
			disappears. If there isn't any content to fade out, fade it in
			immediately.
			*/

			if (outEl) {
				this.el.appendChild(outEl);
			}
			else {
				this.el.appendChild(inEl);
			}
		}
	}
};