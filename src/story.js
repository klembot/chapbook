// Manages converting story data, encoded into HTML elements, into JavaScript
// objects. This intentionally does not affect anything in state except for
// `trail`; putting the entire story into state would waste space and behave
// unpredictably, as change events would not necessarily trigger correctly.

import {selectAll} from './util/dom-select';
import {setDefault} from './state';

export const story = {
	name: 'Untitled Story',
	customScripts: [],
	customStyles: []
};
export let passages = [];

export function loadFromData(el) {
	['name', 'creator', 'ifid', 'options'].forEach(
		attr => (story[attr] = el.getAttribute(attr))
	);

	// Camel-case creator version and start node.

	story.startNode = parseInt(el.getAttribute('startnode'));
	story.creatorVersion = el.getAttribute('creator-version');

	// Custom script and style.

	const elsToContents = els => els.map(el => el.textContent);

	story.customScripts = elsToContents(
		selectAll(el, '[type="text/twine-javascript"]')
	);
	story.customStyles = elsToContents(
		selectAll(el, '[type="text/twine-css"]')
	);

	// Create passages.

	passages = selectAll(el, 'tw-passagedata').map(p => {
		let passage = {
			id: parseInt(p.getAttribute('pid')),
			name: p.getAttribute('name'),
			source: p.textContent
		};

		const tagAttr = p.getAttribute('tags');

		if (tagAttr) {
			passage.tags = tagAttr.split(' ');
		}

		return passage;
	});
}

export function init() {
	console.log('TODO: run custom scripts');
	console.log('TODO: add custom styles');
	setDefault('trail', [startPassage().name]);
	document.title = story.name;
}

export function startPassage() {
	return passages.find(p => p.id === story.startNode);
}

export function passageNamed(name) {
	return passages.find(p => p.name === name);
}

export function passageWithId(id) {
	return passages.find(p => p.id === id);
}
