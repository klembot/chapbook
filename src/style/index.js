// Sets all user-visible styles.

import createLoggers from '../logger';
import event from '../event';
import {get} from '../state';
import {parseColor, parseFont} from './parse';

const {log} = createLoggers('style');

export const defaults = {
	'config.style.backdrop': 'gray-0',
	'config.style.pageStyle': 'shadow',
	'config.style.page.font': 'Palatino/Palatino Linotype/Georgia/serif 18',
	'config.style.page.color': 'gray-9 on white',
	'config.style.page.link.color': 'gray-9',
	'config.style.page.link.lineColor': 'red-5',
	'config.style.page.link.font': 'underline',
	'config.style.page.link.active.color': 'red-5 on red-0',
	'config.style.page.header.font': '16',
	'config.style.page.header.link.font': 'small caps',
	'config.style.page.footer.font': '16',
	'config.style.page.footer.link.font': 'small caps'
};

const rules = {};
const el = document.createElement('style');

export function style(selector, selectorRules) {
	rules[selector] = rules[selector] || {};
	Object.assign(rules[selector], selectorRules);
	update();
}

function update() {
	// TODO: throttle this somehow so that multiple calls in one loop don't waste time

	function cssify(selector, props) {
		return (
			selector +
			'{' +
			Object.keys(props).reduce(
				(result, current) =>
					result + current + ':' + props[current].toString() + ';',
				''
			) +
			'}'
		);
	}

	el.innerHTML = Object.keys(rules).reduce(
		(result, rule) => result + cssify(rule, rules[rule]),
		''
	);
}

export function init() {
	document.head.appendChild(el);
	event.on('state-change', ({name, value}) => {
		// Special-case properties.

		switch (name) {
			case 'config.style.backdrop':
				log('Setting backdrop color');
				style('#backdrop', {
					'background-color': parseColor(value).color
				});
				return;

			case 'config.style.pageStyle':
			case 'config.style.pageStyle.color':
				log('Setting page style');
				switch (get('config.style.pageStyle')) {
					case 'none':
						style('#page', {border: 'none', 'box-shadow': 'none'});
						break;

					case 'shadow':
						style('#page', {
							border: 'none',
							'box-shadow': '0 4px 8px hsla(0, 0%, 0%, 0.25)'
						});
						break;

					case 'thick-line':
						style('#page', {
							border: `4px solid ${
								parseColor(get('config.style.pageBorderColor'))
									.color
							}`,
							'box-shadow': 'none'
						});
						break;

					case 'thin-line':
						style('#page', {
							border: `1px solid ${
								parseColor(get('config.style.pageBorderColor'))
									.color
							}`,
							'box-shadow': 'none'
						});
						break;
				}

				return;
		}

		// Font and color properties.

		if (/^config\.style\.page\./i.test(name)) {
			let selector = '#page';

			const props = name
				.replace(/^config\.style\.page\./i, '')
				.split('.');

			// Drill down to a font, color, or lineColor property. To prevent
			// weird scenarios, we only allow drilling down in specificity.

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

			// We should either be at either a color, font, or lineColor
			// property. If we aren't, we do nothing-- this property must either
			// have some other purpose or it's a mistake by the author.

			switch (props[0].toLowerCase()) {
				case 'color':
					log(`Setting color for ${selector}`);
					style(selector, parseColor(value));
					break;

				case 'lineColor':
					log(`Setting line color for ${selector}`);
					style(selector, {
						'text-decoration-color': parseColor(value).color
					});

				case 'font':
					log(`Setting font for ${selector}`);
					style(selector, parseFont(value));
					break;
			}

			if (props[0].toLowerCase() === 'font') {
			} else if (props[0].toLowerCase() === 'color') {
			}
		}
	});
}
