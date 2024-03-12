import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {
	dispatchStateChange,
	fireEvent,
	render,
	screen
} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {Notes} from '../notes';
import {get} from '../../../../state';
import {clearNotes, getNoteForPassage, setNoteForPassage} from '../../../notes';

vi.mock('../../../../state');
vi.mock('../../../notes');

describe('<backstage-notes>', () => {
	const clearNotesMock = vi.mocked(clearNotes);
	const getMock = vi.mocked(get);
	const getNoteForPassageMock = vi.mocked(getNoteForPassage);
	const setNoteForPassageMock = vi.mocked(setNoteForPassage);

	beforeAll(() => {
		defineElements({'backstage-notes': Notes});
		getNoteForPassageMock.mockImplementation(
			(name: string) => `note-for-${name}`
		);
	});

	beforeEach(() => {
		clearNotesMock.mockClear();
		getMock.mockImplementation((name: string) => {
			if (name === 'trail') {
				return ['passage'];
			}

			return undefined;
		});
	});

	it('shows a textarea for entering notes about the current passage', () => {
		render('<backstage-notes></backstage-notes>');
		expect(
			screen.getByRole('textbox', {name: 'Notes on "passage"'})
		).toHaveValue('note-for-passage');
	});

	it('changes notes when the current passage changes', () => {
		render('<backstage-notes></backstage-notes>');
		expect(
			screen.getByRole('textbox', {name: 'Notes on "passage"'})
		).toBeInTheDocument();
		getMock.mockImplementation((name: string) => {
			if (name === 'trail') {
				return ['passage', 'changed-passage'];
			}

			return undefined;
		});
		dispatchStateChange('trail', 'ignored');
		expect(
			screen.getByRole('textbox', {name: 'Notes on "changed-passage"'})
		).toHaveValue('note-for-changed-passage');
	});

	it('sets the note for a passage when the textarea is edited', () => {
		render('<backstage-notes></backstage-notes>');
		fireEvent.change(
			screen.getByRole('textbox', {name: 'Notes on "passage"'}),
			{target: {value: 'test-note'}}
		);
		expect(setNoteForPassageMock.mock.calls).toEqual([
			['passage', 'test-note']
		]);
	});

	it('shows a button that deletes all notes after prompting for confirmation', () => {
		const confirm = vi.fn(() => true);

		render('<backstage-notes></backstage-notes>');
		expect(clearNotesMock).not.toBeCalled();
		vi.stubGlobal('confirm', confirm);
		fireEvent.click(screen.getByRole('button', {name: 'Delete All Notes'}));
		expect(confirm).toBeCalledTimes(1);
		expect(clearNotesMock).toBeCalledTimes(1);
	});

	it("doesn't delete notes if the user declines the confirmation", () => {
		const confirm = vi.fn(() => false);

		render('<backstage-notes></backstage-notes>');
		expect(clearNotesMock).not.toBeCalled();
		vi.stubGlobal('confirm', confirm);
		fireEvent.click(screen.getByRole('button', {name: 'Delete All Notes'}));
		expect(confirm).toBeCalledTimes(1);
		expect(clearNotesMock).not.toBeCalled();
	});

	// Skipping tests around import and export because they deal with file upload.
});
