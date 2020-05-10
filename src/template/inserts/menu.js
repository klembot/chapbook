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
			{'data-cb-menu-set': varName || undefined},
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
		set(
			el.dataset.cbMenuSet,
			el.querySelectorAll('option')[el.selectedIndex].value
		);
	}
});
