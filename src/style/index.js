/*
A singleton that updates the appearance of elements onscreen.
*/

import {Color} from '../author/color';
import googleFont from './google-font';
import linkStyles from './link-styles';
import Stylesheet from './stylesheet';

let vars, style;

function updateStyle() {
	if (vars.get('config.style.googleFont')) {
		googleFont(vars.get('config.style.googleFont'));
	}

	if (!style) {
		style = new Stylesheet();
	}

	function hex(key) {
		return new Color(vars.get(key)).hex;
	}

	const {color, autopx} = style;

	style.rules = {
		body: {
			'background-color': hex('config.style.backdrop')
		},
		'.page': {
			'background-color': hex('config.style.bg'),
			color: hex('config.style.fg'),
			'font-family': vars.get('config.style.font'),
			'font-size': autopx(vars.get('config.style.fontSize'))
		},
		'.page a': {
			color: hex('config.style.linkColor'),
			'text-decoration-color': hex('config.style.linkLineColor')
		},
		'.page a:hover': {
			color: hex('config.style.linkActiveColor')
		},
		'.page input[type="text"], .page select': {
			'background-color': hex('config.style.inputBg'),
			border: `1px solid ${hex('config.style.inputBorderColor')}`,
			color: hex('config.style.inputFg'),
			'font-family': vars.get('config.style.inputFont'),
			'font-size': autopx(vars.get('config.style.inputFontSize'))
		}
	};

	switch (vars.get('config.style.pageStyle')) {
		case 'none':
			break;

		case 'shadow':
			style.rules['.page']['box-shadow'] = '0 4px 8px hsla(0, 0%, 0%, 0.25)';
			break;

		case 'thin line':
			style.rules['.page'].border = `1px solid ${hex(
				'config.style.pageBorderColor'
			)}`;
			break;

		case 'thick line':
			style.rules['.page'].border = `4px solid ${hex(
				'config.style.pageBorderColor'
			)}`;
			break;

		default:
			throw new Error(
				`There is no page style named "${vars.get(
					'config.style.pageStyle'
				)}" exists.`
			);
	}

	linkStyles(
		style.rules['.page a'],
		vars.get('config.style.linkStyle'),
		hex('config.style.linkLineColor')
	);

	['header', 'footer'].forEach(type => {
		style.rules[type] = {
			'font-family': vars.get(`config.style.${type}Font`),
			'font-size': style.autopx(vars.get(`config.style.${type}FontSize`))
		};

		style.rules[`${type} a`] = {
			color: hex(`config.style.${type}LinkColor`)
		};

		style.rules[`${type} a:hover`] = {
			color: hex(`config.style.${type}LinkActiveColor`)
		};

		linkStyles(
			style.rules[`${type} a`],
			vars.get(`config.style.${type}LinkStyle`),
			hex(`config.style.${type}LinkLineColor`)
		);
	});

	style.update();
}

function init(varsInstance) {
	vars = varsInstance;
	vars.default('config.style.bg', 'white');
	vars.default('config.style.fg', 'gray-9');
	vars.default(
		'config.style.font',
		'Palatino, "Palatino Linotype", Georgia, serif'
	);
	vars.default('config.style.fontSize', 18);
	vars.default('config.style.backdrop', 'gray-0');
	vars.default('config.style.pageBorderColor', '');
	vars.default(
		'config.style.inputFont',
		'Palatino, "Palatino Linotype", Georgia, serif'
	);
	vars.default('config.style.inputFontSize', 18);
	vars.default('config.style.inputBg', 'transparent');
	vars.default('config.style.inputFg', 'gray-9');
	vars.default('config.style.inputBorderColor', 'gray-5');
	vars.default('config.style.pageStyle', 'shadow');
	vars.default('config.style.linkColor', 'gray-9');
	vars.default('config.style.linkActiveColor', 'pink-5');
	vars.default('config.style.linkLineColor', 'pink-5');
	vars.default('config.style.linkStyle', 'underline');

	['header', 'footer'].forEach(type => {
		vars.default(`config.style.${type}Font`, '');
		vars.default(`config.style.${type}FontSize`, 16);
		vars.default(`config.style.${type}LinkColor`, 'gray-9');
		vars.default(`config.style.${type}LinkActiveColor`, 'pink-5');
		vars.default(`config.style.${type}LinkLineColor`, 'pink-5');
		vars.default(`config.style.${type}LinkStyle`, 'small caps');
	});

	vars.addListener('config.style', updateStyle);
	updateStyle();
}

export {init};
