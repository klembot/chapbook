// Handles if, unless, and else modifiers.

export default {
	match: /^if\s|else$|unless\s/i,
	process(output, {invocation, state}) {
		const type = invocation.replace(/\s.*/, '').toLowerCase();
		let condition;

		if (type !== 'else') {
			condition = new Function(
				'return ' + invocation.replace(/.*?\s/, '')
			);
		}

		switch (type) {
			case 'if':
				state.conditionEval = condition.apply(window);
				break;

			case 'unless':
				state.conditionEval = !condition.apply(window);
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
			output.beforeText = '';
			output.afterText = '';
		}
	}
};
