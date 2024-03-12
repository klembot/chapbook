import {beforeEach, describe, expect, it, vi} from 'vitest';
import {initLookups} from '..';
import {initStoryLookups} from '../story';
import {initEngineLookups} from '../engine';
import {initNowLookups} from '../now';
import {initPassageLookups} from '../passage';
import {initRandomLookups} from '../random';
import {initBrowserLookups} from '../browser';

vi.mock('../browser');
vi.mock('../engine');
vi.mock('../now');
vi.mock('../passage');
vi.mock('../random');
vi.mock('../story');

describe('initLookups', () => {
	const initBrowserLookupsMock = vi.mocked(initBrowserLookups);
	const initEngineLookupsMock = vi.mocked(initEngineLookups);
	const initNowLookupsMock = vi.mocked(initNowLookups);
	const initPassageLookupsMock = vi.mocked(initPassageLookups);
	const initRandomLookupsMock = vi.mocked(initRandomLookups);
	const initStoryLookupsMock = vi.mocked(initStoryLookups);

	beforeEach(() => {
		initBrowserLookupsMock.mockReset();
		initEngineLookupsMock.mockReset();
		initNowLookupsMock.mockReset();
		initPassageLookupsMock.mockReset();
		initRandomLookupsMock.mockReset();
		initStoryLookupsMock.mockReset();
	});

	it('calls initBrowserLookups', () => {
		initLookups();
		expect(initBrowserLookupsMock).toBeCalledTimes(1);
	});

	it('calls initEngineLookups', () => {
		initLookups();
		expect(initEngineLookupsMock).toBeCalledTimes(1);
	});

	it('calls initNowLookups', () => {
		initLookups();
		expect(initNowLookupsMock).toBeCalledTimes(1);
	});

	it('calls initPassageLookups', () => {
		initLookups();
		expect(initPassageLookupsMock).toBeCalledTimes(1);
	});

	it('calls initRandomLookups', () => {
		initLookups();
		expect(initRandomLookupsMock).toBeCalledTimes(1);
	});

	it('calls initStoryLookups', () => {
		initLookups();
		expect(initStoryLookupsMock).toBeCalledTimes(1);
	});
});
