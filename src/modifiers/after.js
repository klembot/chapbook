/*
Causes text to appear after a delay.
*/

import timestring from 'timestring';
import wrap from '../util/wrap-markdown';

class After {
	setup(invocation) {
		this.delay = timestring(invocation.replace(/^after\s/i, ''), 'ms');
	}

	process(output) {
		output.text = wrap(output.text, {
			class: 'fade-in',
			style: `animation-delay: ${this.delay}ms`
		});
	}
}

After.regexps = [/^after\s/i];

export default After;
