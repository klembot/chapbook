/*
In test mode, this causes console.warn() to display messages at the top of the
passage.
*/

import escape from 'lodash.escape';
import {get} from '../state';

export function init() {
	const nativeWarn = window.console.warn;

	console.warn = (...messages) => {
		if (get('config.testing')) {
			const container = document.querySelector('#page article div');

			messages.forEach(message => {
				const p = document.createElement('p');

				p.className = 'warning';
				p.innerHTML = `Warning: ${escape(message)}`;
				container.appendChild(p);
			});
		}

		nativeWarn.apply(window.console, messages);
	};
}
