import {get} from '../../state';
import {domify, htmlify} from '../../util';
import {Insert} from './types';

/**
 * A single-line text input that optionally sets a variable when it's changed.
 */
export const textInput: Insert<{required?: boolean}> = {
	match: /^text\s+input(\s+for)?/i,
	render(varName, props) {
		return htmlify(
			'variable-binding',
			{
				name: varName ?? undefined
			},
			[
				domify('input', {
					type: 'text',
					value: varName ? ((get(varName) as object) ?? '').toString() : '',
					required: props.required !== false ? '' : undefined
				})
			]
		);
	}
};
