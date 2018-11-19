/*
Browser related lookups.
*/

export default function init(setLookup) {
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
