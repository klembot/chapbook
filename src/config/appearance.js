const colors = require('./colors');

let appearanceStyle, googleFontStyle;
let props = {
	bg: 'pale blue gray',
	borderColor: 'dark gray',
	borderStyle: 'shadow',
	borderWidth: 1,
	fg: 'dark gray',
	font: 'Georgia, serif',
	fontSize: 18,
	googleFont: '',
	linkActiveColor: 'pink',
	linkColor: 'dark gray',
	linkStyle: 'underline',
	linkUnderlineColor: 'pink',
	pageBg: 'white',
	pageFg: 'dark-gray'
};

function setStyle() {
	function color(value) {
		return colors[value] || value;
	}

	function autopx(value) {
		return typeof value === 'number' ? value + 'px' : value;
	}

	if (props.googleFont) {
		if (!googleFontStyle) {
			googleFontStyle = document.createElement('div');
			document.querySelector('body').appendChild(googleFontStyle);
		}

		googleFontStyle.innerHTML = props.googleFont;
	}

	if (!appearanceStyle) {
		appearanceStyle = document.createElement('style');
		document.querySelector('body').appendChild(appearanceStyle);
	}

	let borderStyle = '';

	switch (props.borderStyle) {
		case 'shadow':
			borderStyle = 'box-shadow: 0 4px 8px hsla(0, 0%, 0%, 0.25); border: none;';
			break;

		case 'line':
			borderStyle = `border: ${autopx(props.borderWidth)} solid ${color(props.borderColor)}; box-shadow: none;`;
			break;
	}

	let linkStyle = '';

	switch (props.linkStyle) {
		case 'underline':
			linkStyle = 'text-decoration: underline;';
			break;

		case 'small caps':
			linkStyle = 'text-decoration: none; text-transform: uppercase; font-size: 75%; letter-spacing: 0.02em;';
			break;

		case 'italics':
			linkStyle = 'text-decoration: none; font-style: italic;';
			break;
	}

	appearanceStyle.innerHTML = `
		body {
			font-family: "${props.font}";
			background-color: ${color(props.bg)};
			color: ${color(props.fg)};
		}

		a {
			color: ${color(props.linkColor)};
			text-decoration-color: ${color(props.linkUnderlineColor)};
			${linkStyle}
		}

		a:hover {
			color: ${color(props.linkActiveColor)};
		}

		.page {
			background-color: ${color(props.pageBg)};
			color: ${color(props.pageFg)};
			font-size: ${autopx(props.fontSize)};
			${borderStyle}
		}
	`;
}

let Appearance = {};

function styleSetter(name, value) {
	props[name] = value;
	setStyle();
}

function addProp(name) {
	Object.defineProperty(
		Appearance,
		name,
		{
			get() { return props[name]; },
			set(value) { styleSetter(name, value) }
		}
	);
}

addProp('bg');
addProp('borderColor');
addProp('borderStyle');
addProp('borderWidth');
addProp('fg');
addProp('font');
addProp('fontSize');
addProp('googleFont');
addProp('linkActiveColor');
addProp('linkColor');
addProp('linkStyle');
addProp('linkUnderlineColor');
addProp('pageBg');
addProp('pageFg');

module.exports = Appearance;