/* Aligns text either left, center, or right. */

import wrap from '../../util/wrap-markdown';

export default {
	match: /^align\s+(left|right|center)/i,
	process(output, {invocation}) {
		const align = invocation.replace(/^align\s+/i, '');

		output.text = wrap(output.text, {
			style: `display: block; text-align: ${align}`,
		});
	},
};
