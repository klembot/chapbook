/*
A class to manage a passage as published from Twine.
*/

module.exports = class {
	constructor() {
		this.tags = [];
	}

	loadFromHtml(el) {
		const tagAttr = el.getAttribute('tags');

		this.name = el.getAttribute('name');
		this.id = parseInt(el.getAttribute('pid'));

		if (tagAttr) {
			this.tags = tagAttr.split(' ');
		}

		this.source = el.textContent;
	}
};