import {go, restart} from './actions';
import {init as initBackstage} from './backstage';
import {canRestoreFromStorage, get, restoreFromStorage} from './state';
import initComputed from './state/computed';
import initDefaults from './state/defaults';
import {init as initDisplay} from './display';
import {
	init as initStory,
	loadFromData,
	runCustomScripts,
	addCustomStyles
} from './story';
import {init as initStyle} from './style';
import './index.scss';

loadFromData(document.querySelector('tw-storydata'));
Object.assign(window, {go, restart});
initStyle();
initDefaults();
initComputed();
initDisplay();
initStory();

if (get('config.testing')) {
	initBackstage();
}

if (canRestoreFromStorage()) {
	restoreFromStorage();
}

addCustomStyles();
runCustomScripts();
