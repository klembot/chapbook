import {h, Component} from 'preact';
import './index.scss';

export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {open: true};
	}

	toggle() {
		this.setState({open: !this.state.open});
	}

	render() {
		return (
			<div class={'panel' + (this.state.open ? ' open' : '')}>
				<h2>
					<button onClick={() => this.toggle()}>
						{this.props.title}
					</button>
				</h2>
				{this.state.open && (
					<div class="content">{this.props.children}</div>
				)}
			</div>
		);
	}
}
