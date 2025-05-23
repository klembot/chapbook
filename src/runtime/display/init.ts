import {setDefaults} from '../state';
import {initDisplayCustomElements} from './custom-elements/init';
import {initDisplayEvents} from './events';

const defaults = {
  'config.body.transition.name': 'crossfade',
  'config.body.transition.duration': '300ms',
  'config.header.left': '',
  'config.header.center': '',
  'config.header.right': '',
  'config.footer.left': '_{story.name}_',
  'config.footer.center': '',
  'config.footer.right': '{theme switcher}&emsp;{restart link}'
};

/**
 * Initializes display-related default variables, custom elements, and events.
 */
export function initDisplay() {
	setDefaults(defaults);
	initDisplayCustomElements();
	initDisplayEvents();
}
