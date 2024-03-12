import {unescape} from 'lodash-es';
import {get} from '../../state';
import {Modifier} from './types';

/**
 * Runs JavaScript as-is, making a `write()` function available in the code that
 * will write output to the passage. The JS is run immediately during render,
 * not after the passage content transitions in.
 */
export const javascriptModifier: Modifier = {
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
		} catch (rawError) {
			if (get('config.testing')) {
				const error = rawError as Error;
				let detail = 'unknown error';

				if (error.stack) {
					detail = error.stack;
				} else {
					detail = error.message + '\n[No stack trace available]';
				}

				output.text = `<div class="error">An error occurred evaluating:<pre>${output.text}</pre><p><pre>${detail}</pre></p></div>`;
			} else {
				throw rawError;
			}
		}
	}
};
