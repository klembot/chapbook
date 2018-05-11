/*
Author functions to allows the player to make choices or enter text.
*/

import closest from 'closest';
import escape from 'lodash.escape';

class Input {
	constructor(vars, saveTo) {
		this.vars = vars;
		this.saveTo = saveTo;
		this.type = 'text';
		this.required = true;
	}

	choices(...choices) {
		this.choices = choices;
		return this;
	}

	cyclingLink(...choices) {
		this.type = 'cyclingLink';
		this.choices = choices;
		return this;
	}

	menu(...choices) {
		this.type = 'menu';
		this.choices = choices;
		return this;
	}

	text() {
		this.type = 'text';
		return this;
	}

	required() {
		this.required = true;
		return this;
	}

	optional() {
		this.required = false;
		return this;
	}

	toString() {
		switch (this.type) {
			case 'cyclingLink': {
				let current = this.vars.get(this.saveTo);

				if (current === undefined) {
					this.vars.set(this.saveTo, this.choices[0]);
					current = this.choices[0];
				}

				return `<a href="javascript:void(0)" class="stationary" data-cb-save-to="${escape(
					this.saveTo
				)}" ${this.required && 'required'} data-cb-cycle="${escape(
					JSON.stringify(this.choices)
				)}">${current}</a>`;
			}

			case 'menu': {
				let current = this.vars.get(this.saveTo);

				if (current === undefined) {
					this.vars.set(this.saveTo, this.choices[0]);
					current = this.choices[0];
				}

				const choiceHtml = this.choices.reduce(
					(result, choice) =>
						result +
						`<option value="${choice}" ${current === choice &&
							'selected'}>${choice}</option>`,
					''
				);

				return `<select data-cb-save-to="${escape(
					this.saveTo
				)}">${choiceHtml}</select>`;
			}

			case 'text':
				return `<input type="text" value="${escape(
					this.vars.get(this.saveTo)
				)}" ${this.required && 'required'} data-cb-save-to="${escape(
					this.saveTo
				)}">`;

			default:
				throw new Error(`No input type named "${this.type}" exists.`);
		}
	}

	static attachTo(el, vars) {
		/* Cycling links. */

		el.addEventListener('click', e => {
			const target = closest(
				e.target,
				'a[data-cb-save-to][data-cb-cycle]',
				true
			);

			if (target) {
				const varName = target.dataset.cbSaveTo;
				const choices = JSON.parse(target.dataset.cbCycle);
				let index = choices.indexOf(target.textContent) + 1;

				if (index === choices.length) {
					index = 0;
				}

				vars.set(varName, choices[index]);
				target.textContent = choices[index];
			}
		});

		/* Menus. */

		el.addEventListener('change', e => {
			const target = closest(e.target, 'select[data-cb-save-to]', true);

			if (target) {
				vars.set(
					target.dataset.cbSaveTo,
					target.options[target.selectedIndex].value
				);
			}
		});

		/* Text fields. */

		el.addEventListener('input', e => {
			const target = closest(
				e.target,
				'input[type="text"][data-cb-save-to]',
				true
			);

			if (target) {
				vars.set(target.dataset.cbSaveTo, target.value);
			}
		});

		/* Validation checking. */

		document
			.querySelector('form#cb-validation')
			.addEventListener('submit', e => {
				if (Input.validationCallback) {
					Input.validationCallback();
				}

				e.preventDefault();
			});
	}

	/*
	Triggers browser validation messages by simulating a click to a hidden
	button. We have to do it this way because submitting a form directly
	bypasses validation.
	*/

	static ifAllValid(func) {
		Input.validationCallback = func;
		document.querySelector('button#cb-validation-tester').click();
	}
}

function createFactory(vars) {
	return (...args) => new Input(vars, ...args);
}

export {Input, createFactory};
