/*
Renders a dropdown menu that sets a variable.
*/

import event from '../../event';
import {get, set} from '../../state';
import htmlify, {domify} from '../../util/htmlify';

export default {
	match: /^dropdown menu(\s+for)?/i,
	render(varName, props) {
		let current = get(varName);

		if (current === undefined) {
			set(varName, props.choices[0]);
			current = props.choices[0];
		}

		return htmlify(
			'select',
			{'data-cb-menu-set': varName},
			props.choices.map(choice =>
				domify(
					'option',
					{
						value: choice,
						selected: current === choice ? 'selected' : undefined
					},
					[choice]
				)
			)
		);
	}
};

event.on('dom-change', el => {
	if (el.dataset.cbMenuSet) {
		set(
			el.dataset.cbMenuSet,
			el.querySelectorAll('option')[el.selectedIndex].value
		);
	}
});
