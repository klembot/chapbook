/*
Embeds a rendered passage.
*/

import {passageNamed} from '../../story';
import {render as mainRender} from '../index';

export default {
	match: /^embed\s+passage(\s+named)?/i,
	render(passageName) {
		return mainRender(passageNamed(passageName).source);
	}
};
