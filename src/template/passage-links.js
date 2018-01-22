const closest = require('closest');
const escape = require('lodash.escape');

module.exports = {
	attachTo(el, onClick) {
		el.addEventListener('click', e => {
			const target = closest(e.target, '[data-cb-passage]', true);

			if (target) {
				const passage = target.dataset.cbPassage;

				if (passage) {
					onClick(passage);
				}
			}
		});
	},

	parse(source) {
		let result = source;

		/* [[links]] */

		result = result.replace(/\[\[(.*?)\]\]/g, (match, target) => {
			let display = target;

			/* display|target format */

			const barIndex = target.indexOf('|');

			if (barIndex !== -1) {
				display = target.substr(0, barIndex);
				target = target.substr(barIndex + 1);
			}
			else {
				/* display->target format */

				const rightArrIndex = target.indexOf('->');

				if (rightArrIndex !== -1) {
					display = target.substr(0, rightArrIndex);
					target = target.substr(rightArrIndex + 2);
				}
				else {
					/* target<-display format */

					const leftArrIndex = target.indexOf('<-');

					if (leftArrIndex !== -1) {
						display = target.substr(leftArrIndex + 2);
						target = target.substr(0, leftArrIndex);
					}
				}
			}

			/* Does this look like an external link? */

			if (/^\w+:\/\/\/?\w/i.test(target)) {
				return `<a href="${target}">${display}</a>`;
			}
			else {
				return `<a href="javascript:void(0)" data-cb-passage="${escape(target)}">${display}</a>`;
			}
		});

		return result;
	}
}