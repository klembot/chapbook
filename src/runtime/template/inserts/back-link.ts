import {renderLink} from '../links';
import {get} from '../../state';
import {Insert} from './types';

/**
 * A link that goes back one entry in the history.
 */
export const backLink: Insert<{label?: string}> = {
	match: /^back\s+link/i,
	render(_, props) {
		const trail = get('trail');

		// If trail looks malformed, don't do anything. We should always have at
		// least one entry in trail, the current passage.

		if (!Array.isArray(trail) || trail.length === 0) {
			return;
		}

		return renderLink(
			trail.length > 1 ? trail[trail.length - 2] : trail[0],
			props.label ?? 'Back'
		);
	}
};
