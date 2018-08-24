import initRandom from './random';
import initStoryName from './story-name';
import {setComputed} from '../index';

export default function init() {
	initRandom(setComputed);
	initStoryName(setComputed);
}
