import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
	clearNotes,
	exportNotesToString,
	getNoteForPassage,
	importNotesFromString,
	initNotes,
	setNoteForPassage
} from '../notes';
import {get} from '../../state';

vi.mock('../../state');

vi.mocked(get).mockImplementation(name => {
	switch (name) {
		case 'config.state.saveKey':
			return 'mock-save-key';
		case 'engine.version':
			return '1.2.3';
		case 'story.name':
			return 'mock-story-name';
	}

	return;
});

describe('clearNotes', () => {
	beforeEach(clearNotes);

	it('deletes all notes', () => {
		setNoteForPassage('test', 'test note');
		expect(getNoteForPassage('test')).not.toBeUndefined();
		clearNotes();
		expect(getNoteForPassage('test')).toBeUndefined();
	});

	it('saves changes to local storage', () => {
		setNoteForPassage('test', 'test note');
		expect(
			window.localStorage.getItem(
				'chapbookbackstage-passage-notes-mock-save-key'
			)
		).not.toBe(null);
		clearNotes();
		expect(
			window.localStorage.getItem(
				'chapbookbackstage-passage-notes-mock-save-key'
			)
		).toEqual('{}');
	});
});

describe('exportNotes', () => {
	beforeEach(clearNotes);

	it('returns HTML for all notes content', () => {
		setNoteForPassage('test', 'test note');
		setNoteForPassage('test 2', 'test note 2');
		expect(exportNotesToString()).toBe(
			'<h1>Notes for &ldquo;mock-story-name&rdquo;</h1>' +
				'<ul data-cb-backstage-notes data-cb-version="1.2.3">' +
				'<li class="note"><span class="passage">test</span><pre>test note</pre></li>' +
				'<li class="note"><span class="passage">test 2</span><pre>test note 2</pre></li></ul>'
		);
	});

	it('defaults the story name to "Story" if it is not set', () => {
		vi.mocked(get).mockImplementation(name => {
			switch (name) {
				case 'config.state.saveKey':
					return 'mock-save-key';
				case 'engine.version':
					return '1.2.3';
			}

			return;
		});
		setNoteForPassage('test', 'test note');
		expect(exportNotesToString()).toBe(
			'<h1>Notes for &ldquo;Story&rdquo;</h1>' +
				'<ul data-cb-backstage-notes data-cb-version="1.2.3">' +
				'<li class="note"><span class="passage">test</span><pre>test note</pre></li></ul>'
		);
	});
});

describe('getNoteForPassage', () => {
	beforeEach(clearNotes);

	it('returns a previously-set note for a passage', () => {
		setNoteForPassage('test', 'test note');
		expect(getNoteForPassage('test')).toBe('test note');
	});

	it('returns undefined if there is no note for the passage', () => {
		expect(getNoteForPassage('unset')).toBe(undefined);
	});
});

describe('importNotesFromString', () => {
	beforeEach(clearNotes);

	const importSource = `<ul data-cb-backstage-notes>
		<li><span class="passage">test</span><pre>note text</pre></li>
		<li><span class="passage">test 2</span><pre>note text 2</pre></li>
	</ul>`;

	it('imports notes from a string', () => {
		importNotesFromString(importSource);
		expect(getNoteForPassage('test')).toBe('note text');
		expect(getNoteForPassage('test 2')).toBe('note text 2');
	});

	it("retains existing notes if they don't conflict with the imported notes", () => {
		setNoteForPassage('unrelated', 'preserved');
		importNotesFromString(importSource);
		expect(getNoteForPassage('unrelated')).toBe('preserved');
	});

	it('appends notes on a passage if there are pre-existing ones', () => {
		setNoteForPassage('test', 'preserved');
		importNotesFromString(importSource);
		expect(getNoteForPassage('test')).toBe('preserved\n\nnote text');
	});

	it('saves changes to local storage', () => {
		importNotesFromString(importSource);
		expect(
			window.localStorage.getItem(
				'chapbookbackstage-passage-notes-mock-save-key'
			)
		).toBe(JSON.stringify({test: 'note text', 'test 2': 'note text 2'}));
	});

	it('returns the number of notes in the string', () =>
		expect(importNotesFromString(importSource)).toBe(2));

	describe("If the string can't be parsed", () => {
		it('returns 0', () => expect(importNotesFromString('bad')).toBe(0));

		it('preserves existing notes', () => {
			setNoteForPassage('unrelated', 'preserved');
			importNotesFromString('bad');
			expect(getNoteForPassage('unrelated')).toBe('preserved');
		});
	});
});

describe('initNotes', () => {
	beforeEach(clearNotes);

	it('sets notes based on local storage', () => {
		window.localStorage.setItem(
			'chapbookbackstage-passage-notes-mock-save-key',
			JSON.stringify({note: 'note text', note2: 'note text 2'})
		);
		initNotes();
		expect(getNoteForPassage('note')).toBe('note text');
		expect(getNoteForPassage('note2')).toBe('note text 2');
	});

	it('does nothing if local storage is not present', () => {
		initNotes();
		expect(getNoteForPassage('note')).toBeUndefined();
	});

	it("does nothing is local storage isn't valid JSON", () => {
		window.localStorage.setItem('cb-passage-notes-mock-save-key', 'bad');
		initNotes();
		expect(getNoteForPassage('note')).toBeUndefined();
	});

	it("does nothing if local storage isn't an object", () => {
		window.localStorage.setItem('cb-passage-notes-mock-save-key', '"bad"');
		initNotes();
		expect(getNoteForPassage('note')).toBeUndefined();
	});
});

describe('setNoteForPassage', () => {
	beforeEach(clearNotes);

	it('sets the note for a passage', () => {
		setNoteForPassage('test', 'test note');
		expect(getNoteForPassage('test')).toBe('test note');
	});

	it('saves changes to local storage', () => {
		setNoteForPassage('test', 'test note');
		expect(
			window.localStorage.getItem(
				'chapbookbackstage-passage-notes-mock-save-key'
			)
		).toBe(JSON.stringify({test: 'test note'}));
	});
});
