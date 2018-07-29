// This takes snapshots of state as it changes, storing them in an array where
// the most recent change is last. In order to be useful, it should be
// initialized as early as possible.

import event from '../../event';
import {get, restoreFromObject, saveToObject} from '../../state';

export const defaults = {
	'config.backstage.trail.maxLength': 100
};

export let history = [];

function clear() {
	history = [];
}

function add({name, value}) {
	if (history.length === get('config.backstage.trail.maxLength')) {
		history.shift();
	}

	history.push({change: {name, value}, state: saveToObject()});
}

export function rewindTo(index) {
	if (!history[index]) {
		throw new Error(`There is no history at index ${index} to rewind to.`);
	}

	restoreFromObject(history[index].state);
}

export function init() {
	event.on('state-change', add);
	event.on('state-reset', clear);
}
