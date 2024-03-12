import {escape} from 'lodash-es';
import {get} from '../state';

let notes: Record<string, string> = {};

/**
 * Erases all backstage notes.
 */
export function clearNotes() {
	notes = {};
	saveNotes();
}

/**
 * Returns a string for all notes that can be re-imported via
 * `importNotesFromString`.
 */
export function exportNotesToString() {
	const noteHtml = Object.keys(notes).reduce(
		(result, current) =>
			result +
			`<li class="note"><span class="passage">${escape(
				current
			)}</span><pre>${escape(notes[current])}</pre></li>`,
		''
	);
	let storyName = get('story.name');

	if (typeof storyName !== 'string') {
		storyName = 'Story';
	}

	return `<h1>Notes for &ldquo;${escape(
		storyName as string
	)}&rdquo;</h1><ul data-cb-backstage-notes data-cb-version="${get(
		'engine.version'
	)}">${noteHtml}</ul>`;
}

/**
 * Returns the note for a passage. If there is no note for the passage, returns
 * undefined.
 */
export function getNoteForPassage(name: string): string | undefined {
	return notes[name];
}

/**
 * Imports notes from the result of a `exportNotesToString()` call. If a note
 * already exists for a passage, the note here is added to the end of the
 * existing text with two newlines separating them.
 *
 * @return number of notes imported
 */
export function importNotesFromString(source: string): number {
	const container = document.createElement('div');
	const newNotes = {...notes};
	let imported = 0;

	container.innerHTML = source;

	for (const noteEl of container.querySelectorAll(
		'ul[data-cb-backstage-notes] li'
	)) {
		const passage = noteEl.querySelector('span.passage');
		const note = noteEl.querySelector('pre');

		if (passage?.textContent && note?.textContent) {
			// Concatenate multiple notes on the same passage. This can happen if the
			// user has already entered notes on a passage and imports another file.

			if (newNotes[passage.textContent]) {
				newNotes[passage.textContent] = `${
					newNotes[passage.textContent] ?? ''
				}\n\n${note.textContent}`;
			} else {
				newNotes[passage.textContent] = note.textContent;
			}

			imported++;
		}
	}

	notes = newNotes;
	saveNotes();
	return imported;
}

/**
 * Sets notes based on what's stored in local storage.
 */
export function restoreNotes() {
	const toRestore = window.localStorage.getItem(
		`chapbookbackstage-passage-notes-${get('config.state.saveKey')}`
	);

	try {
		if (toRestore) {
			notes = JSON.parse(toRestore);

			if (typeof notes !== 'object' || Array.isArray(notes)) {
				notes = {};
			}
		}
	} catch {
		notes = {};
	}
}

function saveNotes() {
	window.localStorage.setItem(
		`chapbookbackstage-passage-notes-${get('config.state.saveKey')}`,
		JSON.stringify(notes)
	);
}

/**
 * Sets the note for a passage and saves it to local storage.
 */
export function setNoteForPassage(name: string, value: string) {
	notes[name] = value;
	saveNotes();
}

/**
 * Does all initialization related to notes.
 */
export function initNotes() {
	restoreNotes();
}