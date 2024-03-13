// This is a separate module to avoid a circular dependency with the state one.
// The idea here is that it listens to state changes on the variables
// `config.logger.show.*` and mutes and unmutes sources accordingly.

import {mute, unmute} from './logger';

/**
 * Initializes logging.
 */
export function initLoggerState() {
	window.addEventListener('state-change', event => {
		const parsedName = /^config\.logger\.show\.(.+)$/.exec(event.detail.name);

		if (parsedName && parsedName[1]) {
			if (event.detail.value) {
				unmute(parsedName[1]);
			} else {
				mute(parsedName[1]);
			}
		}
	});
}
