import {go} from '../../actions';
import {BodyContent} from '../../display/custom-elements/body-content';
import {MarginalContent} from '../../display/custom-elements/marginal-content';
import {InlineButton} from './inline-button';

/**
 * A link that displays another passage. If there are any invalid inputs in its
 * parent, navigation will not occur. It may be used outside of a
 * `<body-content>` or `<marginal-content>` element, in which case it will skip
 * input validation.
 *
 * Available as `<passage-link>`.
 */
export class PassageLink extends InlineButton {
	constructor() {
		super();
		this.addEventListener('click', () => {
			const target = this.getAttribute('to');
			const parent: BodyContent | MarginalContent | null = this.closest(
				'body-content, marginal-content'
			);

			if (parent && !parent.allChildInputsValid()) {
				return;
			}

			if (target) {
				go(target);
			}
		});
	}

	connectedCallback() {
		this.setAttribute('role', 'link');
	}
}
