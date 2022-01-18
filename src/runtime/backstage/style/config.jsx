import {Component, h} from 'preact';
import {get} from '../../state';
import Panel from '../panel';
import event from '../../event';

/*
State keys we care about.
*/

const keys = ['page', 'page.header', 'page.footer'].reduce(
	(out, key) =>
		out.concat([
			`config.style.${key}.font`,
			`config.style.${key}.color`,
			`config.style.${key}.link.font`,
			`config.style.${key}.link.color`,
			`config.style.${key}.link.lineColor`,
			`config.style.${key}.link.active.font`,
			`config.style.${key}.link.active.color`,
			`config.style.${key}.link.active.lineColor`
		]),
	[]
);

export default class Config extends Component {
	constructor(props) {
		super(props);
		this.state = keys.reduce((out, key) => {
			out[key] = get(key);
			return out;
		}, {});
		this.onStateChangeBound = ({name, value}) =>
			this.onStateChange(name, value);
	}

	onStateChange(name, value) {
		if (this.state[name]) {
			this.setState({[name]: value});
		}
	}

	render() {
		const output = Object.keys(this.state)
			.reduce((out, key) => {
				const value = get(key);

				if (value) {
					return out + `${key}: ${JSON.stringify(value)}\n`;
				}

				return out;
			}, '')
			.trim();

		return (
			<Panel title="Config">
				<p>
					<label for="cb-backstage-style-config">
						Enter this code into your first passage&rsquo;s vars section to
						permanently use this style:
					</label>
				</p>
				<p>
					<textarea
						readonly
						id="cb-backstage-style-config"
						onClick={e => e.target.select()}
					>
						{output}
					</textarea>
				</p>
			</Panel>
		);
	}

	componentWillMount() {
		event.on('state-change', this.onStateChangeBound);
	}

	componentWillUnmount() {
		event.removeListener('state-change', this.onStateChangeBound);
	}
}
