// The top-level interface for template rendering.

import inserts from './inserts';
import modifiers from './modifiers';
import parse from './parse';
import renderParsed from './render';
import {get} from '../state';

export const defaults = {
	'config.template.inserts': inserts,
	'config.template.modifiers': modifiers
};

export function render(source, ignoreVars = false) {
	return renderParsed(
		parse(source),
		get('config.template.inserts') || [],
		get('config.template.modifiers') || [],
		ignoreVars
	);
}
