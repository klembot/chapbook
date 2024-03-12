import {get, set} from '../../state';
import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * A link that cycles through choices, optionally setting a variable along the
 * way.
 */
export const cyclingLink: Insert<{choices: unknown[]}> = {
	match: /^cycling\s+link(\s+for)?/i,
	render(varName, {choices}) {
		let current = '';

		if (varName) {
			const value = get(varName);

			if (value === undefined) {
				set(varName, choices[0]);

				current = (choices[0] as object).toString();
			} else {
				current = (value as object).toString();
			}
		} else {
			current = (choices[0] as object).toString();
		}

		return htmlify(
			'cycling-link',
			{
				class: 'link',
				set: varName ?? undefined,
				choices: JSON.stringify(choices)
			},
			[current]
		);
	}
};
