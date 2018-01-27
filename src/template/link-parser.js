import escape from 'lodash.escape';
import {Link} from '../link';

export default function(source) {
	let result = source;

	/* [[links]] */

	result = result.replace(/\[\[(.*?)\]\]/g, (match, target) => {
		let label = target;

		/* display|target format */

		const barIndex = target.indexOf('|');

		if (barIndex !== -1) {
			label = target.substr(0, barIndex);
			target = target.substr(barIndex + 1);
		}
		else {
			/* display->target format */

			const rightArrIndex = target.indexOf('->');

			if (rightArrIndex !== -1) {
				label = target.substr(0, rightArrIndex);
				target = target.substr(rightArrIndex + 2);
			}
			else {
				/* target<-display format */

				const leftArrIndex = target.indexOf('<-');

				if (leftArrIndex !== -1) {
					label = target.substr(leftArrIndex + 2);
					target = target.substr(0, leftArrIndex);
				}
			}
		}

		return new Link(label).to(target).toString();
	});

	return result;
};