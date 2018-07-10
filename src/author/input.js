/*
Author functions to allows the player to make choices or enter text.
*/

import closest from 'closest';
import escape from 'escape-html';
import factoryFor from '../util/class-factory';
import {get, set} from '../state';

export class Input {
	constructor(set) {
		this.set = set;
		this.type = 'text';
		this.required = true;
	}

	set(value) {
		this.set = value;
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
				let current = get(this.set);

				if (current === undefined) {
					set(this.saveTo, this.choices[0]);
					current = this.choices[0];
				}

				return `<a href="javascript:void(0)" class="stationary" data-cb-set="${escape(
					this.set
				)}" ${this.required && 'required'} data-cb-cycle="${escape(
					JSON.stringify(this.choices)
				)}">${current}</a>`;
			}

			case 'menu': {
				let current = get(this.set);

				if (current === undefined) {
					set(this.set, this.choices[0]);
					current = this.choices[0];
				}

				const choiceHtml = this.choices.reduce(
					(result, choice) =>
						result +
						`<option value="${choice}" ${current === choice &&
							'selected'}>${choice}</option>`,
					''
				);

				return `<select data-cb-set="${escape(
					this.set
				)}">${choiceHtml}</select>`;
			}

			case 'text':
				return `<input type="text" value="${escape(
					get(this.set)
				)}" ${this.required && 'required'} data-cb-set="${escape(
					this.saveTo
				)}">`;

			default:
				throw new Error(`No input type named "${this.type}" exists.`);
		}
	}
}

export default factoryFor(Input);
