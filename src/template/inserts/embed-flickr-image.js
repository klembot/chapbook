/*
Renders an image from flickr.com. Note that this requires an embed code, not a
Flickr URL.
*/

import htmlify from '../../util/htmlify';

export default {
	match: /^embed\s+flickr(\s+image)?/i,
	render(embedCode, props) {
		return htmlify(
			'img',
			Object.assign({}, props, {
				src: /img src="(.+?)"/.exec(embedCode)[1],
			})
		);
	},
};
