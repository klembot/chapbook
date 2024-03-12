import {all as allInserts} from './inserts';
import {all as allModifiers} from './modifiers';
import {parse} from './parse';
import {renderParsed} from './render-parsed';

/**
 * Top-level interface for template rendering.
 * @param source - source to render
 * @param ignoreVars - don't set variables?
 */
export function render(source: string, ignoreVars = false) {
	return renderParsed(parse(source), allInserts(), allModifiers(), ignoreVars);
}
