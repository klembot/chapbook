const borders = require('./borders');
const {cssify, color} = require('./util');

module.exports = class {
	constructor() {
		this.props = {
			pageBg: 'pale blue gray',
			pageFg: 'dark gray',
			pageBorder: 'shadow',
			pageBorderColor: 'dark gray',
		};
	}

	css() {
		return cssify(
			'.page',
			Object.assign(
				{
					'background-color': color(this.props.pageBg),
					'color': color(this.props.pageFg)
				},
				borders(this.props.pageBorder, this.pageBorderColor)
			)
		);
	}
};