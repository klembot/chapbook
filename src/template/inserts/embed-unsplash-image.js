/*
Renders an image from unsplash.com. Width and height arguments are required.
*/

import htmlify from '../../util/htmlify';

export default {
	match: /^embed\s+unsplash(\s+image)?/i,
	render(url, props) {
		return htmlify(
			'img',
			Object.assign({}, props, {
				src: `https://source.unsplash.com/${url.replace(/.*\//, '')}/${
					props.width
				}x${props.height}`,
			})
		);
	},
};
