// Manages keeping the DOM in sync with state, and manages bridging events in
// the DOM with the engine.
//
// This supports hooks via the following attributes:
// - `data-cb-go`: calls go() on the passage in the attribute when the element
//   is clicked.
// - `data-cb-restart: calls restart() when the element is clicked.
// - `data-cb-cycle`: cycles the inner text of the element between the values
//   listed in the attribute when the element is clicked. The attribute must be
//   a JSON-encoded array.

import closest from 'closest';
import event from '../event';
import {get} from '../state';
import {go, restart} from '../author/actions';
import {passageNamed} from '../story';
import {render} from '../template';
import {validate} from './inputs';

let mainContent, marginals;

export const defaults = {
	'config.header.left': '',
	'config.header.center': '',
	'config.header.right': '',
	'config.footer.left': '_`story.name()`_',
	'config.footer.center': '',
	'config.footer.right': "`link('Restart').restart()`"
};

function attachDomListeners(el) {
	el.addEventListener('click', e => {
		// Order is important below, so that if an element both cycles and goes,
		// the value it sets before leaving the passage is accurate.

		const cycleLink = closest(e.target, '[data-cb-cycle]', true);

		if (cycleLink) {
			const choices = JSON.parse(cycleLink.dataset.cycle);
			const index = choices.indexOf(cycleLink.textContent) + 1;

			if (index === choices.length) {
				index = 0;
			}

			cycleLink.textContent = choices[index];
		}

		const goLink = closest(e.target, '[data-cb-go]', true);

		if (goLink) {
			validate().then(() => go(goLink.dataset.cbGo));
		}

		const restartLink = closest(e.target, '[data-cb-restart]', true);

		if (restartLink) {
			restart();
		}
	});
}

export function init() {
	mainContent = document.querySelector('#page article');
	marginals = {};

	['header', 'footer'].forEach(m => {
		marginals[m] = {container: document.querySelector(`#page ${m}`)};
		['left', 'center', 'right'].forEach(part => {
			marginals[m][part] = document.querySelector(`#page ${m} .${part}`);
		});
	});

	attachDomListeners(document.body);

	event.on('state-change', ({name, value}) => {
		// Update the main content when the current passage has changed.

		if (name === 'trail') {
			mainContent.innerHTML = render(
				passageNamed(value[value.length - 1]).source
			);
		}

		// Always update header and footer, because we don't know what their
		// contents may depend on.

		['header', 'footer'].forEach(m => {
			marginals[m].container.classList.remove('has-content');

			['left', 'center', 'right'].forEach(part => {
				const html = render(get(`config.${m}.${part}`));

				if (html !== '') {
					marginals[m].container.classList.add('has-content');
				}

				marginals[m][part].innerHTML = html;
			});
		});
	});
}
