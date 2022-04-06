/* Plays a sound effect. */

import {get, set} from '../../state';

export default {
	match: /^sound\s+effect/i,
	render(name, props) {
		const description = get(`sound.effect.${name}.description`) || '';

		if (props.volume) {
			set(`sound.effect.${name}.volume`, props.volume);
		}

		set(`sound.effect.${name}.playing`, true);
		return `<audio>${description}</audio>`;
	}
};
