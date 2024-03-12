import {beforeAll, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {getHistory, rewindTo} from '../../../state-recorder';
import {HistoryTable} from '../history-table';

vi.mock('../../../state-recorder');

describe('<backstage-history-table>', () => {
	beforeAll(() => {
		defineElements({'backstage-history-table': HistoryTable});
	});

	const getHistoryMock = vi.mocked(getHistory);
	const rewindToMock = vi.mocked(rewindTo);

	it('displays a rewind button and table for every passage entry in state history', () => {
		getHistoryMock.mockReturnValue([
			{change: {name: 'trail', value: ['start']}, state: {}},
			{change: {name: 'test', value: true}, state: {}},
			{change: {name: 'trail', value: ['start', 'first']}, state: {}},
			{change: {name: 'test', value: false}, state: {}}
		]);
		render('<backstage-history-table></backstage-history-table>');
		expect(
			screen.getByRole('button', {name: 'Rewind to Startup'})
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', {name: 'Rewind to start'})
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', {name: 'Rewind to first'})
		).toBeInTheDocument();
		expect(screen.getAllByRole('table').length).toBe(3);
	});

	it('rewinds state to a moment in history when a rewind button is clicked', () => {
		getHistoryMock.mockReturnValue([
			{change: {name: 'trail', value: ['start']}, state: {}},
			{change: {name: 'test', value: true}, state: {}},
			{change: {name: 'test', value: false}, state: {}},
			{change: {name: 'trail', value: ['start', 'first']}, state: {}},
			{change: {name: 'test', value: false}, state: {}}
		]);
		render('<backstage-history-table></backstage-history-table>');
		fireEvent.click(screen.getByRole('button', {name: 'Rewind to Startup'}));
		expect(rewindToMock.mock.lastCall).toEqual([-1]);
		fireEvent.click(screen.getByRole('button', {name: 'Rewind to start'}));
		expect(rewindToMock.mock.lastCall).toEqual([2]);
		fireEvent.click(screen.getByRole('button', {name: 'Rewind to first'}));
		expect(rewindToMock.mock.lastCall).toEqual([4]);
	});

	it('updates display when a backstage-state-recorder-update event is dispatched on the window', () => {
		getHistoryMock.mockReturnValue([
			{change: {name: 'test', value: true}, state: {}}
		]);
		render('<backstage-history-table></backstage-history-table>');
		expect(
			screen.queryByRole('button', {name: 'Rewind to start'})
		).not.toBeInTheDocument();
		getHistoryMock.mockReturnValue([
			{change: {name: 'test', value: true}, state: {}},
			{change: {name: 'trail', value: ['start']}, state: {}}
		]);
		window.dispatchEvent(new CustomEvent('backstage-state-recorder-update'));
		expect(
			screen.getByRole('button', {name: 'Rewind to start'})
		).toBeInTheDocument();
	});
});
