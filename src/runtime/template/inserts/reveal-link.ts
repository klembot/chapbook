import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * A reveal link shows either text or a passage's contents when activated.
 */
export const revealLink: Insert<{passage?: string; text?: string}> = {
	match: /^reveal\s+link/i,
	render(label, props) {
		if (!label) {
			return;
		}

		if (props.text) {
			return htmlify('reveal-link', {class: 'link', text: props.text}, [label]);
		}

		if (props.passage) {
			return htmlify('reveal-link', {class: 'link', passage: props.passage}, [
				label
			]);
		}

		return;
	}
};
