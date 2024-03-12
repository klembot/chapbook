import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * Renders an image from flickr.com. This requires an embed code, not a Flickr
 * URL.
 */
export const embedFlickrImage: Insert<{[key: string]: string}> = {
	match: /^embed\s+flickr(\s+image)?/i,
	render(embedCode, props) {
		if (!embedCode) {
			return;
		}

		return htmlify('img', {
			...props,
			src: /img src="(.+?)"/.exec(embedCode)?.[1]
		});
	}
};
