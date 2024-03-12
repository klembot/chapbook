import {setDefaults} from '../state';

const defaults = {
	'config.style.backdrop': 'gray-0',
	'config.style.page.style.border': 'shadow',
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
	'config.style.page.header.link.font': 'small caps underlined',
	'config.style.page.header.link.lineColor': 'red-8',
	'config.style.page.header.link.active.color': 'red-8 on red-0',
	'config.style.page.header.link.active.font': 'small caps underlined',
	'config.style.page.header.link.active.lineColor': 'red-8',
	'config.style.page.footer.font': '16',
	'config.style.page.footer.link.font': 'small caps underlined',
	'config.style.page.footer.link.lineColor': 'red-8',
	'config.style.page.footer.link.active.color': 'red-8 on red-0',
	'config.style.page.footer.link.active.font': 'small caps underlined',
	'config.style.page.footer.link.active.lineColor': 'red-8'
};

/**
 * Sets all defaults related to style.
 */
export function initStyle() {
	setDefaults(defaults);
}
