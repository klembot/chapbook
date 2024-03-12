import {describe, expect, it, vi} from 'vitest';
import {setLookup} from '../../state';
import {initBrowserLookups} from '../browser';

vi.mock('../../state');

describe('initBrowserLookups', () => {
	const setLookupMock = vi.mocked(setLookup);

	it('sets browser.height to the height of the browser window', () => {
		initBrowserLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'browser.height'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(window.innerHeight);
	});

	it('sets browser.width to the width of the browser window', () => {
		initBrowserLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'browser.width'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(window.innerWidth);
	});

	it('sets browser.online to whether the browser is online', () => {
		initBrowserLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'browser.online'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(navigator.onLine);
	});
});
