/*
Renders a link to a passage or web page.
*/

import {renderLink} from '../render-links';

export default {
	match: /^link\s+to/i,
	render(target, props) {
		return renderLink(target, props.label);
	}
};
