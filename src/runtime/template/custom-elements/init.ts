import {defineElements} from '../../util/custom-element';
import {CyclingLink} from './cycling-link';
import {InlineButton} from './inline-button';
import {PassageLink} from './passage-link';
import {RestartLink} from './restart-link';
import {RevealLink} from './reveal-link';
import {SkippableAnimation} from './skippable-animation';
import {VariableBinding} from './variable-binding';

export function initTemplateCustomElements() {
	defineElements({
		'cycling-link': CyclingLink,
		'inline-button': InlineButton,
		'passage-link': PassageLink,
		'restart-link': RestartLink,
		'reveal-link': RevealLink,
		'skippable-animation': SkippableAnimation,
		'variable-binding': VariableBinding
	});
}
