// The top-level interface for template rendering.

import parse from './parse';
import renderParsed from './render';
import {get, set} from '../state';

export function render(source, ignoreVars = false) {
	return renderParsed(
		parse(source),
		get('config.template.modifiers') || [],
		set,
		ignoreVars
	);
}
