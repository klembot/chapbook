import {h, Component} from 'preact';
// A panel allowing the user to see values in state and modify them.

import Panel from '../panel';
import {get, set, varNames} from '../../state';
import event from '../../event';

export default class Vars extends Component {
	constructor(props) {
		super(props);
		this.state = {varNames: [], showDefaults: false};
		this.syncBound = () => this.syncWithState();
	}

	syncWithState() {
		this.setState({varNames: varNames(this.state.showDefaults)});
	}

	onChangeDefaults(e) {
		this.setState({showDefaults: e.target.checked});
	}

	onChangeVar(e, varName) {
		set(varName, JSON.parse(e.target.value));
	}

	render() {
		return (
			<Panel title="Variables">
				<p>
					<input
						type="checkbox"
						id="cb-backstage-show-defaults"
						checked={this.state.showDefaults}
						onChange={e => this.onChangeDefaults(e)}
					/>
					<label for="cb-backstage-show-defaults">
						Show Defaults
					</label>
				</p>

				<table>
					{this.state.varNames.map(v => (
						<tr>
							<td>{v}</td>
							<td>
								<input
									type="text"
									value={JSON.stringify(get(v))}
									onChange={e => this.onChangeVar(e, v)}
								/>
							</td>
						</tr>
					))}
				</table>
			</Panel>
		);
	}

	componentWillMount() {
		this.syncWithState();
		event.on('state-change', this.syncBound);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.showDefaults !== this.state.showDefaults) {
			this.syncWithState();
		}
	}

	componentWillUnmount() {
		event.removeListener('state-change', this.syncBound);
	}
}
