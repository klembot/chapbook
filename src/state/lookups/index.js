import initBrowser from './browser';
import initNow from './now';
import initRandom from './random';
import initStoryName from './story-name';
import {setLookup} from '../index';

export default function init() {
	initNow(setLookup);
	initRandom(setLookup);
	initStoryName(setLookup);
}
