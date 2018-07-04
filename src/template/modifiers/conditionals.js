// Handles if, unless, and else modifiers.

export default {
	match: /^if\s|else$|unless\s/i,
	process(output, {event, invocation, data}) {
		const type = invocation.replace(/\s.*/, '').toLowerCase();
		let condition;

		if (type !== 'else') {
			condition = new Function(
				'return ' + invocation.replace(/.*?\s/, '')
			);
		}

		switch (type) {
			case 'if':
				data.conditionEval = this.condition.apply(window);
				break;

			case 'unless':
				data.conditionEval = !this.condition.apply(window);
				break;

			case 'else':
				if (!data.conditionEval) {
					throw new Error(
						'There was no matching if modifier for an else modifier.'
					);
				}

				data.conditionEval = !data.conditionEval;
				break;
		}

		if (!data.conditionEval) {
			output.text = '';
			output.beforeText = '';
			output.afterText = '';
		}
	}
};
