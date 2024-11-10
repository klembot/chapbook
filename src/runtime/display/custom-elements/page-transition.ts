import timestring from 'timestring';
import {DisplayChangeEventDetail} from '../../custom-events';
import {get} from '../../state';
import {CustomElement} from '../../util/custom-element';
import './page-transition.css';

export interface UpdateContentOptions {
  preserveWindowScroll?: boolean;
}

export class PageTransition extends CustomElement {
  connectedCallback() {
    window.addEventListener('display-change', this);
  }

  disconnectedCallback() {
    window.removeEventListener('display-change', this);
  }

  async startTransition(
    callback: () => void | Promise<void>,
    options: UpdateContentOptions = {}
  ) {
    const transitionName = get('config.body.transition.name');
    const transitionDuration = get('config.body.transition.duration');
    const parsedDuration =
      typeof transitionDuration === 'string'
        ? timestring(transitionDuration, 's')
        : 0;

    if (
      document.startViewTransition &&
      typeof transitionName === 'string' &&
      ['crossfade', 'fadeInOut'].includes(transitionName) &&
      parsedDuration > 0
    ) {
      if (transitionName === 'crossfade') {
        document.documentElement.style.setProperty(
          '--page-transition-duration',
          `${parsedDuration}s`
        );
        document.startViewTransition(async () => {
          await callback();

          if (!options.preserveWindowScroll) {
            window.scrollTo(0, 0);
          }
        });
      } else {
        document.documentElement.style.setProperty(
          '--page-transition-duration',
          `${parsedDuration / 2}s`
        );
        const fadeOut = document.startViewTransition(async () => {
          this.style.visibility = 'hidden';
        });

        await fadeOut.finished;
        document.startViewTransition(async () => {
          this.style.visibility = 'visible';
          await callback();

          if (!options.preserveWindowScroll) {
            window.scrollTo(0, 0);
          }
        });
      }
    } else {
      await callback();

      if (!options.preserveWindowScroll) {
        window.scrollTo(0, 0);
      }
    }
  }

  handleEvent({detail}: CustomEvent<DisplayChangeEventDetail>) {
    this.startTransition(() => {
      const bodyEl = this.querySelector('article');

      if (bodyEl) {
        // This <div> wrapper allows margin collapse between child elements to
        // occur, because the element uses flex display for vertical alignment.

        bodyEl.innerHTML = `<div>${detail.body}</div>`;

        // This event is used by <page-skip>, which decides whether to show a
        // skip indicator based on what the new content is.

        bodyEl.dispatchEvent(
          new CustomEvent('body-content-change', {bubbles: true})
        );
      }

      const parts = ['left', 'center', 'right'];

      for (const marginal of ['footer', 'header']) {
        const marginalEl = this.querySelector(marginal);

        if (!marginalEl) {
          continue;
        }

        if (
          parts.some(
            part =>
              detail[marginal as 'footer' | 'header'][
                part as 'left' | 'center' | 'right'
              ].trim() !== ''
          )
        ) {
          marginalEl.removeAttribute('hidden');
        } else {
          marginalEl.setAttribute('hidden', '');
        }

        marginalEl.innerHTML = ['left', 'center', 'right'].reduce(
          (result, part) =>
            result +
            `<div class="${part}">${
              detail[marginal as 'footer' | 'header'][
                part as 'left' | 'center' | 'right'
              ]
            }</div>`,
          ''
        );
      }
    });
  }
}
