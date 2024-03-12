import {restart} from '../../actions';
import {InlineButton} from './inline-button';

/**
 * A link that restarts the story when clicked. Available as `<restart-link>`.
 */
export class RestartLink extends InlineButton {
	constructor() {
		super();
		this.addEventListener('click', restart);
	}
}
