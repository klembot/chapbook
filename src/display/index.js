/*
Manages keeping the DOM in sync with state, and manages bridging events in the
DOM with the engine.

This module emits `dom-change` and `dom-click` events on any DOM element that is
changed (i.e. inputs) or clicked with any `data-cb-*` attribute.
*/

import coalesceCalls from '../util/coalesce-calls';
import event from '../event';
import {crossfade, fadeInOut, none} from './transitions';
import {get} from '../state';
import {init as initCrash} from './crash';
import {init as initWarnings} from './warnings';
import {passageNamed} from '../story';
import {render} from '../template';
import startSkipAnimation from './skip-animation';
import './index.scss';

let bodyContentEl, marginalEls, spinnerEl;
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

/* Runs a transition on a DOM element. */

function transitionContent(el, html, transition, duration) {
	if (transitions[transition]) {
		transitions[transition](el, html, duration);
	} else {
		transitions.none(el, html);
	}
}

const updateDom = coalesceCalls(function update(calls) {
	/*
	Update the body content if we were ever passed a `true` argument, meaning
	the trail has changed.
	*/

	if (calls.some(c => c[0])) {
		const trail = get('trail');
		const passage = passageNamed(trail[trail.length - 1]);

		if (passage) {
			transitionContent(
				bodyContentEl,
				render(passage.source),
				get('config.body.transition.name'),
				get('config.body.transition.duration')
			);

			startSkipAnimation(bodyContentEl, spinnerEl);
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
		marginalEls[m].container.classList.remove('has-content');

		['left', 'center', 'right'].forEach(part => {
			const html = render(get(`config.${m}.${part}`));

			if (html !== '') {
				marginalEls[m].container.classList.add('has-content');
			}

			transitionContent(
				marginalEls[m][part],
				html,
				get(`config.${m}.transition.name`),
				get(`config.${m}.transition.duration`)
			);
		});
	});
});

export function init() {
	initCrash();
	initWarnings();
	bodyContentEl = document.querySelector('#page article');
	spinnerEl = document.querySelector('#page #spinner');
	marginalEls = {};

	['header', 'footer'].forEach(m => {
		marginalEls[m] = {container: document.querySelector(`#page ${m}`)};
		['left', 'center', 'right'].forEach(part => {
			marginalEls[m][part] = document.querySelector(`#page ${m} .${part}`);
		});
	});

	event.on('state-change', ({name}) => updateDom(name === 'trail'));

	/*
	Dispatch dom-change and dom-click events on elements with an attribute that
	starts with data-cb, e.g. <a href="javascript:void(0)" data-cb-go="My
	Passage">.
	*/

	['change', 'click'].forEach(eventType => {
		document.body.addEventListener(eventType, e => {
			let target = e.target;

			while (target) {
				if (
					target.dataset &&
					Object.keys(target.dataset).some(key => /^cb[A-Z]/.test(key))
				) {
					event.emit(`dom-${e.type}`, target);
				}

				target = target.parentNode;
			}
		});
	});
}

/*
Applies a function to the current body content shown in the DOM using a
transition as specified in `config.body.transition`. This is provided so that we
can make live changes in the DOM that incorporate transitions, separate from a
passage being displayed.

Although this function works with DOM elements, the resulting output will be
coerced to HTML source code, meaning that any event handlers attached to
elements will be lost. Use `dom-change` and `dom-click` events instead.
*/

import {selectAll} from '../util/dom-select';

export function changeBody(callback) {
	/*
	Explicitly set all <input> and <select> values so that are reflected in
	innerHTML.
	*/

	selectAll(bodyContentEl, 'input').forEach(el => {
		el.setAttribute('value', el.value);
	});

	selectAll(bodyContentEl, 'select').forEach(el => {
		for (let i = 0; i < el.options.length; i++) {
			if (i === el.options.selectedIndex) {
				el.options[i].setAttribute('selected', '');
			} else {
				el.options[i].removeAttribute('selected');
			}
		}
	});

	/*
	Clone the current DOM node, but hand off the original to the callback. This
	is so that if the callback is processing something based on an event, it is
	able to find that event's target in what it's given.
	*/

	const originalScroll = {x: window.scrollX, y: window.scrollY};
	const originalHtml = bodyContentEl.innerHTML;
	const workingEl = document.createElement('div');

	while (bodyContentEl.firstChild) {
		workingEl.insertBefore(bodyContentEl.firstChild, workingEl.firstChild);
	}

	bodyContentEl.innerHTML = originalHtml;
	callback(workingEl);

	window.scrollX = originalScroll.x;
	window.scrollY = originalScroll.y;

	transitionContent(
		bodyContentEl,
		workingEl.innerHTML,
		get('config.body.transition.name'),
		get('config.body.transition.duration')
	);
}
