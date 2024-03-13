import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {initNowLookups} from '../now';
import {setLookup} from '../../state';

vi.mock('../../state');

describe('initNowLookups', () => {
	const testDate = new Date();
	const setLookupMock = vi.mocked(setLookup);

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(testDate);
		initNowLookups();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it.each([
		['datestamp', testDate.toLocaleDateString(navigator.language)],
		['second', testDate.getSeconds()],
		['minute', testDate.getMinutes()],
		['hour', testDate.getHours()],
		['day', testDate.getDate()],
		['weekday', testDate.getDay() + 1],
		[
			'weekdayName',
			testDate.toLocaleString(navigator.language, {weekday: 'long'})
		],
		['month', testDate.getMonth() + 1],
		['monthName', testDate.toLocaleString(navigator.language, {month: 'long'})],
		['year', testDate.getFullYear()],
		[
			'timestamp',
			testDate.toLocaleString(navigator.language, {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			})
		]
	])(`sets now.%s correctly`, (lookupName, expected) => {
		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === `now.${lookupName}`
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(expected);
	});
});
