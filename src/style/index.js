/* Sets all user-visible styles. */

import createLoggers from '../logger';
import event from '../event';
import {get, sameObject} from '../state';
import {init as initExternalFonts} from './external-fonts';
import {parseColor, parseFont} from './parse';

const {log} = createLoggers('style');

export const defaults = {
	'config.style.backdrop': 'gray-0',
	'config.style.page.style': 'shadow',
	'config.style.page.style.borderColor': 'gray-2',
	'config.style.page.font': 'Iowan Old Style/Constantia/Georgia/serif 18',
	'config.style.page.color': 'gray-9 on white',
	'config.style.page.fork.divider.color': 'gray-3',
	'config.style.page.fork.divider.style': 'dashed',
	'config.style.page.fork.divider.size': 1,
	'config.style.page.link.color': 'gray-9',
	'config.style.page.link.lineColor': 'red-8',
	'config.style.page.link.font': 'underline',
	'config.style.page.link.active.color': 'red-8 on red-0',
	'config.style.page.verticalAlign': 'center',
	'config.style.page.header.font': '16',
	'config.style.page.header.link.font': 'small caps',
	'config.style.page.footer.font': '16',
	'config.style.page.footer.link.font': 'small caps',
};

const rules = {};
const styleEl = document.createElement('style');

export function style(selector, selectorRules) {
	rules[selector] = rules[selector] || {};
	Object.assign(rules[selector], selectorRules);
	update();
}

function update() {
	/*
	TODO: throttle this somehow so that multiple calls in one loop don't waste
	time
	*/

	/*
	The sort() is necessary because of how some browser parse `text-decoration`
	and `text-decoration-color`. Google Chrome, for example, will treat
	`text-decoration` as overriding `text-decoration-color`; however, Internet
	Explorer doesn't understand `text-decoration-color` and needs
	`text-decoration` to be set for any styling at all to appear. Sorting
	guarantees that `text-decoration-color` appears after `text-decoration` in
	the declarations, preventing the two from stepping on each other.
	*/

	function cssify(selector, props) {
		return (
			selector +
			'{' +
			Object.keys(props)
				.sort()
				.reduce((result, current) => {
					if (props[current]) {
						return result + current + ':' + props[current].toString() + ';';
					}

					return result;
				}, '') +
			'}'
		);
	}

	styleEl.innerHTML = Object.keys(rules).reduce(
		(result, rule) => result + cssify(rule, rules[rule]),
		''
	);
}

function styleColorOrFont(varName, value) {
	let selector = '#page';

	const props = varName.replace(/^config\.style\.page\./i, '').split('.');

	/*
	Drill down to a font, color, or lineColor property. To prevent
	weird scenarios, we only allow drilling down in specificity.
	*/

	if (props[0].toLowerCase() === 'header') {
		selector += ' header';
		props.shift();
	} else if (props[0].toLowerCase() === 'footer') {
		selector += ' footer';
		props.shift();
	}

	if (props[0].toLowerCase() === 'link') {
		selector += ' a';
		props.shift();
	}

	if (props[0].toLowerCase() === 'active') {
		selector = `${selector}:hover, ${selector}:active`;
		props.shift();
	}

	/*
	We should either be at either a color, font, or lineColor property.
	If we aren't, we do nothing-- this property must either have some
	other purpose or it's a mistake by the author.
	*/

	switch (props[0].toLowerCase()) {
		case 'color':
			log(`Setting color for ${selector}`);
			style(selector, parseColor(value));
			break;

		case 'linecolor': {
			log(`Setting line color for ${selector}`);
			const colorValue = parseColor(value).color;

			style(selector, {
				'text-decoration-color': colorValue,
				'-webkit-text-decoration-color': colorValue,
			});
			break;
		}

		case 'font':
			log(`Setting font for ${selector}`);
			style(selector, parseFont(value));
			break;
	}
}

export function init() {
	initExternalFonts();
	styleEl.dataset.cbAuthorStyles = '';
	document.head.appendChild(styleEl);

	event.on('state-change', ({name, value}) => {
		/* Special-case properties. */

		if (sameObject(name, 'config.style.backdrop')) {
			log('Setting backdrop color');
			style('#backdrop', {
				'background-color': parseColor(get('config.style.backdrop')).color,
			});
		}

		if (sameObject(name, 'config.style.page.fork.divider.color')) {
			log('Setting fork divider color');
			style('#page .fork p a + a', {
				'border-top-color': parseColor(
					get('config.style.page.fork.divider.color')
				).color,
			});
		}

		if (sameObject(name, 'config.style.page.fork.divider.size')) {
			log('Setting fork divider size');
			style('#page .fork p a + a', {
				'border-top-width': `${get('config.style.page.fork.divider.size')}px`,
			});
		}

		if (sameObject(name, 'config.style.page.fork.divider.style')) {
			log('Setting fork divider style');
			style('#page .fork p a + a', {
				'border-top-style': get('config.style.page.fork.divider.style'),
			});
		}

		if (
			sameObject(name, 'config.style.page.style') ||
			sameObject(name, 'config.style.page.style.borderColor')
		) {
			log('Setting page style');

			switch (get('config.style.page.style')) {
				case 'none':
					style('#page', {border: 'none', 'box-shadow': 'none'});
					break;

				case 'shadow':
					style('#page', {
						border: 'none',
						'box-shadow': '0 4px 8px hsla(0, 0%, 0%, 0.25)',
					});
					break;

				case 'thick-line':
					style('#page', {
						border: `4px solid ${
							parseColor(get('config.style.page.style.borderColor')).color
						}`,
						'box-shadow': 'none',
					});
					break;

				case 'thin-line':
					style('#page', {
						border: `1px solid ${
							parseColor(get('config.style.page.style.borderColor')).color
						}`,
						'box-shadow': 'none',
					});
					break;
			}
		}

		if (sameObject(name, 'config.style.page.verticalAlign')) {
			log('Setting page vertical alignment');

			switch (get('config.style.page.verticalAlign')) {
				case 'top':
					style('#page article', {'align-items': 'flex-start'});
					break;

				case 'center':
					style('#page article', {'align-items': 'center'});
					break;

				case 'bottom':
					style('#page article', {'align-items': 'flex-end'});
					break;
			}
		}

		/* Font, color, or line color properties. */

		const fontColorPattern = /^config\.style\.page\..*\.((line)?color|font)$/i;

		if (fontColorPattern.test(name)) {
			styleColorOrFont(name, value);
		}

		if (sameObject(name, 'config.style.page')) {
			/*
			The entire object has been set-- we need to scan it for fonts,
			colors, and line colors.
			*/

			const scan = (name, obj) => {
				['color', 'font', 'lineColor'].forEach(s => {
					if (obj[s]) {
						styleColorOrFont(`${name}.${s}`, obj[s]);
					}

					if (obj.link) {
						if (obj.link[s]) {
							styleColorOrFont(`${name}.link.${s}`, obj.link[s]);
						}

						if (obj.link.active && obj.link.active[s]) {
							styleColorOrFont(`${name}.link.active.${s}`, obj.link.active[s]);
						}
					}
				});
			};

			[
				'config.style.page',
				'config.style.page.header',
				'config.style.page.footer',
			].forEach(varName => {
				const obj = get(varName);

				if (obj) {
					scan(varName, obj);
				}
			});
		}
	});
}
