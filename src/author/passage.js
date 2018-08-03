// Author functions for working with passages. These are functions to make it
// explicit that the values are read-only, because changes could not be
// persisted-- we'd have to store the entire story in state, which is cumbersome
// and impossible for especially large stories, given that state is always
// persisted to local storage.

import {passages} from '../story';
import {render} from '../template';

function retrievePassage(name) {
	return passages.find(p => p.name === name);
}

export default {
	render(name) {
		return render(passage.source(name));
	},

	source(name) {
		return retrievePassage(name).source;
	},

	tags(name) {
		return retrievePassage(name).tags;
	}
};
