/*
Handles if, unless, and else modifiers.
*/

class Conditionals {
	setup(invocation) {
		this.type = invocation.replace(/\s.*/, '').toLowerCase();

		if (this.type !== 'else') {
			this.condition = new Function(
				'return ' + invocation.replace(/.*?\s/, '')
			);
		}
	}

	process(output, opts) {
		switch (this.type) {
			case 'if':
				this.conditionEval = this.condition.apply(window);
				break;

			case 'unless':
				this.conditionEval = !this.condition.apply(window);
				break;

			case 'else':
				if (!this.condition) {
					opts.addError(
						'There was no matching if modifier for an else modifier.'
					);
					return;
				}

				this.conditionEval = !this.conditionEval;
				break;
		}

		if (!this.conditionEval) {
			output.text = '';
			output.beforeText = '';
			output.afterText = '';
		}
	}
}

Conditionals.regexps = [/^if\s/i, /^unless\s/i, /^else$/i];

export default Conditionals;
