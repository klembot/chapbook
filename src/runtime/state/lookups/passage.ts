import {createLoggers} from '../../logger';
import {get, setLookup} from '../state';

const {warn} = createLoggers('lookups');

/**
 * Initializes all lookups related to the current passage.
 */
export function initPassageLookups() {
	setLookup('passage.name', () => {
		const trail = get('trail');

		if (!Array.isArray(trail)) {
			warn(
				`The trail variable has been set to a ${typeof trail}, not an array.`
			);
			return undefined;
		}

		return trail[trail.length - 1];
	});

	setLookup('passage.visits', () => {
		const trail = get('trail');
		const passageName = get('passage.name');

		if (Array.isArray(trail)) {
			return trail.reduce(
				(result, current) => (current === passageName ? result + 1 : result),
				0
			);
		}

		warn(`The trail variable has been set to a ${typeof trail}, not an array.`);
		return 0;
	});
}
