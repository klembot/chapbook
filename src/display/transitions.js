import timestring from 'timestring';
import {selectAll} from '../util/dom-select';
import './transitions.scss';

function forceNewStackingContext(el) {
	if (window.getComputedStyle(el).position === 'static') {
		el.style.position = 'relative';
	}
}

function shallowCloneContents(el) {
	const result = document.createElement(el.nodeName.toLowerCase());

	result.innerHTML = el.innerHTML;
	result.style.width = el.clientWidth + 'px';
	result.style.height = el.clientHeight + 'px';
	result.setAttribute('aria-hidden', true);
	result.style.pointerEvents = 'none';

	/* Remove <audio> elements so they don't play. */

	selectAll(result, 'audio').forEach(el => el.parentNode.removeChild(el));

	return result;
}

export function none(el, html) {
	return new Promise(resolve => {
		el.innerHTML = `<div>${html}</div>`;
		resolve();
	});
}

export function fadeInOut(el, html, duration) {
	return new Promise(resolve => {
		forceNewStackingContext(el);

		const stepDuration = timestring(duration, 's') / 2;

		/* Add the new content, but keep it hidden at first. */

		const inEl = document.createElement('div');

		inEl.innerHTML = html;
		inEl.style.visibility = 'hidden';
		inEl.style.animationDuration = stepDuration + 's';

		inEl.addEventListener('animationend', function complete() {
			inEl.removeEventListener('animationend', complete);
			inEl.className = '';
			inEl.style.animationDuration = stepDuration + 's';
			resolve();
		});

		/* Fade out existing content if any is present. */

		if (el.innerHTML.trim() !== '') {
			const outEl = shallowCloneContents(el);

			outEl.style.position = 'absolute';
			outEl.style.top = '0';
			outEl.style.left = '0';
			outEl.className = 'fade-out';
			outEl.style.animationDuration = stepDuration + 's';
			outEl.addEventListener('animationend', function removeOut() {
				outEl.removeEventListener('animationend', removeOut);
				outEl.parentNode.removeChild(outEl);
				inEl.style.visibility = 'visible';
				inEl.className = 'fade-in';
			});

			el.innerHTML = '';
			el.appendChild(inEl);
			el.appendChild(outEl);
		} else {
			/* There's no outgoing content, so our fade is twice as slow. */

			inEl.className = 'fade-in';
			inEl.animationDuration = stepDuration * 2;
			inEl.style.visibility = 'visible';
			inEl.className = 'fade-in';
			el.appendChild(inEl);
		}
	});
}

export function crossfade(el, html, duration) {
	return new Promise(resolve => {
		forceNewStackingContext(el);

		const stepDuration = timestring(duration, 's');

		/* Add the new content. */

		const inEl = document.createElement('div');

		inEl.innerHTML = html;
		inEl.className = 'fade-in';
		inEl.style.animationDuration = stepDuration + 's';

		inEl.addEventListener('animationend', function complete() {
			inEl.removeEventListener('animationend', complete);
			inEl.style.animationDuration = null;
			inEl.className = '';
			resolve();
		});

		/* Fade out existing content if any is present. */

		if (el.innerHTML.trim() !== '') {
			const outEl = shallowCloneContents(el);

			outEl.style.position = 'absolute';
			outEl.style.top = '0';
			outEl.style.left = '0';

			/*
			FIXME: this doesn't properly handle an element that is centered and
			is changing width.
			*/

			outEl.className = 'fade-out';
			outEl.style.animationDuration = stepDuration + 's';
			outEl.addEventListener('animationend', function removeOut() {
				outEl.removeEventListener('animationend', removeOut);
				outEl.style.opacity = 0.5;
				outEl.parentNode.removeChild(outEl);
			});

			el.innerHTML = '';
			el.appendChild(inEl);
			el.appendChild(outEl);
		} else {
			el.innerHTML = '';
			el.appendChild(inEl);
		}
	});
}
