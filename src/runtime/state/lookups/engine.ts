import {version} from '../../../../package.json';
import {setLookup} from '../state';

/**
 * Initializes engine-related lookups.
 */
export function initEngineLookups() {
	setLookup('engine.version', () => version);
}
