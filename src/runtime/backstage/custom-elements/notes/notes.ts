import {StateChangeEventDetail} from '../../../custom-events';
import {get} from '../../../state';
import {
	exportNotesToString,
	getNoteForPassage,
	importNotesFromString,
	clearNotes,
	setNoteForPassage
} from '../../notes';
import {CustomElement} from '../../../util/custom-element';
import './notes.css';

function currentPassageName(): string | undefined {
	const trail = get('trail');

	if (!Array.isArray(trail)) {
		return;
	}

	return trail[trail.length - 1];
}

/**
 * This shows a textarea where the user can enter notes about the current
 * passage, and controls to import and export notes, as well as clear them. This
 * is available as `<backstage-notes>`.
 */
export class Notes extends CustomElement {
	constructor() {
		super();
		this.delegate('change', 'input[type="file"]', event => {
			const file = (event.target as HTMLInputElement).files?.[0];

			if (file) {
				const reader = new FileReader();

				reader.onload = event => {
					const count = importNotesFromString(
						(event.target as FileReader).result as string
					);

					window.alert(`${count} note(s) were imported.`);
				};
				reader.readAsText(file);
			}
		});
		this.delegate('change', 'textarea', event => {
			const name = currentPassageName();

			if (!name) {
				return;
			}

			setNoteForPassage(name, (event.target as HTMLTextAreaElement).value);
		});
		this.delegate('click', '[data-export]', () => {
			const noteHtml = exportNotesToString();
			const link = document.createElement('a');
			let storyName = get('story.name');

			if (typeof storyName !== 'string') {
				storyName = 'Story';
			}

			link.setAttribute(
				'download',
				`${get(
					'story.name'
				)} Notes - ${new Date().toDateString()} ${new Date().toTimeString()}.html`
			);
			link.setAttribute(
				'href',
				'data:text/html;base64,' + window.btoa(noteHtml)
			);

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});
		this.delegate('click', '[data-import]', () => {
			this.query('input[type="file"]').click();
		});
		this.delegate('click', '[data-reset]', () => {
			if (
				window.confirm(
					'Are you sure? This will delete all text entered in the Notes panel of Backstage, and cannot be undone.'
				)
			) {
				clearNotes();
			}
		});
	}

	connectedCallback() {
		this.defaultHtml(`
			<label for="backstage-notes-textarea"></label>
				<textarea id="backstage-notes-textarea"></textarea>
				<div class="actions">
					<button data-export>Export All Notes</button>
					<button data-import>Import Notes</button>
					<button data-reset>Delete All Notes</button>
				</div>
				<input type="file" hidden />
		`);
		window.addEventListener('state-change', this);
		this.update();
	}

	disconnectedCallback() {
		window.removeEventListener('state-change', this);
	}

	handleEvent(event: CustomEvent<StateChangeEventDetail>) {
		if (event.detail.name === 'trail') {
			this.update();
		}
	}

	update() {
		const name = currentPassageName();

		if (!name) {
			return;
		}

		this.query<HTMLTextAreaElement>('#backstage-notes-textarea').value =
			getNoteForPassage(name) ?? '';
		this.query(
			'label[for="backstage-notes-textarea"]'
		).textContent = `Notes on "${name}"`;
	}
}
