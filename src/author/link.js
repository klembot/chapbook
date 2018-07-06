// Author functions for creating links.

import factoryFor from '../util/class-factory';
import {get} from '../state';
import {Input} from './input';

export class Link {
	constructor(label) {
		this.el = document.createElement('a');

		if (label) {
			this.labelled(label);
		}
	}

	labelled(label) {
		this.el.innerHTML = '';
		this.el.appendChild(document.createTextNode(label));
		return this;
	}

	to(target) {
		/* Does this look like an external link? */

		if (/^\w+:\/\/\/?\w/i.test(target)) {
			this.el.setAttribute('href', target);
			this.el.dataset.cbGo = undefined;
		} else {
			this.el.setAttribute('href', `javascript:void(0)`);
			this.el.dataset.cbGo = target;
		}

		return this;
	}

	back(count = 1) {
		const trail = get('trail');

		if (count < trail.length - 1) {
			return this.to(trail[trail.length - count]);
		}

		return this.to(trail[0]);
	}

	restart() {
		this.el.setAttribute('href', 'javascript:void(0)');
		this.el.dataset.cbRestart = '';
		return this;
	}

	toString() {
		return this.el.outerHTML;
	}
}

export default factoryFor(Link);
