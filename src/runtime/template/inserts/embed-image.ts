import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * Embeds an image from an arbitrary URL.
 */
export const embedImage: Insert<{[key: string]: string}> = {
	match: /^embed\s+image/i,
	render(src, props) {
		return htmlify('img', {...props, src: src ?? ''});
	}
};
