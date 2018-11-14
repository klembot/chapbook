/*
Manages keeping the DOM in sync with state, and manages bridging events in the
DOM with the engine.
*/

import coalesceCalls from '../util/coalesce-calls';
import event from '../event';
import {crossfade, fadeInOut, none} from './transitions';
import {get} from '../state';
import {init as initCrash} from './crash';
import {passageNamed} from '../story';
import {render} from '../template';
import './index.scss';

let mainContent, marginals;
const transitions = {crossfade, fadeInOut, none};

export const defaults = {
	'config.body.transition.name': 'crossfade',
	'config.body.transition.duration': '500ms',
	'config.header.left': '',
	'config.header.center': '',
	'config.header.right': '',
	'config.header.transition.name': 'none',
	'config.header.transition.duration': '500ms',
	'config.footer.left': '_{story.name}_',
	'config.footer.center': '',
	'config.footer.right': '{restart link}',
	'config.footer.transition.name': 'none',
	'config.footer.transition.duration': '500ms'
};

const updateDom = coalesceCalls(function update(calls) {
	/* Update the trail if we were ever passed a `true` argument. */

	if (calls.some(c => c[0])) {
		const trail = get('trail');
		const bodyTransition = get('config.body.transition.name');
		const passage = passageNamed(trail[trail.length - 1]);

		if (passage) {
			if (transitions[bodyTransition]) {
				transitions[bodyTransition](
					mainContent,
					render(passage.source),
					get('config.body.transition.duration')
				);
			} else {
				transitions.none(mainContent, render(passage.source));
			}
		} else {
			throw new Error(
				`There is no passage named "${trail[trail.length - 1]}".`
			);
		}
	}

	/*
	Always update header and footer, because we don't know what their contents
	may depend on.
	*/

	['header', 'footer'].forEach(m => {
		marginals[m].container.classList.remove('has-content');

		['left', 'center', 'right'].forEach(part => {
			const html = render(get(`config.${m}.${part}`));

			if (html !== '') {
				marginals[m].container.classList.add('has-content');
			}

			const marginalTransition = get(`config.${m}.transition.name`);

			if (transitions[marginalTransition]) {
				transitions[marginalTransition](
					marginals[m][part],
					html,
					get(`config.${m}.transition.duration`)
				);
			} else {
				transitions.none(marginals[m][part], html);
			}
		});
	});
});

export function init() {
	initCrash();
	mainContent = document.querySelector('#page article');
	marginals = {};

	['header', 'footer'].forEach(m => {
		marginals[m] = {container: document.querySelector(`#page ${m}`)};
		['left', 'center', 'right'].forEach(part => {
			marginals[m][part] = document.querySelector(`#page ${m} .${part}`);
		});
	});

	event.on('state-change', ({name, value}) => updateDom(name === 'trail'));

	/*
	Dispatch dom-change and dom-click events on elements with an attribute that
	starts with data-cb, e.g. <a href="javascript:void(0)" data-cb-go="My
	Passage">.
	*/

	['change', 'click'].forEach(eventType => {
		document.body.addEventListener(eventType, e => {
			let target = e.target;

			while (target) {
				if (target.dataset) {
					Object.keys(target.dataset).forEach(key => {
						if (/^cb[A-Z]/.test(key)) {
							event.emit(`dom-${e.type}`, target);
						}
					});
				}

				target = target.parentNode;
			}
		});
	});
}
