import closest from 'closest';
import escape from 'lodash.escape';

class Link {
	static addPassageListener(el, onClick) {
		el.addEventListener('click', e => {
			const target = closest(e.target, '[data-cb-passage]', true);
	
			if (target) {
				const passage = target.dataset.cbPassage;
	
				if (passage) {
					onClick(passage);
				}
			}
		});
	}

	constructor(label) {
		this.label = label;
	}

	labelled(label) {
		this.label = label;
		return this;
	}

	to(target) {
		this.target = target;

		/* Does this look like an external link? */

		if (/^\w+:\/\/\/?\w/i.test(target)) {
			this.type = 'url';
		}
		else {
			this.type = 'passage';
		}

		return this;
	}

	restart() {
		this.type = 'url';
		this.target = 'javascript:restart()';
		return this;
	}

	toString() {
		switch (this.type) {
			case 'url':
				return `<a href="${escape(this.target)}">${this.label}</a>`;
			
			case 'passage':
				return `<a href="javascript:void(0)" data-cb-passage="${escape(this.target)}">${this.label}</a>`;

			default:
				throw new Error(`Don't know how to render links with type "${this.type}".`);
		}
	}
}

function factory(...args) {
	return new Link(...args);
}

export {Link, factory};