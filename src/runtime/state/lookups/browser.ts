import {setLookup} from '../state';

/**
 * Initializes browser-related lookups.
 */
export function initBrowserLookups() {
	setLookup('browser.height', () => {
		return window.innerHeight;
	});

	setLookup('browser.online', () => {
		return window.navigator.onLine;
	});

	setLookup('browser.width', () => {
		return window.innerWidth;
	});
}
