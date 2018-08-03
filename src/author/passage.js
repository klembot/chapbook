// Author functions for working with passages.

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
