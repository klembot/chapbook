import {get, set} from '../../state';
import {Insert} from './types';

/**
 * Causes a sound effect to play.
 */
export const soundEffect: Insert = {
	match: /^sound\s+effect/i,
	render(name, {volume}) {
		const description = get(`sound.effect.${name}.description`) ?? '';

		if (volume) {
			set(`sound.effect.${name}.volume`, volume);
		}

		set(`sound.effect.${name}.playing`, true);
		return `<audio>${description}</audio>`;
	}
};
