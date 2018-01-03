/*
Handles if, unless, and else modifiers.
*/

class Conditionals {
	setup(invocation) {
		this.type = invocation.replace(/\s.*/, '').toLowerCase();
		this.lastCondition = this.condition;

		if (this.type !== 'else') {
			this.condition = new Function('return ' + invocation.replace(/.*?\s/, ''));
		}

		console.log('type is ' + this.type);
	}

	process(output, opts) {
		switch (this.type) {
			case 'if':
				if (!this.condition.apply(window)) {
					output.text = '';
				}
				break;

			case 'unless':
				if (this.condition.apply(window)) {
					output.text = '';
				}
				break;

			case 'else':
				if (this.lastCondition === undefined) {
					opts.addError('There was no matching if modifier for an else modifier.');
					return;
				}

				if (this.lastCondition.apply(window)) {
					output.text = '';
				}				
				break;
		}
	}
};

Conditionals.regexps = [
	/^if\s/i,
	/^unless\s/i,
	/^else$/i
];

module.exports = Conditionals;