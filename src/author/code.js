/* An author function to render arbitrary code to HTML. */

import template from '../template';

export default function code(source) {
	return template.render(source);
}
