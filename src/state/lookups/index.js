import initRandom from './random';
import initStoryName from './story-name';
import {setLookup} from '../index';

export default function init() {
	initRandom(setLookup);
	initStoryName(setLookup);
}
