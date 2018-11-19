/*
Renders a text input field.
*/

import event from '../../event';
import {get, set} from '../../state';
import htmlify from '../../util/htmlify';

export default {
	match: /^text\s+input(\s+for)?/i,
	render(varName, props) {
		return htmlify('input', {
			type: 'text',
			value: get(varName) || '',
			'data-cb-text-field-set': varName,
			required: props.required ? '' : undefined
		});
	}
};

event.on('dom-change', el => {
	if (el.dataset.cbTextFieldSet) {
		set(el.dataset.cbTextFieldSet, el.value);
	}
});
