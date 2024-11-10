import timestring from 'timestring';
import {Modifier} from './types';
import {wrapMarkdown} from '../wrap-markdown';

/**
 * Displays text after a delay.
 */
export const afterModifier: Modifier = {
	match: /^after\s/i,
	process(output, {invocation}) {
		const delay = timestring(invocation.replace(/^after\s/i, ''), 'ms');

		output.text = wrapMarkdown(output.text, 'skippable-animation', {
			'skippable-delay': delay.toString(),
			class: 'fade-in'
		});
	}
};