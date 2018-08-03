// Author functions for creating links.

import {get} from '../state';

function createLink(label, attrs, data) {
	const result = document.createElement('a');

	result.appendChild(document.createTextNode(label));

	if (attrs) {
		Object.keys(attrs).forEach(k => result.setAttribute(k, attrs[k]));
	}

	if (data) {
		Object.keys(data).forEach(k => (result.dataset[k] = data[k]));
	}

	return result.outerHTML;
}

export default {
	to(target, label) {
		// If the target is a negative number, then go back that many steps in
		// the trail.

		if (target < 0) {
			const trail = get('trail');
			const passage = trail[Math.max(trail.length + target, 0)];

			return createLink(
				label || passage,
				{href: 'javascript:void(0)'},
				{cbGo: passage}
			);
		}

		// Does the target look like an external link?

		if (/^\w+:\/\/\/?\w/i.test(target)) {
			return createLink(label || target, {href: target});
		}

		// We'll treat it as an internal one if not.

		return createLink(
			label || target,
			{href: 'javascript:void(0)'},
			{cbGo: target}
		);
	},

	thatRestarts(label = 'Restart') {
		return createLink(label, {href: 'javascript:void(0)'}, {cbRestart: ''});
	}
};
