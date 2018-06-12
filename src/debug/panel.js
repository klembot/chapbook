import {select, selectAll} from '../util/dom-select';

export default class {
	constructor(title, htmlContent = '') {
		this.el = document.createElement('div');
		this.el.classList.add('panel');

		const titleContainer = document.createElement('h2');

		this.titleEl = document.createElement('button');
		this.titleEl.addEventListener('click', () => (this.open = !this.open));
		titleContainer.appendChild(this.titleEl);
		this.contentEl = document.createElement('div');
		this.contentEl.classList.add('content');
		this.contentEl.innerHTML = htmlContent;
		this.el.appendChild(titleContainer);
		this.el.appendChild(this.contentEl);
		this.title = title;
		this.open = true;
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
		this.titleEl.innerHTML = value;
	}

	get open() {
		return this._open;
	}

	set open(value) {
		if (value) {
			this.el.classList.add('open');
		} else {
			this.el.classList.remove('open');
		}

		this._open = value;
	}

	hook(name) {
		return select(this.el, `[data-hook="${name}"]`);
	}

	hooks(name) {
		return selectAll(this.el, `[data-hook="${name}"]`);
	}
}
