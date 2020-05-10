/* Plays ambient sound. There can be only one active ambient sound. */

import {get, set} from '../../state';

export default {
	match: /^(no )?ambient\s+sound/i,
	render(name, props) {
		const ambients = get('sound.ambient');

		Object.keys(ambients).forEach(ambientName => {
			if (ambientName !== name && ambients[ambientName].playing) {
				set(`sound.ambient.${ambientName}.playing`, false);
			}
		});

		if (!name) {
			return;
		}

		const description = get(`sound.ambient.${name}.description`) || '';

		if (props.volume) {
			set(`sound.ambient.${name}.volume`, props.volume);
		}

		set(`sound.ambient.${name}.playing`, true);
		return `<audio>${description}</audio>`;
	}
};
