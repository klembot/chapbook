/*
Handles errors that occur during play in release mode (e.g. not testing). If
we're in test mode, then errors and warnings are shown inline in the page.

The goals here are to:

- notify the player that things have gone wrong
- give them some options to get things back on track if possible

Because other modules may have gotten in a bad state, this module needs to be
as self-sufficient as possible.
*/

import closest from 'closest';
import {get, set, saveKey} from '../state';

function handleError(e) {
	/*
	Marked will blame itself if rendering has problems, but it probably is our
	fault, so remove that pointer.
	*/

	const markedError =
		'\nPlease report this to https://github.com/chjj/marked.';

	try {
		let detail = '';

		if (e.error && e.error.stack) {
			detail = e.message + '\n\nStack trace:\n' + e.error.stack;
		} else {
			detail = e.message + '\n\n[No stack trace available]';
		}

		detail = detail.replace(markedError, '');

		const display = document.createElement('div');
		const container = document.querySelector('#page article');

		display.className = 'error';
		display.innerHTML = `
			<p>
			An unexpected error has occurred.
			</p>
			<ul>
				<li>
					<a href="javascript:void(0)" data-cb-back>Go back</a> to the previous passage.
				</li>
				<li>
					<a href="javascript:void(0)" data-cb-hard-restart>Hard restart</a>, clearing all progress and beginning from the start.
				</li>
			</ul>
		`;

		display.addEventListener('click', e => {
			const backLink = closest(e.target, '[data-cb-back]', true);

			if (backLink) {
				const trail = get('trail');

				if (Array.isArray(trail)) {
					set('trail', trail.slice(0, trail.length - 1));
				} else {
					window.alert(
						'Sorry, going back was not successful. Please try hard restarting.'
					);
				}

				return;
			}

			const restartLink = closest(
				e.target,
				'[data-cb-hard-restart]',
				true
			);

			if (restartLink) {
				window.localStorage.removeItem(saveKey);
				window.location.reload();
			}
		});

		container.innerHTML = '';
		container.appendChild(display);
	} catch (e) {
		/* Things have gotten really screwy-- at least log the error. */

		console.log(e);
	}
}

export function init() {
	window.addEventListener('error', handleError);

	/*
	Only a few browsers currently support this event, but we may as well try.
	*/

	window.addEventListener('unhandledrejection', handleError);
}
