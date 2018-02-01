export default class {
	constructor(el) {
		this.el = el;

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

			outEl.innerHTML = this.el.querySelector('[data-cb-crossfade]').innerHTML;
			outEl.setAttribute('aria-hidden', true);
			outEl.style.pointerEvents = 'none';
			outEl.style.position = 'absolute';
			outEl.style.top = '0';
			outEl.style.left = '0';
			outEl.className = 'fade-out fast-animation';

			outEl.addEventListener('animationend', () => outEl.parentNode.removeChild(outEl));
		}

		inEl.innerHTML = html;
		inEl.className = 'fade-in fast-animation';
		inEl.setAttribute('data-cb-crossfade', true);
		this.el.innerHTML = '';
		this.el.appendChild(inEl);

		if (outEl) {
			this.el.appendChild(outEl);
		}
	}
};