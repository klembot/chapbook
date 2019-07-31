// This takes snapshots of state as it changes, storing them in an array where
// the most recent change is last. In order to be useful, it should be
// initialized as early as possible.

import event from '../../event';
import {get, restoreFromObject, saveToObject} from '../../state';

export const defaults = {
	'config.backstage.trail.maxLength': 100
};

export let history = [];
let recording = true;

function clear() {
	if (!recording) {
		return;
	}

	history = [];
	event.emit('backstage-recorder-update');
}

function add({name, value}) {
	if (!recording) {
		return;
	}

	if (history.length === get('config.backstage.trail.maxLength')) {
		history.shift();
	}

	history.push({change: {name, value}, state: saveToObject()});
	event.emit('backstage-recorder-update');
}

export function rewindTo(index) {
	if (!history[index]) {
		throw new Error(`There is no history at index ${index} to rewind to.`);
	}

	recording = false;
	restoreFromObject(history[index].state);
	history.length = index + 1;
	recording = true;
	event.emit('backstage-recorder-update');
}

export function init() {
	event.on('state-change', add);
	event.on('state-reset', clear);
}
