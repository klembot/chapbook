import {set} from '../../state';
import {CustomElement} from '../../util/custom-element';

/**
 * A wrapper element which, when any child input or select changes, sets a
 * variable in state accordingly. A change in a text input always sets a string,
 * even if the input is numeric. A change in a select usually sets a string, but
 * this can be overridden by setting a `data-json-value` attribute on the
 * `option`. If that's present, this element will parse that attribute as a JSON
 * value and set it accordingly.
 *
 * Available as `<variable-binding>`.
 */
export class VariableBinding extends CustomElement {
	constructor() {
		super();
		this.delegate('change', 'input, select', event => {
			const varName = this.getAttribute('name');
			const target = event.target as HTMLElement;

			if (!varName) {
				return;
			}

			switch (target.nodeName) {
				case 'INPUT':
					set(varName, (target as HTMLInputElement).value);
					break;

				case 'SELECT': {
					const option =
						target.querySelectorAll('option')[
							(target as HTMLSelectElement).selectedIndex
						];

					set(
						varName,
						option.dataset.jsonValue
							? JSON.parse(option.dataset.jsonValue)
							: option.value
					);
				}
			}
		});
	}
}
