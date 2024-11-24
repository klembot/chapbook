import {go} from '../../actions';
import {allChildInputsValid} from '../../util/all-child-inputs-valid';
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
      const parent: HTMLElement | null = this.closest(
        'article, footer, header'
      );

      if (parent && !allChildInputsValid(parent)) {
        return;
      }

      if (target) {
        // We dispatch this event so that listeners interested in what triggered
        // a passage navigation can see us.

        this.dispatchEvent(
          new CustomEvent('passage-navigate', {bubbles: true})
        );
        go(target);
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'link');
  }
}
