import {initBrowserLookups} from './browser';
import {initEngineLookups} from './engine';
import {initNowLookups} from './now';
import {initPassageLookups} from './passage';
import {initRandomLookups} from './random';
import {initStoryLookups} from './story';

/**
 * Initializes all lookups.
 */
export function initLookups() {
	initBrowserLookups();
	initEngineLookups();
	initNowLookups();
	initPassageLookups();
	initRandomLookups();
	initStoryLookups();
}
