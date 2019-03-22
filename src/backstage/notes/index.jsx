// The Notes tab of backstage.

import escape from 'lodash.escape';
import {h, Component} from 'preact';
import event from '../../event';
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
		const exportWindow = window.open('', '_blank');
		const noteHtml = Object.keys(this.state.notes).reduce(
			(result, current) =>
				result +
				`<li>${escape(current)}<pre>${escape(
					this.state.notes[current]
				)}</pre></li>`,
			''
		);

		exportWindow.document.write(
			`<style>body {font-family: sans-serif}</style><h1>Notes for &ldquo;${escape(
				get('story.name')
			)}&rdquo;</h1><p>Save this page to a file to import in another browser.</p><ul>${noteHtml}</ul>`
		);
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
					<button onClick={() => this.deleteAll()}>
						Delete All Notes
					</button>
				</p>
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
