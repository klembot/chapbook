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

	setLookup('passage.previous.name', () => {
		const trail = get('trail');

		if (trail) {
			return trail[trail.length - 2];
		}

		return undefined;
	});

	setLookup('passage.previous.visits', () => {
		const trail = get('trail');

		if (trail) {
			if (trail.length < 2) {
				return 0;
			}

			const prevPassageName = trail[trail.length - 2];

			return trail.reduce(
				(result, current) => (current === prevPassageName ? result + 1 : result),
				0
			);
		}

		return undefined;
	});
}
