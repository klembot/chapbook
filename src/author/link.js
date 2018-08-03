// Author functions for creating links.

import {get} from '../state';
import htmlify from '../util/htmlify';

export default {
	to(target, label) {
		// If the target is a negative number, then go back that many steps in
		// the trail.

		if (target < 0) {
			const trail = get('trail');
			const passage = trail[Math.max(trail.length + target, 0)];

			return htmlify(
				'a',
				{href: 'javascript:void(0)', 'data-cb-go': passage},
				[label || passage]
			);
		}

		// Does the target look like an external link?

		if (/^\w+:\/\/\/?\w/i.test(target)) {
			return createLink(label || target, {href: target});

			return htmlify('a', {href: target}[label || passage]);
		}

		// We'll treat it as an internal one if not.

		return htmlify(
			'a',
			{href: 'javascript:void(0)', 'data-cb-go': target},
			[label || passage]
		);
	},

	thatRestarts(label = 'Restart') {
		return htmlify(
			'a',
			{href: 'javascript:void(0)', 'data-cb-restart': ''},
			[label]
		);
	}
};
