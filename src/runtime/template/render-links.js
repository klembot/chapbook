// Renders all Twine link formats into HTML links.

import htmlify from '../util/htmlify';

export function renderLink(target, label) {
	// Does the target look like an external link?

	if (/^\w+:\/\/\/?\w/i.test(target)) {
		return htmlify(
			'a',
			{
				href: target
			},
			[label || target]
		);
	}

	// We'll treat it as an internal one if not.

	return htmlify(
		'a',
		{
			href: 'javascript:void(0)',
			'data-cb-go': target
		},
		[label || target]
	);
}

export default function renderLinks(source) {
	return source.replace(/\[\[(.*?)\]\]/g, (_, target) => {
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

		return renderLink(target, label || target);
	});
}
