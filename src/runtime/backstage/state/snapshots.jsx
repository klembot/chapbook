// A panel allowing saving and restoring state.

import {h, Component} from 'preact';
import {get, restoreFromObject, saveToObject} from '../../state';
import Panel from '../panel';

export default class Snapshots extends Component {
	constructor(props) {
		super(props);
		this.state = {snapshots: []};
		this.restore();
	}

	addSnapshot() {
		const name = window.prompt('Enter a name for this snapshot:');

		if (name) {
			this.setState({
				snapshots: this.state.snapshots.concat({
					name,
					state: saveToObject()
				})
			});
		}
	}

	loadSnapshot(index) {
		restoreFromObject(this.state.snapshots[index].state);
	}

	deleteSnapshot(index) {
		if (
			window.confirm(
				`Are you sure you want to delete the snapshot "${
					this.state.snapshots[index].name
				}"? This cannot be undone.`
			)
		) {
			this.setState({
				snapshots: this.state.snapshots.filter((s, i) => i !== index)
			});
		}
	}

	save() {
		window.localStorage.setItem(
			`cb-snapshots-${get('config.state.saveKey')}`,
			JSON.stringify(this.state.snapshots)
		);
	}

	restore() {
		const toRestore = window.localStorage.getItem(
			`cb-snapshots-${get('config.state.saveKey')}`
		);

		if (toRestore) {
			this.setState({snapshots: JSON.parse(toRestore)});
		}
	}

	render() {
		const buttons = this.state.snapshots.map((s, index) => (
			<div class="segmented-button block">
				<button
					onClick={() => this.loadSnapshot(index)}
					title="Load snapshot &quot;{s.name}&quot;"
				>
					{s.name}
				</button>
				<button
					onClick={() => this.deleteSnapshot(index)}
					class="fixed"
					title="Delete snapshot &quot;{s.name}&quot;"
				>
					<strong>&times;</strong>
				</button>
			</div>
		));

		return (
			<Panel title="Snapshots">
				{buttons}
				<button class="block" onClick={() => this.addSnapshot()}>
					Add Snapshot
				</button>
			</Panel>
		);
	}

	componentDidUpdate() {
		this.save();
	}
}
