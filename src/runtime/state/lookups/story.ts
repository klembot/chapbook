import {name} from '../../story';
import {setLookup} from '../state';

/**
 * Initializes all lookups related to the story.
 */
export function initStoryLookups() {
	setLookup('story.name', name);
}
