import {afterEach, beforeEach, expect} from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const originalWindowAddEventListener = window.addEventListener;
let windowEventListeners: Parameters<typeof window.addEventListener>[];

beforeEach(() => {
	// Add a spy on window.addEventListener that records the listeners, because
	// our code may call it during the test.
	//
	// See https://stackoverflow.com/a/72984394

	windowEventListeners = [];
	window.addEventListener = (
		...args: Parameters<typeof window.addEventListener>
	) => {
		windowEventListeners.push(args);
		originalWindowAddEventListener(...args);
	};

	// Reset the DOM.

	document.head.innerHTML = '';
	document.body.innerHTML = '';
});

afterEach(() => {
	// Remove listeners that were added during the test.

	for (const listener of windowEventListeners) {
		window.removeEventListener(...listener);
	}
});
