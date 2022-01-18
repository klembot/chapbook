import {h, Component} from 'preact';
import './index.css';

export default class Tabs extends Component {
	constructor(props) {
		super(props);
		this.state = {selected: 0};
	}

	select(index) {
		this.setState({selected: index});
	}

	render() {
		const tabs = this.props.children.map((c, index) => (
			<li>
				<button
					onClick={() => this.select(index)}
					class={index === this.state.selected && 'active'}
				>
					{c.attributes.label}
				</button>
			</li>
		));

		return (
			<div>
				<ul class="tabs">{tabs}</ul>
				<div class="tab-content">
					{this.props.children[this.state.selected]}
				</div>
			</div>
		);
	}
}
