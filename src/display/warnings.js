/*
In test mode, this causes console.warn() to display messages at the top of the
passage.
*/

import escape from 'lodash.escape';
import {get} from '../state';
import event from '../event';
import './warnings.css';

export function init() {
	const nativeWarn = window.console.warn;
	const container = document.querySelector('#page .warnings');

	console.warn = (...messages) => {
		if (get('config.testing')) {
			try {
				container.removeAttribute('hidden');
				messages.forEach(message => {
					const li = document.createElement('li');

					li.className = 'warning';
					li.innerHTML = `Warning: ${escape(message)}`;
					container.appendChild(li);
				});
			} catch (err) {
				/* Fail silently-- it'll still appear in the browser console. */
			}
		}

		nativeWarn.apply(window.console, messages);
	};

	event.on('state-change', ({name}) => {
		if (name === 'trail') {
			container.setAttribute('hidden', '');
			container.innerHTML = '';
		}
	});
}
