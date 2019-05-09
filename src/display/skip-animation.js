/*
This handles allowing the player to skip over any CSS animations present in an
element by either clicking or pressing a key.
*/

import timestring from 'timestring';
import {selectAll} from '../util/dom-select';

export default function startSkipAnimation(el, spinEl) {
	// TODO: add module for skipping CSS animations, compute max delay, make
	// spinner go away after that apply .skip-animation class when click or
	// keypress occurs

	let start = Date.now();
	let finishTimeout;

	const list = selectAll(el, '[data-cb-skippable]')
		.map(e => ({
			el: e,
			delay: timestring(window.getComputedStyle(e).animationDelay) * 1000
		}))
		.sort((a, b) => a.delay - b.delay);

	if (list.length === 0) {
		return;
	}

	function skip() {
		const elapsed = Date.now() - start;

		/*
		Find the first element that hasn't triggered yet, then trigger it. We
		make a copy of the entry so we don't affect this variable in the
		forEach() below.
		*/

		const skipTo = Object.assign(
			{},
			list.find(item => item.delay > elapsed)
		);

		/* Just in case-- shouldn't occur. */

		if (!skipTo) {
			finish();
			return;
		}

		/* Either mark elements as skipped, or lower their animation delay. */

		list.forEach(item => {
			if (item.delay <= skipTo.delay) {
				item.delay = 0;
				item.el.classList.add('skip-animation');
			} else {
				item.delay -= skipTo.delay;
				item.el.style.animationDelay = `${item.delay}ms`;
			}
		});

		/*
		Reset the elapsed time so that the next we skip, it only skips from now
		until the next skip.
		*/

		start = Date.now();

		/*
		Reset the finish timeout. If we just skipped everything, then that
		function will set a timeout of 0 milliseconds to run finish().
		*/

		window.clearTimeout(finishTimeout);
		setFinishTimeout();
	}

	function setFinishTimeout() {
		if (finishTimeout) {
			window.clearTimeout(finishTimeout);
		}

		finishTimeout = window.setTimeout(finish, list[list.length - 1].delay);
	}

	function finish() {
		spinEl.classList.remove('visible');
		document.body.removeEventListener('click', skip);
		document.body.removeEventListener('keyup', skip);
	}

	spinEl.classList.add('visible');
	setFinishTimeout();

	/*
	Delay this slightly so that there's less chance the player will accidentally
	trigger it.
	*/

	window.setTimeout(() => {
		document.body.addEventListener('click', skip);
		document.body.addEventListener('keyup', skip);
	}, 50);
}
