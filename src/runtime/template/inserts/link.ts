import {renderLink} from '../links';
import {Insert} from './types';

/**
 * Renders a link to a passage or external URL.
 */
export const link: Insert<{label?: string}> = {
	match: /^link\s+to/i,
	render(target, {label}) {
		if (!target) {
			return;
		}

		return renderLink(target, label);
	}
};

// Link click handling is proivded by ../links.
