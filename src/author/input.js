// Author functions to allows the player to make choices or enter text.

import htmlify from '../util/htmlify';
import {get, set} from '../state';

export default {
	cyclingLink(varName, ...choices) {
		let current = get(varName);

		if (current === undefined) {
			set(varName, choices[0]);
			current = choices[0];
		}

		return htmlify(
			'a',
			{
				class: 'stationary',
				href: 'javascript:void(0)',
				'data-cb-set': varName,
				'data-cb-cycle': JSON.stringify(choices)
			},
			current
		);
	},

	menu(varName, ...choices) {
		let current = get(varName);

		if (current === undefined) {
			set(varName, choices[0]);
			current = choices[0];
		}

		return htmlify(
			'select',
			{'data-cb-set': varName},
			choices.map(c =>
				htmlify(
					'option',
					{
						value: c,
						selected: current === c ? 'selected' : undefined
					},
					c
				)
			)
		);
	},

	text(varName, required = true) {
		return htmlify('input', {
			type: 'text',
			value: get(varName),
			'data-cb-set': varName,
			required: required ? '' : undefined
		});
	}
};
