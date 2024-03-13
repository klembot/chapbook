import {Modifier} from './types';

/**
 * Causes text to appear in the same paragraph as the one preceding it.
 */
export const appendModifier: Modifier = {
	match: /^append$/i,
	process(output) {
		output.startsNewParagraph = false;
	}
};
