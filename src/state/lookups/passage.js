/*
Returns various properties about the current passage.
*/

import {get} from '../index';

export default function init(setLookup) {
	setLookup('passage.name', () => {
		const trail = get('trail');

		if (trail) {
			return trail[trail.length - 1];
		}

		return undefined;
	});

	setLookup('passage.visits', () => {
		const trail = get('trail');
		const passageName = get('passage.name');

		if (trail) {
			return trail.reduce(
				(result, current) => (current === passageName ? result + 1 : result),
				0
			);
		}

		return undefined;
	});

	setLookup('passage.previous', () => {
		const trail = get('trail');

		if (trail) {
			return trail[trail.length - 2];
		}

		return undefined;
	});
}
