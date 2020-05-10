/*
Handles errors that occur during play in release mode (e.g. not testing). If in
test mode, this displays error detail.

The goals here are to:

- notify the player that things have gone wrong
- give them some options to get things back on track if possible

Because other modules may have gotten in a bad state, this module needs to be
as self-sufficient as possible.
*/

import closest from 'closest';
import {get, set, purgeFromStorage} from '../state';

function handleError(error) {
	/*
	Marked will blame itself if rendering has problems, but it probably is our
	fault, so remove that pointer.
	*/

	const markedError = '\nPlease report this to https://github.com/chjj/marked.';

	try {
		let detail = '';

		if (error.error && error.error.stack) {
			detail = error.message + '\n\nStack trace:\n' + error.error.stack;
		} else {
			detail = error.message + '\n\n[No stack trace available]';
		}

		detail = detail.replace(markedError, '');

		const display = document.createElement('div');
		const container = document.querySelector('#page article');
		const trail = get('trail');

		display.className = 'error';
		/* eslint-disable indent */
		display.innerHTML = `
			<p>
			An unexpected error has occurred.
			</p>
			<pre>${get('config.testing') ? detail : ''}</pre>
			<ul>
				<li>
					<a href="javascript:void(0)" ${
						trail.length > 1 ? 'data-cb-back' : 'data-cb-refresh'
					}>Go back</a> to the previous passage.
				</li>
				<li>
					<a href="javascript:void(0)" data-cb-hard-restart>Hard restart</a>, clearing all progress and beginning from the start.
				</li>
			</ul>
		`;
		/* eslint-enable indent */

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

			const refreshLink = closest(e.target, '[data-cb-refresh]', true);

			if (refreshLink) {
				set('trail', [...get('trail')]);
				return;
			}

			const restartLink = closest(e.target, '[data-cb-hard-restart]', true);

			if (restartLink) {
				purgeFromStorage(true);
				window.location.reload();
			}
		});

		container.innerHTML = '';
		container.appendChild(display);
	} catch (e) {
		/* Things have gotten really screwy-- at least log the error. */

		// eslint-disable-next-line no-console
		console.error(e);
	}
}

export function init() {
	window.addEventListener('error', handleError);

	/*
	Only a few browsers currently support this event, but we may as well try.
	*/

	window.addEventListener('unhandledrejection', err => handleError(err.reason));
}
