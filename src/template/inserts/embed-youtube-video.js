/*
Embeds a YouTube video. This assumes the video is 16:9, but this can be specified.
*/

import htmlify, {domify} from '../../util/htmlify';

export default {
	match: /^embed\s+youtube(\s+video)?/i,
	render(url, props) {
		let embedUrl = `https://www.youtube-nocookie.com/embed/${url.replace(
			/.*\?v=/,
			''
		)}?modestbranding=1&rel=0&controls=${props.controls ? 1 : 0}&`;

		if (props.autoplay) {
			embedUrl += 'autoplay=1&';
		}

		if (props.loop) {
			embedUrl += 'loop=1&';
		}

		/*
		Fluid iframe container
		See https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php 
		*/

		return htmlify(
			'div',
			{
				style:
					'position: relative; height: 0; padding-bottom: 56.25%; margin-bottom: 1em'
			},
			[
				domify('iframe', {
					src: embedUrl,
					frameBorder: 0,
					style:
						'position: absolute; top: 0; left: 0; width: 100%; height: 100%'
				})
			]
		);
	}
};
