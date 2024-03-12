import {get, set} from '../../state';
import {Insert} from './types';

/**
 * Plays ambient sound. There can be only one active ambient sound.
 */
export const ambientSound: Insert = {
	match: /^(no )?ambient\s+sound/i,
	render(name, {volume}) {
		const ambients = get('sound.ambient') as Record<
			string,
			Record<string, unknown>
		>;

		// Stop any other playing ambient.

		if (ambients) {
			for (const ambientName in ambients) {
				if (ambientName !== name && ambients[ambientName].playing) {
					set(`sound.ambient.${ambientName}.playing`, false);
				}
			}
		}

		if (!name) {
			return;
		}

		const description = get(`sound.ambient.${name}.description`) ?? '';

		if (volume) {
			set(`sound.ambient.${name}.volume`, volume);
		}

		set(`sound.ambient.${name}.playing`, true);
		return `<audio>${description}</audio>`;
	}
};
