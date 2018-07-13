import authorFunctions from './author';
import {init as initBackstage} from './backstage';
import {canRestore, get, restore} from './state';
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
Object.assign(window, authorFunctions);
initStyle();
initDefaults();
initDisplay();
initStory();

if (get('config.testing')) {
	console.log('initing backstage');
	initBackstage();
}

if (canRestore()) {
	restore();
}

addCustomStyles();
runCustomScripts();
