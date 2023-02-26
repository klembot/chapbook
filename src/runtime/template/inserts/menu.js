/*
Renders a dropdown menu that sets a variable.
*/

import event from '../../event';
import {get, set} from '../../state';
import htmlify, {domify} from '../../util/htmlify';

export default {
	match: /^dropdown menu(\s+for)?/i,
	render(varName, props) {
		let current;

		if (varName) {
			current = get(varName);

			if (current === undefined) {
				set(varName, props.choices[0]);
				current = props.choices[0];
			}
		}

		return htmlify(
			'select',
			{
				'data-cb-menu-choices': JSON.stringify(props.choices),
				'data-cb-menu-set': varName ?? undefined
			},
			props.choices.map(choice => {
				const opts = {value: choice};

				if (varName && current === choice) {
					opts.selected = '';
				}

				return domify('option', opts, [choice]);
			})
		);
	}
};

event.on('dom-change', el => {
	if (el.dataset.cbMenuSet) {
		const choices = JSON.parse(el.dataset.cbMenuChoices);
		const value = el.querySelectorAll('option')[el.selectedIndex].value;

		// Coerce choices here to strings because the value in the DOM will have
		// been converted to one.

		const choiceIndex = choices
			.map(choice => (typeof choice === 'string' ? choice : choice.toString()))
			.findIndex(choice => choice === value);

		if (choiceIndex !== -1) {
			set(el.dataset.cbMenuSet, choices[choiceIndex]);
		}
	}
});
