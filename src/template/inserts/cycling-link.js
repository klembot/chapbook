/*
Renders a cycling link, optionally saving the selected value to a variable.
*/

import {get, set} from '../../state';
import event from '../../event';
import htmlify from '../../util/htmlify';

export default {
	match: /^cycling\s+link(\s+for)?/i,
	render(choices, props) {
		let current;

		if (props.set) {
			current = get(props.set);

			if (current === undefined) {
				set(props.set, choices[0]);
				current = choices[0];
			}
		} else {
			current = choices[0];
		}

		return htmlify(
			'a',
			{
				href: 'javascript:void(0)',
				'data-cb-cycle-set': props.set,
				'data-cb-cycle-choices': JSON.stringify(choices)
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

		el.textContent = choices[index];

		if (el.dataset.cbCycleSet) {
			set(el.dataset.cbCycleSet, choices[index]);
		}
	}
});
