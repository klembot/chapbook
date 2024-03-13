import {get, set} from '../../state';
import {domify, htmlify} from '../../util';
import {Insert} from './types';

/**
 * Renders a dropdown menu that sets a variable.
 */
export const dropdownMenu: Insert<{choices: unknown[]}> = {
	match: /^dropdown menu(\s+for)?/i,
	render(varName, props) {
		let current: unknown;

		if (varName) {
			current = get(varName);

			if (current === undefined) {
				set(varName, props.choices[0]);
				current = props.choices[0];
			}
		}

		return htmlify('variable-binding', {name: varName ?? undefined}, [
			domify(
				'select',
				{},
				props.choices.map(choice => {
					const choiceString = (choice as object).toString();
					const opts: Record<string, string> = {
						'data-json-value': JSON.stringify(choice)
					};

					if (varName && current === choice) {
						opts.selected = '';
					}

					return domify('option', opts, [choiceString]);
				})
			)
		]);
	}
};
