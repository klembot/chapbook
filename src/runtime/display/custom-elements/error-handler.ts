import {get, purgeFromStorage, set} from '../../state';
import {startPassage} from '../../story';
import {CustomElement} from '../../util/custom-element';
import './error-handler.css';

/**
 * When an uncaught error occurs, this custom element replaces its content with
 * an error message allowing the user to try to remedy the situation. It's
 * available as `<error-handler>`.
 */
export class ErrorHandler extends CustomElement {
	constructor() {
		super();
		this.delegate('click', '[data-back]', () => {
			const trail = get('trail');

			this.classList.remove('active');

			if (Array.isArray(trail)) {
				set('trail', trail.slice(0, trail.length - 1));
			} else {
				window.alert(
					'Sorry, going back was not successful. Please try hard restarting.'
				);
			}
		});
		this.delegate('click', '[data-refresh]', () => {
			const trail = get('trail');

			this.classList.remove('active');

			if (Array.isArray(trail)) {
				set('trail', [...trail]);
			} else {
				set('trail', [startPassage()?.name]);
			}
		});
		this.delegate('click', '[data-hard-restart]', () => {
			purgeFromStorage(true);
			window.location.reload();
		});
	}

	connectedCallback() {
		window.addEventListener('error', this);
		window.addEventListener('unhandledrejection', this);
	}

	disconnectedCallback() {
		window.removeEventListener('error', this);
		window.removeEventListener('unhandledrejection', this);
	}

	handleEvent(event: ErrorEvent | PromiseRejectionEvent) {
		// Marked will blame itself if rendering has problems, but it probably is our
		// fault, so remove that pointer.

		const markedError =
			'\nPlease report this to https://github.com/markedjs/marked.';
		const error =
			event.type === 'unhandledrejection'
				? (event as PromiseRejectionEvent).reason
				: (event as ErrorEvent).error;

		try {
			let detail = '';

			if (error?.stack) {
				detail = `${error.message}\n\nStack trace:\n${error.stack}`;
			} else {
				detail = `${error.message}\n\n[No stack trace available]`;
			}

			detail = detail.replace(markedError, '');

			const trail = get('trail');

			this.classList.add('active');
			/* eslint-disable indent */
			this.innerHTML = `
			<p>
			An unexpected error has occurred.
			</p>
			<pre>${get('config.testing') ? detail : ''}</pre>
			<ul>
				<li>
					<inline-button class="link" ${
						Array.isArray(trail) && trail.length > 1
							? 'data-back'
							: 'data-refresh'
					}>Go back</inline-button> to the previous passage.
				</li>
				<li>
					<inline-button class="link" data-hard-restart>Hard restart</inline-button>, clearing all progress and beginning from the start.
				</li>
			</ul>
		`;
		} catch (error) {
			// Things have gotten really screwy--at least log the error.

			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
}
