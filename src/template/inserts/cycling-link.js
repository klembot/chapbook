/*
Renders a cycling link, optionally saving the selected value to a variable.
*/

import {changeBody} from '../../display';
import {get, set} from '../../state';
import event from '../../event';
import htmlify from '../../util/htmlify';

export default {
	match: /^cycling\s+link(\s+for)?/i,
	render(varName, props) {
		let current;

		if (varName) {
			current = get(varName);

			if (current === undefined) {
				set(varName, props.choices[0]);
				current = props.choices[0];
			}
		} else {
			current = props.choices[0];
		}

		return htmlify(
			'a',
			{
				href: 'javascript:void(0)',
				'data-cb-cycle-set': varName || undefined,
				'data-cb-cycle-choices': JSON.stringify(props.choices)
			},
			[current]
		);
	}
};

event.on('dom-click', el => {
	if (el.dataset.cbCycleChoices) {
		const choices = JSON.parse(el.dataset.cbCycleChoices);
		let index = choices.indexOf(el.textContent) + 1;

		if (index === choices.length) {
			index = 0;
		}

		changeBody(() => (el.textContent = choices[index]));

		if (el.dataset.cbCycleSet) {
			set(el.dataset.cbCycleSet, choices[index]);
		}
	}
});
