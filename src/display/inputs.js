import {selectAll} from '../util/dom-select';
import {set} from '../state';

export function validate() {
	const form = document.querySelector('form#cb-validation');
	const inputs = selectAll(form, 'input, select');

	return new Promise((resolve, reject) => {
		const failureListener = () => {
			form.removeEventListener('submit', successListener);
			inputs.forEach(i =>
				i.removeEventListener('invalid', failureListener)
			);
			reject();
		};

		const successListener = () => {
			form.removeEventListener('submit', successListener);
			inputs.forEach(i =>
				i.removeEventListener('invalid', failureListener)
			);

			resolve();
		};

		inputs.forEach(i => i.addEventListener('invalid', failureListener));
		form.addEventListener('submit', successListener);
		document.querySelector('button#cb-validation-tester').click();
	});
}

export function transferToState() {
	queryAll(document, '[data-cb-set]').forEach(i => {
		const name = i.dataset.set;

		switch (i.nodeName) {
			case 'INPUT':
				set(name, i.value);
				break;

			case 'SELECT':
				set(name, i.options[i.selectedIndex].value);
				break;

			default:
				set(name, i.textContent);
		}
	});
}
