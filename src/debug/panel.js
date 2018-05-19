export default class {
	constructor(title) {
		this.title = title;
		this.el = document.createElement('div');
		this.el.classList.add('panel', 'system');

		this.titleEl = document.createElement('button');
		this.titleEl.classList.add('title');
		this.titleEl.appendChild(document.createTextNode(title));
		this.titleEl.addEventListener('click', () =>
			this.el.classList.toggle('open')
		);

		this.el.appendChild(this.titleEl);

		this.contentEl = document.createElement('div');
		this.contentEl.classList.add('content');
		this.el.appendChild(this.contentEl);
	}

	open() {
		this.el.classList.add('open');
	}

	close() {
		this.el.classList.remove('open');
	}

	setTitle(title) {
		this.titleEl.firstChild.nodeValue = title;
	}
}
