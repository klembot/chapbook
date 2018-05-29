export default class {
	constructor(title) {
		this.el = document.createElement('div');
		this.el.classList.add('panel');
		this.titleEl = document.createElement('h2');
		this.contentEl = document.createElement('div');
		this.el.appendChild(this.titleEl);
		this.el.appendChild(this.contentEl);
		this.title = title;
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
		this.titleEl.innerHTML = value;
	}
}
