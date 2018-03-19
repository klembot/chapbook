import closest from 'closest';
import escape from 'lodash.escape';
import {Input} from './input';

class Link {
	static attachTo(el, onClick) {
		el.addEventListener('click', e => {
			const target = closest(e.target, '[data-cb-passage]', true);

			if (target) {
				const passage = target.dataset.cbPassage;

				if (passage) {
					Input.ifAllValid(() => onClick(passage));
				}
			}
		});
	}

	constructor(vars, label) {
		this.vars = vars;
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
			this.el.dataset.cbPassage = undefined;
		} else {
			this.el.setAttribute('href', 'javascript:void(0)');
			this.el.dataset.cbPassage = target;
		}

		return this;
	}

	back(count = 1) {
		const trail = this.vars.get('trail');

		if (count < trail.length - 1) {
			return this.to(trail[trail.length - count]);
		}

		return this.to(trail[0]);
	}

	restart() {
		this.el.dataset.cbPassage = undefined;
		this.el.setAttribute('href', 'javascript:restart(true)');
		return this;
	}

	toString() {
		return this.el.outerHTML;
	}
}

function createFactory(vars) {
	return (...args) => new Link(vars, ...args);
}

export {Link, createFactory};
