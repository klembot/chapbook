import {Modifier} from './types';

/**
 * A no-op modifier used to reset other modifiers.
 */
export const continueModifier: Modifier = {
	match: /^continued?|cont('d)?$/i,
	process() {}
};
