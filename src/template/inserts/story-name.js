/*
Renders the story name. This is an insert as opposed to a variable because the
story name cannot be changed.
*/

import {story} from '../../story';

export default {
	match: /^story\s+(name|title)/i,
	render() {
		return story.name;
	}
};
