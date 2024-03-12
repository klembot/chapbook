import {htmlify} from '../util';

/**
 * Renders a single link to HTML.
 */
export function renderLink(target: string, label?: string) {
	// Does the target look like an external link?

	if (/^\w+:\/\/\/?\w/i.test(target)) {
		return htmlify('a', {class: 'link', href: target}, [label ?? target]);
	}

	// We'll treat it as a passage link if not.

	return htmlify('passage-link', {class: 'link', to: target}, [
		label ?? target
	]);
}

/**
 * Renders all Twine link formats into HTML links.
 */
export function renderLinks(source: string) {
	return source.replace(
		/\[\[(.*?)\]\]/g,
		(originalSource: string, target: string) => {
			let label = target;

			// display|target format

			const barIndex = target.indexOf('|');

			if (barIndex !== -1) {
				label = target.substring(0, barIndex);
				target = target.substring(barIndex + 1);
			} else {
				// display->target format

				const rightArrIndex = target.indexOf('->');

				if (rightArrIndex !== -1) {
					label = target.substring(0, rightArrIndex);
					target = target.substring(rightArrIndex + 2);
				} else {
					// target<-display format

					const leftArrIndex = target.indexOf('<-');

					if (leftArrIndex !== -1) {
						label = target.substring(leftArrIndex + 2);
						target = target.substring(0, leftArrIndex);
					}
				}
			}

			// If the target or label is an empty string, don't process it.

			if (label === '' || target === '') {
				return originalSource;
			}

			return renderLink(target, label ?? target);
		}
	);
}
