/* Plays a sound effect. */

import {effectHtml} from '../../sound/effect';

export default {
	match: /^sound\s+effect/i,
	render(name) {
		return effectHtml(name);
	}
};
