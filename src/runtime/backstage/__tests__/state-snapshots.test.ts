import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
	addSnapshot,
	clear,
	initStateSnapshots,
	loadSnapshot,
	removeSnapshot,
	snapshotNames
} from '../state-snapshots';
import {get, restoreFromObject, saveToObject} from '../../state';

vi.mock('../../state');

vi.mocked(get).mockImplementation(name => {
	if (name === 'config.state.saveKey') {
		return 'mock-save-key';
	}

	return;
});

vi.mocked(saveToObject).mockReturnValue({mockState: true});

describe('addSnapshot', () => {
	beforeEach(clear);

	it('adds a snapshot of state', () => {
		addSnapshot('test');
		expect(snapshotNames()).toEqual(['test']);
	});

	it('saves changes to local storage', () => {
		addSnapshot('test');
		expect(
			window.localStorage.getItem('chapbookbackstage-snapshots-mock-save-key')
		).toEqual(
			JSON.stringify([
				{
					name: 'test',
					state: {mockState: true}
				}
			])
		);
	});

	it('dispatches a backstage-state-snapshots-update event on the window', () => {
		const listener = vi.fn();

		window.addEventListener('backstage-state-snapshots-update', listener);
		addSnapshot('test');
		expect(listener).toBeCalledTimes(1);
	});
});

describe('clear', () => {
	beforeEach(() => {
		clear();
		addSnapshot('test');
	});

	it('removes all snapshots', () => {
		clear();
		expect(snapshotNames()).toEqual([]);
	});

	it('saves changes to local storage', () => {
		clear();
		expect(
			expect(
				window.localStorage.getItem('chapbookbackstage-snapshots-mock-save-key')
			).toEqual(JSON.stringify([]))
		);
	});

	it('dispatches a backstage-state-snapshots-update event on the window', () => {
		const listener = vi.fn();

		window.addEventListener('backstage-state-snapshots-update', listener);
		clear();
		expect(listener).toBeCalledTimes(1);
	});
});

describe('loadSnapshot', () => {
	const restoreFromObjectMock = vi.mocked(restoreFromObject);

	beforeEach(clear);

	it('calls restoreObject on the snapshot state', () => {
		addSnapshot('test');
		loadSnapshot('test');
		expect(restoreFromObjectMock.mock.calls).toEqual([[{mockState: true}]]);
	});

	it('throws an error if passed a nonexistent snapshot name', () => {
		expect(() => loadSnapshot('test')).toThrow();
	});
});

describe('initStateSnapshots', () => {
	beforeEach(() => window.localStorage.clear());

	it('restores snapshots from local storage', () => {
		window.localStorage.clear();
		window.localStorage.setItem(
			'chapbookbackstage-snapshots-mock-save-key',
			JSON.stringify([
				{name: 'bbb', state: {}},
				{name: 'aaa', state: {}}
			])
		);
		initStateSnapshots();
		expect(snapshotNames()).toEqual(['bbb', 'aaa']);
	});

	it('does nothing if local storage is not present', () => {
		initStateSnapshots();
		expect(snapshotNames()).toEqual([]);
	});

	it("does nothing if local storage isn't valid JSON", () => {
		window.localStorage.setItem(
			'chapbookbackstage-snapshots-mock-save-key',
			'bad'
		);
		initStateSnapshots();
		expect(snapshotNames()).toEqual([]);
	});

	it("does nothing if local storage isn't an array", () => {
		window.localStorage.setItem(
			'chapbookbackstage-snapshots-mock-save-key',
			JSON.stringify({bad: true})
		);
		initStateSnapshots();
		expect(snapshotNames()).toEqual([]);
	});
});

describe('removeSnapshot', () => {
	beforeEach(() => {
		clear();
		addSnapshot('test');
		addSnapshot('test2');
	});

	it('removes a snapshot', () => {
		removeSnapshot('test2');
		expect(snapshotNames()).toEqual(['test']);
	});

	it('does nothing if there is no snapshot with the name passed', () => {
		removeSnapshot('missing');
		expect(snapshotNames()).toEqual(['test', 'test2']);
	});

	it('saves changes to local storage', () => {
		removeSnapshot('test');
		expect(
			window.localStorage.getItem('chapbookbackstage-snapshots-mock-save-key')
		).toEqual(
			JSON.stringify([
				{
					name: 'test2',
					state: {mockState: true}
				}
			])
		);
	});

	it('dispatches a backstage-state-snapshots-update event on the window', () => {
		const listener = vi.fn();

		window.addEventListener('backstage-state-snapshots-update', listener);
		removeSnapshot('test');
		expect(listener).toBeCalledTimes(1);
	});
});

describe('snapshotNames', () => {
	it('returns all snapshot names, in order of creation', () => {
		clear();
		addSnapshot('bbb');
		expect(snapshotNames()).toEqual(['bbb']);
		addSnapshot('aaa');
		expect(snapshotNames()).toEqual(['bbb', 'aaa']);
	});
});