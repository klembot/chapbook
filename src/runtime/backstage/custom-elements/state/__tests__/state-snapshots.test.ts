import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../../util/custom-element';
import {StateSnapshots} from '../state-snapshots';
import {fireEvent, render, screen} from '../../../../../test-utils';
import {
	addSnapshot,
	loadSnapshot,
	removeSnapshot,
	snapshotNames
} from '../../../state-snapshots';

vi.mock('../../../state-snapshots');

describe('<state-snapshots>', () => {
	const addSnapshotMock = vi.mocked(addSnapshot);
	const loadSnapshotMock = vi.mocked(loadSnapshot);
	const removeSnapshotMock = vi.mocked(removeSnapshot);
	const snapshotNamesMock = vi.mocked(snapshotNames);

	beforeAll(() => {
		defineElements({'backstage-state-snapshots': StateSnapshots});
	});

	beforeEach(() => {
		addSnapshotMock.mockClear();
		removeSnapshotMock.mockClear();
		snapshotNamesMock.mockReturnValue(['snapshot-1', 'snapshot-2']);
	});

	it('shows a button for every state snapshot', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		expect(
			screen.getByRole('button', {name: "Restore 'snapshot-1' snapshot"})
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', {name: "Restore 'snapshot-2' snapshot"})
		).toBeInTheDocument();
	});

	it('shows a button for removing each snapshot', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		expect(
			screen.getByRole('button', {name: "Remove 'snapshot-1' snapshot"})
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', {name: "Remove 'snapshot-2' snapshot"})
		).toBeInTheDocument();
	});

	it('restores a snapshot when its button is clicked', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		fireEvent.click(
			screen.getByRole('button', {name: "Restore 'snapshot-1' snapshot"})
		);
		expect(loadSnapshotMock.mock.calls).toEqual([['snapshot-1']]);
	});

	it('removes a snapshot when that button is clicked and the user confirms', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		vi.stubGlobal('confirm', () => true);
		fireEvent.click(
			screen.getByRole('button', {name: "Remove 'snapshot-1' snapshot"})
		);
		expect(removeSnapshotMock.mock.calls).toEqual([['snapshot-1']]);
		vi.unstubAllGlobals();
	});

	it("doesn't do anything if the user doesn't confirm removing the snapshot", () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		vi.stubGlobal('confirm', () => false);
		fireEvent.click(
			screen.getByRole('button', {name: "Remove 'snapshot-1' snapshot"})
		);
		expect(removeSnapshotMock).not.toBeCalled();
		vi.unstubAllGlobals();
	});

	it('shows a button for adding a new snapshot', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		vi.stubGlobal('prompt', () => 'snapshot-name');
		fireEvent.click(screen.getByRole('button', {name: 'Add Snapshot'}));
		expect(addSnapshotMock.mock.calls).toEqual([['snapshot-name']]);
		vi.unstubAllGlobals();
	});

	it('does nothing if the user cancels out of entering a name', () => {
		render('<backstage-state-snapshots></backstage-state-snapshots>');
		vi.stubGlobal('prompt', () => null);
		fireEvent.click(screen.getByRole('button', {name: 'Add Snapshot'}));
		expect(addSnapshotMock).not.toBeCalled();
		vi.unstubAllGlobals();
	});

	it("doesn't allow creating a new snapshot with an existing name", () => {
		const alert = vi.fn();

		render('<backstage-state-snapshots></backstage-state-snapshots>');
		vi.stubGlobal('prompt', () => 'snapshot-1');
		vi.stubGlobal('alert', alert);
		fireEvent.click(screen.getByRole('button', {name: 'Add Snapshot'}));
		expect(addSnapshotMock).not.toBeCalled();
		expect(alert.mock.calls).toEqual([
			['A snapshot already exists with this name.']
		]);
		vi.unstubAllGlobals();
	});
});
