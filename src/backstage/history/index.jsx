import {h, Component} from 'preact';
import Panel from '../panel';
import event from '../../event';
import {history, rewindTo} from './recorder';
import './index.scss';

function parseHistory(history) {
	/*
	Group the history items by passage navigation.
	*/

	const result = [];
	let current = {vars: []};

	history.forEach(({change}) => {
		if (change.name === 'trail') {
			if (current.passage) {
				result.push(current);
			}

			current = {
				passage: change.value[change.value.length - 1],
				vars: []
			};
		} else {
			/*
			We need to create separate entries instead of just an object, so
			that if a variable changes multiple times under one passage, we see
			that.
			*/

			current.vars.push({name: change.name, value: change.value});
		}
	});

	if (current.vars.length > 0 || current.passage) {
		result.push(current);
	}

	return result;
}

function historyRows({passage, vars}, index) {
	/*
	This is a function, not a stateless component, because we have to return
	multiple <tr>s without anything enclosing them.
	*/

	const result = [
		<tr>
			<td class="actions" rowspan={vars.length + 1}>
				<button onClick={() => rewindTo(index)}>&#x21aa;</button>
			</td>
			<td
				class="go"
				rowspan={vars.length + 1}
				colspan={vars.length > 0 ? 1 : 2}
			>
				Go to &ldquo;
				{passage}
				&rdquo;
			</td>
		</tr>
	];

	vars.forEach(v => {
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
