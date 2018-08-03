// Author functions for embedding images.

import htmlify from '../util/htmlify';

export default {
	flickr(embedCode, attrs) {
		return htmlify(
			'img',
			Object.assign({}, attrs, {
				src: /img src="(.+?)"/.exec(embedCode)[1]
			})
		);
	},

	unsplash(url, attrs) {
		if (!attrs.width || !attrs.height) {
			throw new Error(
				'You must set a width and height when embedding an Unsplash image.'
			);
		}

		return htmlify(
			'img',
			Object.assign({}, attrs, {
				src: `https://source.unsplash.com/${url.replace(/.*\//, '')}/${
					attrs.width
				}x${attrs.height}`
			})
		);
	}
};
