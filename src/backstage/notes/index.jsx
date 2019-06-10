// The Notes tab of backstage.

import escape from 'lodash.escape';
import {h, Component} from 'preact';
import event from '../../event';
import {select, selectAll} from '../../util/dom-select';
import {get} from '../../state';

export default class Notes extends Component {
	constructor(props) {
		super(props);

		const trail = get('trail');

		this.state = {currentPassage: trail[trail.length - 1], notes: {}};
		this.restore();

		this.syncBound = e => this.sync(e);
	}

	sync({name, value}) {
		if (name === 'trail') {
			this.setState({currentPassage: value[value.length - 1]});
		}
	}

	restore() {
		const toRestore = window.localStorage.getItem(
			`cb-passage-notes-${get('config.state.saveKey')}`
		);

		if (toRestore) {
			this.setState({notes: JSON.parse(toRestore)});
		}
	}

	save() {
		window.localStorage.setItem(
			`cb-passage-notes-${get('config.state.saveKey')}`,
			JSON.stringify(this.state.notes)
		);
	}

	saveNote(passageName, text) {
		const newNotes = Object.assign({}, this.state.notes);

		newNotes[passageName] = text;
		this.setState({notes: newNotes});
		this.save();
	}

	export() {
		const noteHtml = Object.keys(this.state.notes).reduce(
			(result, current) =>
				result +
				`<li class="note"><span class="passage">${escape(
					current
				)}</span><pre>${escape(this.state.notes[current])}</pre></li>`,
			''
		);

		const link = document.createElement('a');

		link.setAttribute(
			'download',
			`${get(
				'story.name'
			)} Notes - ${new Date().toDateString()} ${new Date().toTimeString()}.html`
		);
		link.setAttribute(
			'href',
			'data:text/html;base64,' +
				window.btoa(
					`<style>body {font-family: sans-serif}</style><h1>Notes for &ldquo;${escape(
						get('story.name')
					)}&rdquo;</h1><ul data-cb-backstage-notes data-cb-version="${get(
						'engine.version'
					)}">${noteHtml}</ul>`
				)
		);

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	startImport() {
		this.upload.click();
	}

	import(e) {
		const file = this.upload.files[0];

		if (!file) {
			return;
		}

		const reader = new FileReader(file);

		reader.onload = e => {
			const src = document.createElement('div');
			const newNotes = Object.assign({}, this.state.notes);
			let imported = 0;

			src.innerHTML = e.target.result;

			const notes = selectAll(src, 'ul[data-cb-backstage-notes] li');

			if (notes.length === 0) {
				window.alert('No notes were found in this file.');
				return;
			}

			notes.forEach(n => {
				const passage = select(n, 'span.passage');
				const note = select(n, 'pre');

				if (passage && note) {
					newNotes[passage.textContent] =
						(newNotes[passage.textContent] || '') +
						'\n\n' +
						note.textContent;

					imported++;
				}
			});

			this.setState({notes: newNotes});
			this.save();
			window.alert(`${imported} note(s) were imported.`);
		};
		reader.readAsText(file);
	}

	deleteAll() {
		if (
			window.confirm(
				'Are you sure? This will delete all text entered in the Notes panel of Backstage, and cannot be undone.'
			)
		) {
			this.setState({notes: {}});
			this.save();
		}
	}

	render() {
		return (
			<div>
				<p>
					<label>
						Notes on &ldquo;{this.state.currentPassage}&rdquo;
					</label>
				</p>
				<p>
					<textarea
						value={this.state.notes[this.state.currentPassage]}
						onInput={e =>
							this.saveNote(
								this.state.currentPassage,
								e.target.value
							)
						}
					/>
				</p>
				<p>
					<button onClick={() => this.export()}>
						Export All Notes
					</button>
					<button onClick={() => this.startImport()}>
						Import Notes From File
					</button>
					<button onClick={() => this.deleteAll()}>
						Delete All Notes
					</button>
				</p>
				<input
					type="file"
					hidden
					ref={upload => (this.upload = upload)}
					onChange={() => this.import()}
				/>
			</div>
		);
	}

	componentDidMount() {
		event.on('state-change', this.syncBound);
	}

	componentDidUnmount() {
		event.removeListener('state-change', this.syncBound);
	}
}
