/*
Causes text to appear after a delay.
*/

const timestring = require('timestring');
const wrap = require('../util/wrap-markdown');

class After {
	setup(invocation) {
		this.delay = timestring(invocation.replace(/^after\s/i, ''), 'ms');
	}

	process(output, opts) {
		output.text = wrap(
			output.text,
			{class: 'fade-in', style: `animation-delay: ${this.delay}ms`}
		);
	}
}

After.regexps = [
	/^after\s/i
];

module.exports = After;