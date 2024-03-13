/**
 * This records snapshots of state as it changes, storing them in an array where
 * the most recent change is last. It's used by the Variables section of the
 * State backstage tab. In order to be useful, this should be initialized as
 * early as possible.
 * @packageDocumentation
 */

import {StateChangeEventDetail} from '../custom-events';
import {
	Settable,
	get,
	restoreFromObject,
	saveToObject,
	setDefault
} from '../state';

/**
 * A single state change. A passage transition can consist of several history
 * moments.
 */
export interface HistoryMoment {
	change: {
		/**
		 * Name of the variable that changed.
		 */
		name: string;
		/**
		 * Value the variable changed to.
		 */
		value: Settable;
	};
	/**
	 * Snapshot of the entire state at this point in time, after the change
	 * occurred.
	 */
	state: Record<string, Settable>;
}

let recorderHistory: HistoryMoment[] = [];

// This is private because it's only needed during rewinding, to prevent the
// rewind itself from being recorded.
let recording = true;

/**
 * Erases all state history.
 */
export function clear() {
	if (!recording) {
		return;
	}

	recorderHistory = [];
	window.dispatchEvent(new CustomEvent('backstage-state-recorder-update'));
}

function add({detail}: CustomEvent<StateChangeEventDetail>) {
	if (!recording) {
		return;
	}

	if (recorderHistory.length === get('config.backstage.trail.maxLength')) {
		recorderHistory.shift();
	}

	const {name, value} = detail;

	recorderHistory.push({change: {name, value}, state: saveToObject()});
	window.dispatchEvent(new CustomEvent('backstage-state-recorder-update'));
}

/**
 * Returns the entire history.
 */
export function getHistory() {
	return [...recorderHistory];
}

/**
 * Rewinds state to an index in the history array. This erases all history after
 * the index. It dispatches a `backstage-state-recorder-update` event on
 * `window` after the rewind is complete.
 */
export function rewindTo(index: number) {
	if (!recorderHistory[index]) {
		throw new Error(`There is no history at index ${index} to rewind to.`);
	}

	recording = false;
	restoreFromObject(recorderHistory[index].state);
	recorderHistory.length = index + 1;
	recording = true;
	window.dispatchEvent(new CustomEvent('backstage-state-recorder-update'));
}

/**
 * Initializes recordings of state changes.
 */
export function initStateRecorder() {
	setDefault('config.backstage.trail.maxLength', 100);
	window.addEventListener('state-change', add);
	window.addEventListener('state-reset', clear);
}
