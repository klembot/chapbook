import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
	clear,
	getHistory,
	initStateRecorder,
	rewindTo
} from '../state-recorder';
import {get, restoreFromObject, saveToObject, setDefault} from '../../state';

vi.mock('../../state');

const getMock = vi.mocked(get);
const restoreFromObjectMock = vi.mocked(restoreFromObject);
const saveToObjectMock = vi
	.mocked(saveToObject)
	.mockImplementation(() => ({mockState: Math.random()}));
const setDefaultMock = vi.mocked(setDefault);

describe('initStateRecorder', () => {
	beforeEach(() => {
		initStateRecorder();
		getMock.mockImplementation(name => {
			if (name === 'config.backstage.trail.maxLength') {
				return 2;
			}

			return;
		});
	});

	afterEach(clear);

	it('defaults config.backstage.trail.maxLength to 100', () => {
		expect(setDefaultMock.mock.calls).toEqual([
			['config.backstage.trail.maxLength', 100]
		]);
	});

	it('adds a listener to the state-change event that records the change', () => {
		expect(getHistory()).toEqual([]);
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: true, previous: false}
			})
		);
		expect(getHistory()).toEqual([
			{
				change: {name: 'test', value: true},
				state: {mockState: expect.any(Number)}
			}
		]);
	});

	describe('When adding to recorder history', () => {
		it('truncates history to config.backstage.trail.maxLength', () => {
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {name: 'test', value: 1, previous: false}
				})
			);
			expect(getHistory().length).toBe(1);
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {name: 'test', value: 2, previous: 1}
				})
			);
			expect(getHistory().length).toBe(2);
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {name: 'test', value: 3, previous: 2}
				})
			);
			expect(getHistory()).toEqual([
				{
					change: {name: 'test', value: 2},
					state: {mockState: expect.any(Number)}
				},
				{
					change: {name: 'test', value: 3},
					state: {mockState: expect.any(Number)}
				}
			]);
		});

		it('emits a backstage-state-recorder-update event on the window', () => {
			const listener = vi.fn();

			window.addEventListener('backstage-state-recorder-update', listener);
			expect(listener).not.toBeCalled();
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {name: 'test', value: 2, previous: 1}
				})
			);
			expect(listener).toBeCalledTimes(1);
		});
	});

	it('adds a listener to the state-reset event that clears history', () => {
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: true, previous: false}
			})
		);
		expect(getHistory().length).toBe(1);
		window.dispatchEvent(new CustomEvent('state-reset'));
		expect(getHistory()).toEqual([]);
	});
});

describe('clear', () => {
	beforeEach(initStateRecorder);
	afterEach(clear);

	it('clears all history', () => {
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: true, previous: false}
			})
		);
		expect(getHistory().length).toBe(1);
		clear();
		expect(getHistory()).toEqual([]);
	});
});

describe('rewindTo', () => {
	beforeEach(() => {
		initStateRecorder();
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: 1, previous: false}
			})
		);
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: 2, previous: false}
			})
		);
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'test', value: 3, previous: false}
			})
		);
	});

	afterEach(() => {
		saveToObjectMock.mockRestore();
		clear();
	});

	it('restores state to the moment specified', () => {
		rewindTo(1);
		expect(restoreFromObjectMock.mock.calls).toEqual([[getHistory()[1].state]]);
	});

	it('removes all history after the moment rewinded to', () => {
		rewindTo(1);
		expect(getHistory().length).toBe(2);
	});

	it("doesn't add a moment for the rewind itself", () => {
		rewindTo(0);
		expect(getHistory().length).toBe(1);
	});

	it('throws an error if there is no moment at the index specified', () => {
		expect(() => rewindTo(3)).toThrow();
	});

	it('emits a backstage-state-recorder-update event on the window', () => {
		const listener = vi.fn();

		window.addEventListener('backstage-state-recorder-update', listener);
		rewindTo(0);
		expect(listener).toBeCalledTimes(1);
	});
});
