/*
Functions to allow players to input text or make choices.
*/

import closest from 'closest';
import escape from 'lodash.escape';
import get from 'lodash.get';
import set from 'lodash.set';

export default {
	attachTo(el) {
		/* Cycling links. */
		
		el.addEventListener('click', e => {
			const target = closest(
				e.target,
				'a[data-cb-save-to][data-cb-cycle]',
				true
			);

			if (target) {
				const varName = target.dataset.cbSaveTo;
				const choices = JSON.parse(target.dataset.cbCycle);
				let index = choices.indexOf(target.textContent) + 1;
				
				if (index === choices.length) {
					index = 0;
				}

				set(window, varName, choices[index]);
				target.textContent = choices[index];
				/* TODO: persistence */	
			}
		});

		/* Menus. */

		el.addEventListener('change', e => {
			const target = closest(e.target, 'select[data-cb-save-to]', true);

			if (target) {
				const varName = target.dataset.cbSaveTo;

				set(window, varName, target.options[target.selectedIndex].value);
				/* TODO: persistence */
			}
		});

		/* Text fields. */

		el.addEventListener('input', e => {
			const target = closest(
				e.target,
				'input[type="text"][data-cb-save-to]',
				true
			);

			if (target) {
				const varName = target.dataset.cbSaveTo;

				set(window, varName, target.value);
				/* TODO: persistence */
			}
		});
	},

	cyclingLink(varName, ...choices) {
		return `<a href="javascript:void(0)" class="stationary" data-cb-save-to="${escape(varName)}" data-cb-cycle="${escape(JSON.stringify(choices))}">${choices[0]}</a>`;
	},

	menu(varName, ...choices) {
		const choiceHtml = choices.reduce(
			(result, choice) =>
				result + `<option value="${choice}">${choice}</option>`,
			''
		);

		return `<select data-cb-save-to="${escape(varName)}">${choiceHtml}</select>`;
	},

	text(varName, required = true) {
		return `<input type="text" value="${escape(get(window, varName))}" data-cb-save-to="${escape(varName)}">`;
	}
};