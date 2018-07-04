// Author-level access to the story as authored in Twine.

import {story} from '../story';

export default {
	name() {
		return story.name;
	}
};
