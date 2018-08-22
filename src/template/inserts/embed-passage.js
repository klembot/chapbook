/*
Embeds a rendered passage.
*/

import {passages} from '../../story';
import {render as mainRender} from '../index';

export default {
	match: /^embed\s+passage(\s+named)?/i,
	render(passageName) {
		return mainRender(passages.find(p => p.name === passageName).source);
	}
};
