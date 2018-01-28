const positions = ['left', 'center', 'right'];

export default class {
	constructor(el, render, vars) {
		this.el = el;
		this.render = render;

		positions.forEach(pos => {			
			const posEl = document.createElement('span');
			
			posEl.className = pos;
			this.el.appendChild(posEl);
			this[pos + 'El'] = posEl;
			this[pos] = '';
		});

		vars.addListener('*', () => { this.update() });
	}

	update() {
		let hasContent = false;

		positions.forEach(pos => {
			const content = this.render(this[pos]);

			this[pos + 'El'].innerHTML = content;

			if (content) {
				hasContent = true;
			}
		});

		if (hasContent) {
			this.el.classList.add('has-content');
		}
		else {
			this.el.classList.remove('has-content');
		}
	}
}