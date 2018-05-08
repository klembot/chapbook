/*
A singleton that updates the appearance of elements onscreen.
*/

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

	const {color, autopx} = style;

	style.rules = {
		body: {
			'background-color': color(vars.get('config.style.backdrop'))
		},
		'.page': {
			'background-color': color(vars.get('config.style.bg')),
			color: color(vars.get('config.style.fg')),
			'font-family': color(vars.get('config.style.font')),
			'font-size': autopx(vars.get('config.style.fontSize'))
		},
		'.page a': {
			color: color(vars.get('config.style.linkColor')),
			'text-decoration-color': color(vars.get('config.style.linkLineColor'))
		},
		'.page a:hover': {
			color: color(vars.get('config.style.linkActiveColor'))
		},
		'.page input[type="text"], .page select': {
			'background-color': color(vars.get('config.style.inputBg')),
			border: `1px solid ${color(vars.get('config.style.inputBorderColor'))}`,
			color: color(vars.get('config.style.inputFg')),
			'font-family': color(vars.get('config.style.inputFont')),
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
			style.rules['.page'].border = `1px solid ${color(
				vars.get('config.style.pageBorderColor')
			)}`;
			break;

		case 'thick line':
			style.rules['.page'].border = `4px solid ${color(
				vars.get('config.style.pageBorderColor')
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
		style.color(vars.get('config.style.linkLineColor'))
	);

	['header', 'footer'].forEach(type => {
		style.rules[type] = {
			'font-family': vars.get(`config.style.${type}Font`),
			'font-size': style.autopx(vars.get(`config.style.${type}FontSize`))
		};

		style.rules[`${type} a`] = {
			color: vars.get(`config.style.${type}LinkColor`)
		};

		style.rules[`${type} a:hover`] = {
			color: vars.get(`config.style.${type}LinkActiveColor`)
		};

		linkStyles(
			style.rules[`${type} a`],
			vars.get(`config.style.${type}LinkStyle`),
			vars.get(`config.style.${type}LinkLineColor`)
		);
	});

	style.update();
}

function init(varsInstance) {
	vars = varsInstance;
	vars.default('config.style.bg', 'white');
	vars.default('config.style.fg', 'dark gray');
	vars.default(
		'config.style.font',
		'Palatino, "Palatino Linotype", Georgia, serif'
	);
	vars.default('config.style.fontSize', 18);
	vars.default('config.style.backdrop', 'pale blue gray');
	vars.default('config.style.pageBorderColor', '');
	vars.default(
		'config.style.inputFont',
		'Palatino, "Palatino Linotype", Georgia, serif'
	);
	vars.default('config.style.inputFontSize', 18);
	vars.default('config.style.inputBg', 'transparent');
	vars.default('config.style.inputFg', 'dark gray');
	vars.default('config.style.inputBorderColor', 'gray');
	vars.default('config.style.pageStyle', 'shadow');
	vars.default('config.style.linkColor', 'dark gray');
	vars.default('config.style.linkActiveColor', 'cyan');
	vars.default('config.style.linkLineColor', 'cyan');
	vars.default('config.style.linkStyle', 'underline');

	['header', 'footer'].forEach(type => {
		vars.default(`config.style.${type}Font`, '');
		vars.default(`config.style.${type}FontSize`, 16);
		vars.default(`config.style.${type}LinkColor`, 'dark gray');
		vars.default(`config.style.${type}LinkActiveColor`, 'cyan');
		vars.default(`config.style.${type}LinkLineColor`, 'cyan');
		vars.default(`config.style.${type}LinkStyle`, 'small caps');
	});

	vars.addListener('config.style', updateStyle);
	updateStyle();
}

export {init};
