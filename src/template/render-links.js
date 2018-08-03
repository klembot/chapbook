// Renders all Twine link formats into HTML links.

import link from '../author/link';

export default function renderLinks(source) {
	let result = source;

	// [[links]]

	result = result.replace(/\[\[(.*?)\]\]/g, (match, target) => {
		let label = target;

		// display|target format

		const barIndex = target.indexOf('|');

		if (barIndex !== -1) {
			label = target.substr(0, barIndex);
			target = target.substr(barIndex + 1);
		} else {
			// display->target format

			const rightArrIndex = target.indexOf('->');

			if (rightArrIndex !== -1) {
				label = target.substr(0, rightArrIndex);
				target = target.substr(rightArrIndex + 2);
			} else {
				// target<-display format

				const leftArrIndex = target.indexOf('<-');

				if (leftArrIndex !== -1) {
					label = target.substr(leftArrIndex + 2);
					target = target.substr(0, leftArrIndex);
				}
			}
		}

		return link.to(target, label);
	});

	return result;
}
