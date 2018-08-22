/*
Renders a cycling link, optionally saving the selected value to a variable.
*/

import {get, set} from '../../state';
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
				'data-cb-set': props.set,
				'data-cb-cycle': JSON.stringify(choices)
			},
			[current]
		);
	}
};
