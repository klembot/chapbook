// Causes text to appear after a delay.

import timestring from 'timestring';
import wrap from '../../util/wrap-markdown';

export default {
	match: /^after\s/i,
	process(output, {invocation}) {
		const delay = timestring(invocation.replace(/^after\s/i, ''), 'ms');

		output.text = wrap(output.text, {
			'data-cb-skippable': '',
			class: 'fade-in',
			style: `animation-delay: ${delay}ms`,
		});
	},
};
