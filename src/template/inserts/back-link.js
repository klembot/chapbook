/*
Renders a link to a passage or web page.
*/

import {renderLink} from '../render-links';
import {get} from '../../state';

export default {
	match: /^back\s+link/i,
	render(_, props) {
		const trail = get('trail');

		return renderLink(
			trail.length > 1 ? trail[trail.length - 2] : trail[0],
			props.label || 'Back'
		);
	}
};
