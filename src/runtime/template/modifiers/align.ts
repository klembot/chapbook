import {wrapMarkdown} from '../wrap-markdown';
import {Modifier} from './types';

/**
 * Applies a text alignment.
 */
export const alignModifier: Modifier = {
	match: /^align\s+(left|right|center)/i,
	process(output, {invocation}) {
		const align = invocation.replace(/^align\s+/i, '');

		output.text = wrapMarkdown(output.text, 'span', {
			style: `display: block; text-align: ${align}`
		});
	}
};
