/**
 * This manages user-created state snapshots. It's used by the Snapshots section
 * of the State backstage tab.
 * @packageDocumentation
 */

import {Settable, get, restoreFromObject, saveToObject} from '../state';

/**
 * A snapshot of state created by the user.
 */
export interface StateSnapshot {
	/**
	 * User-set name for the snapshot.
	 */
	name: string;
	/**
	 * Variable names and values for the snapshot.
	 */
	state: Record<string, Settable>;
}

let snapshots: StateSnapshot[] = [];

/**
 * Adds a snapshot, saves it to local storage, and dispatches a
 * `backstage-state-snapshots-update` event on `window`.
 */
export function addSnapshot(name: string) {
	snapshots.push({
		name,
		state: saveToObject()
	});
	saveToStorage();
	window.dispatchEvent(new CustomEvent('backstage-state-snapshots-update'));
}

/**
 * Erases all snapshots, then dispatches a `backstage-state-snapshots-update`
 * event on `window`.
 */
export function clear() {
	snapshots = [];
	saveToStorage();
	window.dispatchEvent(new CustomEvent('backstage-state-snapshots-update'));
}

/**
 * Loads a snapshot, overwriting current state.
 */
export function loadSnapshot(name: string) {
	const snapshot = snapshots.find(s => s.name === name);

	if (!snapshot) {
		throw new Error(`There is no snapshot named "${name}".`);
	}

	restoreFromObject(snapshot.state);
}

/**
 * Removes a snapshot, then dispatches a `backstage-state-snapshots-update`
 * event on `window`. If given a name of a nonexistent snapshot, this doesn't
 * make any changes but still dispatches the event.
 */
export function removeSnapshot(name: string) {
	snapshots = snapshots.filter(({name: existingName}) => name !== existingName);
	saveToStorage();
	window.dispatchEvent(new CustomEvent('backstage-state-snapshots-update'));
}

function restoreFromStorage() {
	try {
		snapshots = JSON.parse(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			window.localStorage.getItem(
				`chapbookbackstage-snapshots-${get('config.state.saveKey')}`
			)!
		);

		if (!Array.isArray(snapshots)) {
			snapshots = [];
		}
	} catch {
		snapshots = [];
	}
}

function saveToStorage() {
	window.localStorage.setItem(
		`chapbookbackstage-snapshots-${get('config.state.saveKey')}`,
		JSON.stringify(snapshots)
	);
}

/**
 * Returns all snapshot names.
 */
export function snapshotNames() {
	return snapshots.map(({name}) => name);
}

/**
 * Initializes snapshot functionality.
 */
export function initStateSnapshots() {
	restoreFromStorage();
}
