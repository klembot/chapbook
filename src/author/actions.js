// Top-level actions that will be globally exposed.

import {get, set} from '../state';
import {log as _log} from '../logger';
import {passageNamed} from '../story';
import {transferToState as transferInputsToState} from '../display/inputs';

function log(message) {
	_log('actions', message);
}

export function go(name) {
	log(`Going to passage "${name}"`);

	let passage = passageNamed(name);

	if (!passage) {
		throw new Error(`There is no passage with the name "${name}"`);
	}

	// Do not validate the inputs-- just save and go.

	transferInputsToState();
	set('trail', get('trail').concat(passage.name));
}

export function restart() {
	log('Restarting');
	set('trail', null);
}
