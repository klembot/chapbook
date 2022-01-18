import {h, Component} from 'preact';
import './index.css';

export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:
				this.props.initiallyOpen !== undefined ? this.props.initiallyOpen : true
		};
	}

	toggle() {
		this.setState({open: !this.state.open});
	}

	render() {
		return (
			<div class={'panel' + (this.state.open ? ' open' : '')}>
				<h2>
					<button className="small-caps" onClick={() => this.toggle()}>
						{this.props.title}
					</button>
				</h2>
				{this.state.open && <div class="content">{this.props.children}</div>}
			</div>
		);
	}
}
