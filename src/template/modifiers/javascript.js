/*
Allows execution of JavaScript directly. The code can call `write()` to create
output. (We use `write()` so that it does not conflict with `window.print()`.)
This implementation is based on Underscore templating.
*/

import unescape from 'lodash.unescape';
import {get} from '../../state';

export default {
	match: /^javascript$/i,
	process(output) {
		try {
			const func = new Function(`
						function write() { write.__out += write.__join.call(arguments, ''); }
						write.__out = '';
						write.__join = Array.prototype.join;
						${unescape(output.text)};
						return write.__out;
					`);

			output.text = func.apply(window);
		} catch (e) {
			if (get('config.testing')) {
				let detail = 'unknown error';

				if (e.error && e.error.stack) {
					detail = e.error.stack;
				} else {
					detail = e.message + '\n[No stack trace available]';
				}

				output.text = `<div class="error">An error occured evaluating:<pre>${src}</pre><p><pre>${detail}</pre></p></div>`;
			} else {
				throw e;
			}
		}
	}
};
