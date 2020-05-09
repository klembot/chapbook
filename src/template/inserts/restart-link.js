/*
Renders a link that restarts the story.
*/

import htmlify from '../../util/htmlify';

export default {
	match: /^restart\s+link/i,
	render(_, props) {
		return htmlify(
			'a',
			{
				href: 'javascript:void(0)',
				'data-cb-restart': true,
			},
			[props.label || 'Restart']
		);
	},
};
