import {BodyContent} from '../../display/custom-elements/body-content';
import {MarginalContent} from '../../display/custom-elements/marginal-content';
import {createLoggers} from '../../logger';
import {set} from '../../state';
import {InlineButton} from './inline-button';

const {warn} = createLoggers('inserts');

/**
 * A button that changes its content based on choices defined in its `choices`
 * attribute. If it has a `set` attribute, clicking this element also sets the
 * variable to the currently visible choice.
 *
 * (It's a button because it doesn't navigate anywhere.)
 *
 * Available as `<cycling-link>`.
 */
export class CyclingLink extends InlineButton {
	constructor() {
		super();

		this.addEventListener('click', () => {
			const choicesAttribute = this.getAttribute('choices');

			if (choicesAttribute) {
				let choices: unknown[];

				try {
					choices = JSON.parse(choicesAttribute);
				} catch (error) {
					warn(
						`The choices attribute, "${choicesAttribute}" couldn't be parsed.`
					);
					return;
				}

				// If choices can't be deserialized, do nothing.

				if (!Array.isArray(choices)) {
					warn(
						"The choices attribute of this cycling link doesn't deserialize to an array."
					);
					return;
				}

				// Coerce choices here to strings because the value in the DOM will have
				// been converted to one.

				let index =
					choices
						.map(choice =>
							typeof choice === 'string'
								? choice
								: (choice as object).toString()
						)
						.indexOf((this.textContent ?? '').trim()) + 1;

				if (index === choices.length) {
					index = 0;
				}

				const parent: BodyContent | MarginalContent | null = this.closest(
					'body-content, marginal-content'
				);

				if (!parent) {
					throw new Error(
						"Couldn't find suitable parent element to do a cycle link transition on."
					);
				}

				parent.changeContent(() => {
					this.textContent = (choices[index] as object).toString();
				});

				const setAttribute = this.getAttribute('set');

				if (setAttribute) {
					set(setAttribute, choices[index]);
				}
			}
		});
	}
}
