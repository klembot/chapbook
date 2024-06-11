import {setDefaults} from '../state';

const defaults = {
  'config.style.dark.backdrop': 'hsl(0, 0%, 10%)',
  'config.style.dark.page.fork.divider.color': 'gray-5',
  'config.style.dark.page.color': 'white on gray-6',
  'config.style.dark.page.footer.link.active.color':
    'raspberry-3 on raspberry-6',
  'config.style.dark.page.header.link.active.color':
    'raspberry-3 on raspberry-6',
  'config.style.dark.page.link.color': 'white',
  'config.style.dark.page.link.lineColor': 'raspberry-4',
  'config.style.dark.page.link.active.color': 'raspberry-3 on raspberry-6',
  'config.style.backdrop': 'gray-1',
  'config.style.fontScaling.enabled': true,
  'config.style.fontScaling.baseViewportWidth': 1000,
  'config.style.fontScaling.addAtDoubleWidth': 6,
  'config.style.page.style.border': 'shadow',
  'config.style.page.style.borderColor': 'gray-2',
  'config.style.page.font': 'Iowan Old Style/Constantia/Georgia/serif 18',
  'config.style.page.color': 'gray-6 on white',
  'config.style.page.fork.divider.color': 'gray-2',
  'config.style.page.fork.divider.style': 'dashed',
  'config.style.page.fork.divider.size': 1,
  'config.style.page.link.color': 'gray-6',
  'config.style.page.link.lineColor': 'raspberry-4',
  'config.style.page.link.font': 'underline',
  'config.style.page.link.active.color': 'raspberry-4 on raspberry-1',
  'config.style.page.verticalAlign': 'center',
  'config.style.page.header.font': '16',
  'config.style.page.header.link.font': 'small caps underlined',
  'config.style.page.header.link.lineColor': 'raspberry-4',
  'config.style.page.header.link.active.color': 'raspberry-4 on raspberry-1',
  'config.style.page.header.link.active.font': 'small caps underlined',
  'config.style.page.header.link.active.lineColor': 'raspberry-4',
  'config.style.page.footer.font': '16',
  'config.style.page.footer.link.font': 'small caps underlined',
  'config.style.page.footer.link.lineColor': 'raspberry-4',
  'config.style.page.footer.link.active.color': 'raspberry-4 on raspberry-1',
  'config.style.page.footer.link.active.font': 'small caps underlined',
  'config.style.page.footer.link.active.lineColor': 'raspberry-4',
  'config.style.page.theme.override': undefined,
  'config.style.page.theme.enableSwitching': true
};

/**
 * Sets all defaults related to style.
 */
export function initStyle() {
	setDefaults(defaults);
}
