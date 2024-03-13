/**
 * These functions are available directly on the global `engine` object.
 * @packageDocumentation
 */

import {createLoggers} from './logger';
import {get, reset, set} from './state';
import {passageNamed} from './story';

const {log} = createLoggers('actions');

/**
 * Navigates to another passage, skipping any input validation that would
 * normally occur.
 */
export function go(name: string) {
	log(`Going to passage "${name}"`);

	const passage = passageNamed(name);

	if (!passage) {
		throw new Error(`There is no passage with the name "${name}"`);
	}

	// Remove focus from the active input, if any. This will trigger a change
	// event for text inputs, for example, that an insert can react to before the
	// input is removed from the DOM.

	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}

	const trail = get('trail');

	if (!Array.isArray(trail)) {
		throw new Error(
			`The trail variable has been set to a ${typeof trail}, not an array.`
		);
	}

	set('trail', [...trail, passage.name]);
}

/**
 * Restarts the story, clearing all state.
 */
export function restart() {
	log('Restarting');
	reset();

	// We need to reload the window so that any JavaScript in story code is
	// removed.

	window.location.reload();
}
