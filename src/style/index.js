/*
A singleton that updates the appearance of elements onscreen.
*/

import googleFont from './google-font';
import Stylesheet from './stylesheet';

let vars, style;

function updateStyle(key, value, prevValue) {
	if (vars.get('config.style.googleFont')) {
		googleFont(vars.get('config.style.googleFont'));
	}

	if (!style) {
		style = new Stylesheet();
	}
	
	const {color, autopx} = style;

	style.rules = {
		'body': {
			'background-color': color(vars.get('config.style.backdrop'))
		},
		'.page': {
			'background-color': color(vars.get('config.style.bg')),
			'color': color(vars.get('config.style.fg')),
			'font-family': color(vars.get('config.style.font')),
			'font-size': autopx(vars.get('config.style.fontSize'))
		},
		'.page a': {
			'color': color(vars.get('config.style.linkColor')),
			'text-decoration-color': color(vars.get('config.style.linkLineColor'))
		},
		'.page a:hover': {
			'color': color(vars.get('config.style.linkActiveColor'))
		}
	};

	switch (vars.get('config.style.pageStyle')) {
		case 'none':
			break;

		case 'shadow':
			style.rules['.page']['box-shadow'] = '0 4px 8px hsla(0, 0%, 0%, 0.25)';
			break;

		case 'thin line':
			style.rules['.page'].border = `1px solid ${color(vars.get('config.style.pageBorderColor'))}`;
			break;

		case 'thick line':
			style.rules['.page'].border = `4px solid ${color(vars.get('config.style.pageBorderColor'))}`;
			break;

		default:
			throw new Error(`No page style named "${vars.get('config.style.pageStyle')}" exists.`);
	}

	switch (vars.get('config.style.linkStyle')) {
		case 'bold':
			Object.assign(
				style.rules['.page a'],
				{
					'text-decoration': 'none',
					'font-weight': 'bold'
				}
			);
			break;

		case 'italic':
			Object.assign(
				style.rules['.page a'],
				{
					'text-decoration': 'none',
					'font-style': 'italic'
				}
			);
			break;

		case 'none':
			style.rules['.page a']['text-decoration'] = 'none';
			break;

		case 'small caps':
			Object.assign(
				style.rules['.page a'],
				{
					'text-decoration': 'none',
					'text-transform': 'uppercase',
					'font-size': '70%',
					'letter-spacing': '0.075em'	
				}
			);
			break;

		case 'underline':
			/*
			We rely on links receiving an underline by default.
			*/

			Object.assign(
				style.rules['.page a'],
				{
					'text-decoration-color': color(vars.get('config.style.linkLineColor'))
				}
			);
			break;

		default:
			throw new Error(`No link style named "${vars.get('config.style.linkStyle')}" exists.`);
	}

	style.update();
}

function init(varsInstance) {
	vars = varsInstance;
	vars.default('config.style.bg', 'white');
	vars.default('config.style.fg', 'dark gray');
	vars.default('config.style.font', '"Hoefler Text", "Calisto MT", Georgia, serif');
	vars.default('config.style.fontSize', 18);
	vars.default('config.style.backdrop', 'pale blue gray');
	vars.default('config.style.pageBorderColor', '');
	vars.default('config.style.pageStyle', 'shadow');
	vars.default('config.style.linkColor', 'dark gray');
	vars.default('config.style.linkActiveColor', 'cyan');
	vars.default('config.style.linkLineColor', 'cyan');
	vars.default('config.style.linkStyle', 'underline');
	vars.addListener('config.style', updateStyle);
	updateStyle();
}

export {init};