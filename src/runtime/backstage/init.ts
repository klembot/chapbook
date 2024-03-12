import {initStateRecorder} from './state-recorder';
import {initStateSnapshots} from './state-snapshots';
import {initBackstageCustomElements} from './custom-elements/init';
import {initNotes} from './notes';

/**
 * Initializes Chapbook's backstage functionality and adds the backstage UI to
 * the DOM.
 */
export function initBackstage() {
	initNotes();
	initStateRecorder();
	initStateSnapshots();
	initBackstageCustomElements();
	document.body.appendChild(document.createElement('backstage-sidebar'));
}
