/*
Embeds an image at an arbitrary URL.
*/

import htmlify from '../../util/htmlify';

export default {
	match: /^embed\s+image?/i,
	render(url, props) {
		return htmlify(
			'img',
			Object.assign({}, props, {
				src: url,
			})
		);
	},
};
