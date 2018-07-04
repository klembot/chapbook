// A custom renderer for Marked that, instead of outputting code blocks,
// evaluates them, and outputs small caps instead of strikethrough text.

import marked from 'marked';
import unescape from 'lodash.unescape';

let renderer = new marked.Renderer();

Object.assign(renderer, {
	code(src) {
		// Evaluate code blocks without outputting anything.

		try {
			const func = new Function(unescape(src));

			func.apply(window);
		} catch (e) {
			let detail = 'unknown error';

			if (e.error && e.error.stack) {
				detail = e.error.stack;
			} else {
				detail = e.message + '\n[No stack trace available]';
			}

			console.error(
				`An error occurred while evaluating "${src}" (${detail})`
			);
		}

		// In all cases, return nothing to display.

		return '';
	},

	codespan(src) {
		// Evaluate code spans, and if they end up having a non-null or
		// undefined result, output it.

		try {
			const func = new Function(`return (${unescape(src)})`);
			const result = func.apply(window);

			if (result !== null && result !== undefined) {
				return result.toString();
			}
		} catch (e) {
			console.error(
				`An error occurred while evaluating "${src}" (${e.message})`
			);

			return '';
		}
	},

	del(src) {
		// Use ~~tildes~~ to denote small caps instead of strikethroughs.

		return `<span class="small-caps">${src}</span>`;
	}
});

export default renderer;
