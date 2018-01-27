/*
A custom renderer for Marked that, instead of outputting code blocks, evaluates
them, and outputs small caps instead of strikethrough text.
*/

import marked from 'marked';
import unescape from 'lodash.unescape';

let renderer = new marked.Renderer();

/* Evaluate code blocks without outputting anything. */

renderer.code = src => {
	const func = new Function(unescape(src));

	func.apply(window);
	return '';
};

/*
Evaluate code spans, and if they end up having a non-null or undefined result,
output it.
*/

renderer.codespan = src => {
	const func = new Function(`return (${unescape(src)})`);
	const result = func.apply(window);

	if (result !== null && result !== undefined) {
		return result.toString();
	}
}

renderer.del = src => {
	return `<span class="small-caps">${src}</span>`;
}

export default renderer;