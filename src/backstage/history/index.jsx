import {h, Component} from 'preact';
import Panel from '../panel';
import event from '../../event';
import {history, rewindTo} from './recorder';
import './index.scss';

function parseHistory(history) {
	if (history.length === 0) {
		return [];
	}

	/*
	Group the history items by passage navigation.
	*/

	const result = [];
	let varChanges = [];
	let passage;

	history.forEach(({change}, index) => {
		if (change.name === 'trail') {
			result.push({
				historyIndex: index - 1,
				passage,
				varChanges
			});
			varChanges = [];
			passage = change.value[change.value.length - 1];
		} else {
			/*
			We need to create separate entries instead of just an object, so
			that if a variable changes multiple times under one passage, we see
			that.
			*/

			varChanges.push({name: change.name, value: change.value});
		}
	});

	result.push({historyIndex: history.length - 1, passage, varChanges});
	console.log('Parsed', history, result);
	return result;
}

function historyRows({historyIndex, passage, varChanges}) {
	/*
	This is a function, not a stateless component, because we have to return
	multiple <tr>s without anything enclosing them.
	*/

	const result = [
		<tr>
			<td class="actions" rowspan={varChanges.length + 1}>
				<button onClick={() => rewindTo(historyIndex)}>&#x21aa;</button>
			</td>
			<td
				class="go"
				rowspan={varChanges.length + 1}
				colspan={varChanges.length > 0 ? 1 : 2}
			>
				{passage ? `Go to "${passage}"` : 'Startup'}
			</td>
		</tr>
	];

	varChanges.forEach(v => {
		result.push(
			<tr>
				<td>
					{v.name} &larr; {JSON.stringify(v.value)}
				</td>
			</tr>
		);
	});

	return result;
}

export default class History extends Component {
	constructor(props) {
		super(props);

		this.state = {history: parseHistory(history)};
		this.updateBound = () => this.update();
	}

	update() {
		this.setState({history: parseHistory(history)});
	}

	render() {
		let content;

		if (this.state.history.length > 0) {
			content = (
				<div>
					<table class="history">
						{this.state.history.map(historyRows)}
					</table>
				</div>
			);
		} else {
			content = (
				<p>
					<em>No history has been recorded yet.</em>
				</p>
			);
		}

		return <Panel title="History">{content}</Panel>;
	}

	componentDidMount() {
		event.on('state-change', this.updateBound);
	}

	componentDidUnmount() {
		event.removeEventListener('state-change', this.updateBound);
	}
}
