import {h, Component} from 'preact';
import Panel from '../panel';
import event from '../../event';
import {history, rewindTo} from './recorder';

function HistoryItem({change, state, index}) {
	let type, detail;

	if (change.name === 'trail') {
		type = 'Go to passage';
		detail = change.value[change.value.length - 1];
	} else {
		type = 'Set variable';
		detail = `${change.name} &larr; ${JSON.stringify(change.value)}`;
	}

	return (
		<tr>
			<td>{type}</td>
			<td>{detail}</td>
			<td style="width: 2em">
				<button
					onClick={() => rewindTo(index)}
					title="Rewind state to here"
				>
					&#x21a9;
				</button>
			</td>
		</tr>
	);
}

export default class History extends Component {
	constructor(props) {
		super(props);

		this.state = {history: history};
		this.updateBound = () => this.update();
	}

	update() {
		this.setState({history});
	}

	render() {
		let content;

		if (this.state.history.length > 0) {
			content = (
				<table>
					{this.state.history.map((hist, index) => (
						<HistoryItem change={hist.change} index={index} />
					))}
				</table>
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
