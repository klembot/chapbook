/*
Manages converting story data, encoded into HTML elements, into JavaScript
objects. This intentionally does not affect anything in state except for
`trail`; putting the entire story into state would waste space and behave
unpredictably, as change events would not necessarily trigger correctly.
*/

import createLogger from './logger';
import {selectAll} from './util/dom-select';
import {setDefault} from './state';

const logger = createLogger('story');

const story = {
	customScripts: [],
	customStyles: []
};

let loaded = false;
let passages = [];

export function loadFromData(el) {
	['name', 'creator', 'ifid', 'options'].forEach(
		attr => (story[attr] = el.getAttribute(attr))
	);

	/* Camel-case creator version and start node. */

	story.startNode = parseInt(el.getAttribute('startnode'));
	story.creatorVersion = el.getAttribute('creator-version');

	/* Custom script and style. */

	const elsToContents = els => els.map(el => el.textContent);

	story.customScripts = elsToContents(
		selectAll(el, '[type="text/twine-javascript"]')
	);
	story.customStyles = elsToContents(
		selectAll(el, '[type="text/twine-css"]')
	);

	/* Create passages. */

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

	loaded = true;
}

export function init() {
	setDefault('trail', [startPassage().name]);
	setDefault(
		'config.testing',
		(typeof story.options === 'string' &&
			story.options.indexOf('debug') !== -1) ||
			process.env.NODE_ENV !== 'production'
	);
	document.title = story.name;
}

export function runCustomScripts() {
	logger.log(`Running custom scripts (${story.customScripts.length})`);

	story.customScripts.forEach(s => {
		new Function(s).apply(window);
	});
}

export function addCustomStyles() {
	logger.log(`Adding custom styles (${story.customStyles.length})`);

	story.customStyles.forEach(s => {
		const styleEl = document.createElement('style');

		styleEl.innerHTML = s;
		document.head.appendChild(styleEl);
	});
}

export function name() {
	return story.name;
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
