/* Plays ambient sound. There can be only one active ambient sound. */

import {play} from '../../sound/ambient';

export default {
	match: /^ambient\s+sound/i,
	render(name, props) {
		play(name, props.volume || 1);
		return '';
	}
};
