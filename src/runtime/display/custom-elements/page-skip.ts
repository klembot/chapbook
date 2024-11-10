import './page-skip.css';

/**
 * Manages allowing the user to skip forward in time (right now, just past
 * delayed content). It listens to `body-content-change` events dispatched by
 * children to do this, so the body content element should be a child of this.
 */
export class PageSkip extends HTMLElement {
	constructor() {
		super();
		this.addEventListener('body-content-change', this);
	}

	handleEvent({target}: CustomEvent) {
		if (!target) {
			return;
		}

		const elList = [
			...(target as HTMLElement).querySelectorAll('[skippable-delay]')
		]
			.map(el => {
				const result = {delay: 0, el: el as HTMLElement};

				try {
					result.delay = parseInt(
						(el as HTMLElement).getAttribute('skippable-delay') ?? '0'
					);
				} catch (error) {
					// Treat it as though it has a 0 delay.
				}

				return result;
			})
			.filter(({delay}) => !!delay)
			.sort((a, b) => a.delay - b.delay);

		if (elList.length === 0) {
			return;
		}

		let start = Date.now();
		let finishTimeout: number;

		const skip = () => {
			const elapsed = Date.now() - start;

			// Find the shortest delay of the elements that haven't been triggered
			// yet. We can use find() here because the array is sorted.

			const skipTo = elList.find(({delay}) => delay > elapsed)?.delay;

			// Just in case--shouldn't occur.

			if (!skipTo) {
				this.dispatchEvent(new CustomEvent('page-skip-indicator-hide'));
				return;
			}

			// Either mark elements as skipped, or lower their animation delay.

			for (const item of elList) {
				if (item.delay <= 0) {
					// Don't do anything to elements that we've manually transitioned in.

					continue;
				}

				if (item.delay <= skipTo) {
					item.delay = 0;
					item.el.setAttribute('skippable-delay', '0');
				} else {
					item.delay -= skipTo;
					item.el.setAttribute('skippable-delay', item.delay.toString());
				}
			}

			// Reset the elapsed time so that the next we skip, it only skips from now
			// until the next skip.

			start = Date.now();

			// Reset the finish timeout. If we just skipped everything, then that
			// function will set a timeout of 0 milliseconds to run finish().

			window.clearTimeout(finishTimeout);
			setFinishTimeout();
		};

		const setFinishTimeout = () => {
			if (finishTimeout) {
				window.clearTimeout(finishTimeout);
			}

			finishTimeout = window.setTimeout(() => {
				window.removeEventListener('click', skip);
				window.removeEventListener('keyup', skip);

				this.dispatchEvent(new CustomEvent('page-skip-indicator-hide'));
			}, elList[elList.length - 1].delay);
		};

		window.addEventListener('click', skip);
		window.addEventListener('keyup', skip);
		setFinishTimeout();
		this.dispatchEvent(new CustomEvent('page-skip-indicator-show'));
	}
}
