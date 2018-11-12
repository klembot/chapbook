/*
Returns the story name. This is a computed variable because the story name is
read-only.
*/

import {name} from '../../story';

export default function init(setLookup) {
	setLookup('story.name', name);
}
