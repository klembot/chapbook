/*
A class to manage the story as published from Twine.
*/

import Passage from './passage';

export default class {
	constructor(view, parser, renderer) {
		this.view = view;
		this.parser = parser;
		this.renderer = renderer;
		this.passages = [];
		this.customScripts = [];
		this.customStyles = [];
	}

	/*
	Loads all data from a <tw-storydata> DOM element.
	*/

	loadFromHtml(el) {
		/* Basic attributes. */

		['name', 'creator', 'ifid', 'options'].forEach(
			attr => (this[attr] = el.getAttribute(attr))
		);

		/* Camel-case creator version and start node. */

		this.startNode = parseInt(el.getAttribute('startnode'));
		this.creatorVersion = el.getAttribute('creator-version');

		/* Load custom script and styles. */

		const elsToContents = els => Array.from(els).map(el => el.textContent);

		this.customScripts = elsToContents(
			el.querySelectorAll('[type="text/twine-javascript"]')
		);
		this.customStyles = elsToContents(
			el.querySelectorAll('[type="text/twine-css"]')
		);

		/* Create passages. */

		this.passages = Array.from(el.querySelectorAll('tw-passagedata')).map(
			el => {
				let p = new Passage();

				p.loadFromHtml(el);
				return p;
			}
		);
	}

	passage(name) {
		return this.passages.find(p => p.name === name);
	}
}
