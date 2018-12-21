/* Plays a sound effect. */

import {effectHtml} from '../../sound/effect';

export default {
	match: /^sound\s+effect/i,
	render(name, props) {
		return effectHtml(name, props.volume || 1);
	}
};
