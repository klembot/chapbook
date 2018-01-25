const {cssify, color, autopx} = require('./util');

module.exports = class {
	constructor() {
		this.props = {
			linkActiveColor: 'pink',
			linkColor: 'dark gray',
			linkStyle: 'underline',
			linkLineColor: 'pink',		
		};
	}

	css() {
		let baseLinkStyle = {
			color: color(this.props.linkColor),
			'text-decoration-color': color(this.props.linkLineColor)
		};

		switch (this.props.linkStyle) {
			case 'none':
				break;

			case 'underline':
				baseLinkStyle['text-decoration'] = 'underline';
				break;
			
			case 'small caps':
				baseLinkStyle['text-transform'] = 'uppercase';
				baseLinkStyle['font-size'] = '75%';
				baseLinkStyle['letter-spacing'] = '0.02em';
				break;

			default:
				throw new Error(`There is no link style named "${this.props.linkStyle}".`);
		}

		return cssify('a', baseLinkStyle) +
			cssify('a.hover', {color: color(this.props.linkActiveColors)});
	}
};