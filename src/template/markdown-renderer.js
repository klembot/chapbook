/*
A custom renderer for Marked that:
-	Instead of outputting code blocks, evaluates them
-	Renders a div#fork instead of a blockquote character
-	Outputs small caps instead of strikethrough text
*/

import marked from 'marked';
import unescape from 'lodash.unescape';
import {get} from '../state';

let renderer = new marked.Renderer();

Object.assign(renderer, {
	blockquote(src) {
		return `<div class="fork">${src}</div>`;
	},

	code(src) {
		/*
		Evaluate code blocks without outputting anything normally. The code can
		call `write()` to create output. (We use `write()` so that it does not
		conflict with `window.print()`.) This implementation is based on
		Underscore templating.
		*/

		try {
			const func = new Function(`
				function write() { write.__out += write.__join.call(arguments, ''); }
				write.__out = '';
				write.__join = Array.prototype.join;
				${unescape(src)};
				return write.__out;
			`);

			return func.apply(window);
		} catch (e) {
			if (get('config.testing')) {
				let detail = 'unknown error';

				if (e.error && e.error.stack) {
					detail = e.error.stack;
				} else {
					detail = e.message + '\n[No stack trace available]';
				}

				return `<div class="error">An error occured evaluating:<pre>${src}</pre><p><pre>${detail}</pre></p></div>`;
			} else {
				throw e;
			}
		}
	},

	del(src) {
		/*
		Use ~~tildes~~ to denote small caps instead of strikethroughs.
		*/

		return `<span class="small-caps">${src}</span>`;
	}
});

export default renderer;
