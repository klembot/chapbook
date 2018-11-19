/*
Top-level actions that will be globally exposed. This module also adds listeners
for clicks on elements with data-cb-go and data-cb-restart attributes.
*/

import event from './event';
import {get, reset, set} from './state';
import {log as _log} from './logger';
import {passageNamed} from './story';
import {transferToState as transferInputsToState} from './display/inputs';
import {validate} from './display/inputs';

function log(message) {
	_log('actions', message);
}

export function go(name) {
	log(`Going to passage "${name}"`);

	let passage = passageNamed(name);

	if (!passage) {
		throw new Error(`There is no passage with the name "${name}"`);
	}

	/* Do not validate the inputs-- just save and go. */

	transferInputsToState();
	set('trail', get('trail').concat(passage.name));
}

event.on('dom-click', el => {
	if (el.dataset.cbGo) {
		validate().then(() => go(el.dataset.cbGo));
	}
});

export function restart() {
	log('Restarting');
	reset();

	/*
	We need to reload the window so that any JavaScript in story code is
	removed.
	*/

	window.location.reload();
}

event.on('dom-click', el => {
	if (el.dataset.cbRestart) {
		restart();
	}
});
