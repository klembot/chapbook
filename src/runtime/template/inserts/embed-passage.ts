import {passageNamed} from '../../story';
import {render as mainRender} from '../index';

/**
 * Embeds a rendered passage.
 */
export const embedPassage = {
	match: /^embed\s+passage(\s+named)?/i,
	render(passageName: string | null) {
		if (!passageName) {
			return '';
		}

		const passage = passageNamed(passageName);

		if (!passage) {
			return '';
		}

		return mainRender(passage.source);
	}
};
