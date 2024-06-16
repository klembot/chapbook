import timestring from 'timestring';
import './transitions.css';

export type TransitionName = 'crossfade' | 'fadeInOut' | 'none';

/**
 * Immediately transitions inner HTML.
 */
export function none(el: HTMLElement, html: string) {
	return new Promise<void>(resolve => {
		el.innerHTML = html;
		resolve();
	});
}

/**
 * Fades out old HTML content, then fades in new content.
 */
export function fadeInOut(el: HTMLElement, html: string, duration: string) {
	const stepDuration = timestring(duration, 's') / 2;

	// If our duration is 0, use the none transition instead. Otherwise, we'll
	// never resolve as we're waiting for an animationend event that will never
	// fire.

	if (stepDuration === 0) {
		return none(el, html);
	}

	return new Promise<void>(resolve => {
		const oldAnimationDuration = el.style.animationDuration;
		const oldPointerEvents = el.style.pointerEvents;
		const oldVisibility = el.style.visibility;

    el.style.pointerEvents = 'none';

    function finish() {
      el.removeEventListener('animationend', finish);
      el.classList.remove('fade-in');
      el.style.animationDuration = oldAnimationDuration;
      el.style.pointerEvents = oldPointerEvents;
      resolve();
    }

    if (el.innerHTML.trim() !== '') {
      // Fade out old content, then fade in new content.

      el.style.animationDuration = `${stepDuration}s`;
      el.addEventListener('animationend', async function fadeIn() {
        el.removeEventListener('animationend', fadeIn);
        el.classList.remove('fade-out');
        el.style.visibility = 'hidden';

        // This delay is needed because if we add finish() as an event listener
        // immediately, it never gets called.

        window.setTimeout(() => {
          el.addEventListener('animationend', finish);
          el.innerHTML = html;
          el.style.visibility = oldVisibility;
          el.classList.add('fade-in');
        }, 0);
      });
      el.classList.add('fade-out');
    } else {
      // There's no outgoing content, so our fade is twice as slow.

      el.innerHTML = html;
      el.style.animationDuration = `${stepDuration * 2}s`;
      el.classList.add('fade-in');
      el.addEventListener('animationend', finish);
    }
	});
}

/**
 * Does a crossfade of inner HTML. This *only* works with the main display
 * elements, like the body or footer. This will not transition arbitrary
 * elements correctly.
 */
export function crossfade(el: HTMLElement, html: string, duration: string) {
	const stepDuration = timestring(duration, 's');

	// If our duration is 0, use the none transition instead. Otherwise, we'll
	// never resolve as we're waiting for an animationend event that will never
	// fire.

	if (stepDuration === 0) {
		return none(el, html);
	}

	// This heavily relies on the fact that we are using CSS grid to position
	// display elements, and if there are two elements with the same grid area
	// (e.g. "body"), they will be positioned on top of each other and otherwise
	// have the same characteristics. That way, we don't have to try to position
	// the outgoing element manually.
	//
	// See https://pqina.nl/blog/css-grid-position-absolute-alternative/

	return new Promise<void>((resolve, reject) => {
		const oldAnimationDuration = el.style.animationDuration;
		const oldPointerEvents = el.style.pointerEvents;

		// Fade out existing content if any is present.

		if (el.innerHTML.trim() !== '') {
			if (!el.parentNode) {
				reject(new Error('This element must have a parent element.'));
				return;
			}

			const outEl = el.cloneNode(true) as HTMLElement;

			el.parentNode.appendChild(outEl);
			outEl.setAttribute('aria-hidden', '');
			outEl.classList.add('fade-out');
			outEl.style.animationDuration = `${stepDuration}s`;
			outEl.addEventListener('animationend', () => outEl.remove());
		}

		// Add the new content and fade it in.

		el.innerHTML = html;
		el.classList.add('fade-in');
		el.style.animationDuration = `${stepDuration}s`;
		el.style.pointerEvents = 'none';
		el.addEventListener('animationend', function finish() {
			el.removeEventListener('animationend', finish);
			el.style.animationDuration = oldAnimationDuration;
			el.style.pointerEvents = oldPointerEvents;
			el.classList.remove('fade-in');
			resolve();
		});
	});
}

/**
 * Returns whether a value is a valid transition name.
 */
export function isTransitionName(value: unknown): value is TransitionName {
	return (
		typeof value === 'string' &&
		['crossfade', 'fadeInOut', 'none'].includes(value)
	);
}

/**
 * A forgiving transition function. If invalid arguments are passed to it (e.g.
 * if an author has set invalid values in state for transition names or
 * durations), simple defaults are substituted.
 */
export function transition(
	el: HTMLElement,
	html: string,
	name: unknown,
	duration?: unknown
) {
	const parsedDuration = typeof duration === 'string' ? duration : '0s';

	switch (isTransitionName(name) ? name : 'none') {
		case 'crossfade':
			return crossfade(el, html, parsedDuration);
		case 'fadeInOut':
			return fadeInOut(el, html, parsedDuration);
		case 'none':
			return none(el, html);
	}
}
