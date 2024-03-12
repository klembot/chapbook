import {SpyInstance, beforeEach, describe, expect, it, vi} from 'vitest';
import {get, setLookup} from '../../state';
import {initPassageLookups} from '../passage';
import {mute, unmute} from '../../../logger';

vi.mock('../../state');

describe('initPassageLookups', () => {
	const getMock = vi.mocked(get);
	const setLookupMock = vi.mocked(setLookup);
	let warnSpy: SpyInstance;

	beforeEach(() => {
		getMock.mockImplementation(name =>
			name === 'trail' ? ['one', 'two'] : undefined
		);
		warnSpy = vi.spyOn(window.console, 'warn');
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		warnSpy.mockImplementation(() => {});
	});

	it('sets passage.name to the name of the last entry of the trail variable', () => {
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.name'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe('two');
	});

	it('sets passage.name correctly if the trail variable has a single entry', () => {
		getMock.mockImplementation(name =>
			name === 'trail' ? ['one'] : undefined
		);
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.name'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe('one');
	});

	it('sets passage.name to undefined and logs a warning if the trail variable is not an array', () => {
		unmute('lookups');
		getMock.mockReturnValue(undefined);
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.name'
		);

		expect(setupCall).not.toBeUndefined();
		expect(warnSpy).not.toBeCalled();
		expect(setupCall?.[1]()).toBeUndefined();
		expect(warnSpy).toBeCalledTimes(1);
		mute('lookups');
	});

	it('sets passage.name to undefined if the trail variable is an empty array', () => {
		getMock.mockImplementation(name => (name === 'trail' ? [] : undefined));
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.name'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBeUndefined();
	});

	it('sets passage.visits to the number of times the passage appears in the trail variable', () => {
		getMock.mockImplementation(name => {
			switch (name) {
				case 'trail':
					return ['five', 'one', 'two', 'three', 'two', 'one'];
				case 'passage.name':
					return 'one';
				default:
					return;
			}
		});
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.visits'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(2);
	});

	it('sets passage.visits to 0 if the trail variable is an empty array', () => {
		getMock.mockImplementation(name => {
			switch (name) {
				case 'trail':
					return [];
				case 'passage.name':
					return 'one';
				default:
					return;
			}
		});
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.visits'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(0);
	});

	it('sets passage.visits to 0 and logs a warning if the trail variable is not an array', () => {
		unmute('lookups');
		getMock.mockImplementation(name => {
			switch (name) {
				case 'trail':
					return;
				case 'passage.name':
					return 'one';
				default:
					return;
			}
		});
		initPassageLookups();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'passage.visits'
		);

		expect(setupCall).not.toBeUndefined();
		expect(warnSpy).not.toBeCalled();
		expect(setupCall?.[1]()).toBe(0);
		expect(warnSpy).toBeCalledTimes(1);
		mute('lookups');
	});
});
