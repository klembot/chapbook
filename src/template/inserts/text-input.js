/*
Renders a text input field.

long prop?
*/

import {get} from '../../state';
import htmlify from '../../util/htmlify';

export default {
	match: /^text\s+input(\s+for)?/i,
	render(varName, props) {
		return htmlify('input', {
			type: 'text',
			value: get(varName) || '',
			'data-cb-set': varName,
			required: props.required ? '' : undefined
		});
	}
};
