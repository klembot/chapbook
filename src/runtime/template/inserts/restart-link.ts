import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * Renders a link that restarts the story.
 */
export const restartLink: Insert<{label?: string}> = {
	match: /^restart\s+link/i,
	render(_, {label}) {
		return htmlify('restart-link', {class: 'link'}, [label ?? 'Restart']);
	}
};
