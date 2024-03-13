import {Modifier} from './types';

/**
 * Handles if, unless, and else modifiers, as well as their always/never
 * variants.
 */
export const conditionalModifier: Modifier = {
	match: /^if(always|never)?\s|else$|unless\s/i,
	processRaw(output, {invocation, state}) {
		const type = invocation.replace(/\s.*/, '').toLowerCase();
		const conditionEval = () =>
			new Function('return ' + invocation.replace(/.*?\s/, '')).apply(window);

		switch (type) {
			case 'if':
				state.conditionEval = conditionEval();
				break;

			case 'ifalways':
				state.conditionEval = true;
				break;

			case 'ifnever':
				state.conditionEval = false;
				break;

			case 'unless':
				state.conditionEval = !conditionEval();
				break;

			case 'else':
				if (state.conditionEval === undefined) {
					throw new Error(
						'There was no matching if modifier for an else modifier.'
					);
				}

				state.conditionEval = !state.conditionEval;
				break;
		}

		if (!state.conditionEval) {
			output.text = '';
		}
	}
};
