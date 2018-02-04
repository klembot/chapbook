/*
A custom renderer for Marked that, instead of outputting code blocks, evaluates
them, and outputs small caps instead of strikethrough text.
*/

import marked from 'marked';
import unescape from 'lodash.unescape';

let renderer = new marked.Renderer();

/* Evaluate code blocks without outputting anything. */

renderer.code = src => {
	try {
		const func = new Function(unescape(src));
		
		func.apply(window);
	}
	catch (e) {
		let detail;

		if (e.error && e.error.stack) {
			detail = e.error.stack;
		}
		else {
			detail = e.message + '\n[No stack trace available]';
		}

		if (renderer.errors) {
			renderer.errors.push(`An error occurred while evaluating <code>${src}</code>.<br><pre>${detail}</pre>`);
		}
		else {
			throw e;
		}
	}

 	return '';
};

/*
Evaluate code spans, and if they end up having a non-null or undefined result,
output it.
*/

renderer.codespan = src => {
	try {
		const func = new Function(`return (${unescape(src)})`);
		const result = func.apply(window);

		if (result !== null && result !== undefined) {
			return result.toString();
		}
	}
	catch (e) {
		if (renderer.errors) {
			renderer.errors.push(`An error occurred while evaluating <code>${src}</code> (${e.message}).`);
		}
		else {
			throw e;
		}

		return '';
	}
};

renderer.del = src => {
	return `<span class="small-caps">${src}</span>`;
};

export default renderer;