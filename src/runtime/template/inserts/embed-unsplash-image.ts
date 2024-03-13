import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * Renders an image from unsplash.com. Width and height arguments are required.
 */
export const embedUnsplashImage: Insert<{
	[key: string]: string;
	height: string;
	width: string;
}> = {
	match: /^embed\s+unsplash(\s+image)?/i,
	render(url, props) {
		if (!url) {
			return;
		}

		return htmlify('img', {
			...props,
			src: `https://source.unsplash.com/${url.replace(/.*\//, '')}/${
				props.width
			}x${props.height}`
		});
	}
};
