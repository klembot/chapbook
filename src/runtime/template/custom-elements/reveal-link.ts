import {PageTransition} from '../../display/custom-elements/page-transition';
import {passageNamed} from '../../story';
import {render} from '../render';
import {InlineButton} from './inline-button';

/**
 * A link that changes its contents when clicked, either to inline source
 * (specified by the `text` attribute) or the source of a passage in the story
 * (specified by `passage`). If the resulting content includes paragraph breaks,
 * it will try to stitch those into the surrounding content appropriately.
 *
 * Available as `<reveal-link>`.
 */
export class RevealLink extends InlineButton {
  constructor() {
    super();
    this.addEventListener('click', () => {
      let source = this.getAttribute('text');
      const passageAttribute = this.getAttribute('passage');

      if (passageAttribute) {
        const passage = passageNamed(passageAttribute);

        if (passage) {
          source = passage.source;
        }
      }

      if (source) {
        const output = document.createElement('div');

        // Need to trim() this to avoid spurious empty text nodes at the end.

        output.innerHTML = render(source).trim();

        // Output contains only block-level elements as its children. We know this
        // because when we render source, it always comes wrapped in block
        // elements; a bare link in a paragraphy by itself, for example, gets
        // rendered with a <p> container by marked.

        const transitionEl: PageTransition | null =
          this.closest('page-transition');

        if (!transitionEl) {
          throw new Error(
            "Couldn't find suitable parent element to do a reveal link transition on."
          );
        }

        transitionEl.startTransition(() => {
          const toInsert = output.children.length;

          if (toInsert > 0 && this.parentNode) {
            // Put the first child where the link was in the DOM. Set its display
            // as inline to make it imitate the link's layout.

            const firstInsert = document.createElement('span');

            firstInsert.innerHTML = output.firstElementChild?.innerHTML ?? '';
            this.parentNode.insertBefore(firstInsert, this);
            output.firstElementChild?.remove();

            if (
              toInsert > 1 &&
              this.parentNode.parentNode &&
              output.lastChild
            ) {
              // If there are other block elements, place them as siblings of the
              // parent.

              const lastInsert = output.lastChild;

              while (output.lastChild) {
                this.parentNode.parentNode.insertBefore(
                  output.lastChild,
                  this.parentNode.nextSibling
                );
              }

              // Move any inline elements after the link we just expanded to the
              // end of the last newly-inserted block element. Otherwise, they'll
              // be sandwiched in by the new insert and order of content won't be
              // preserved.

              while (this.nextSibling) {
                lastInsert.insertBefore(this.nextSibling, null);
              }
            }
          }

          // Remove ourselves from the DOM.

          this.remove();
        });
      }
    });
  }
}
