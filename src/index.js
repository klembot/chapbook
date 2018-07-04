import authorFunctions from './author';
import {canRestore, restore, set} from './state';
import initDefaults from './state/defaults';
import {init as initDisplay} from './display';
import {init as initStory, loadFromData, passageNamed, story} from './story';
import {init as initStyle} from './style';
import './index.scss';

loadFromData(document.querySelector('tw-storydata'));
Object.assign(window, authorFunctions);
initStyle();
initDefaults();
initDisplay();
initStory();

if (canRestore()) {
	restore();
}
