export default class {
	constructor(el) {
		this.el = el;
	}

	show(html) {
		this.el.innerHTML = html;
	}
};