/*
Renders a dropdown menu that sets a variable.
*/

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
			{'data-cb-set': varName},
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
