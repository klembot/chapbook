import {cssify, color, autopx} from './util';

const urlRE = /['"]http[^'"]+['"]/i;

export default class {
	constructor() {
		this.props = {
			bg: 'pale blue gray',
			fg: 'dark gray',
			font: 'Georgia, serif',
			fontSize: 18,
			googleFont: ''
		};
	}

	css() {
		let result = cssify('body', {
			'background-color': color(this.props.bg),
			'color': color(this.props.fg),
			'font-size': autopx(this.props.fontSize),
			'font-family': this.props.font
		});

		if (this.props.googleFont !== '') {
			if (!this.googleImport) {
				this.googleImport = document.createElement('div');
				document.body.appendChild(this.googleImport);
			}

			this.googleImport.innerHTML = this.props.googleFont;
		}

		return result;
	}
};