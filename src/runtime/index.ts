import {go, restart} from './actions';
import {initBackstage} from './backstage';
import {initDisplay} from './display';
import {initExtensibility} from './extensibility';
import {initLoggerState, loggerDefaults} from './logger';
import {initSound} from './sound';
import {
	canRestoreFromStorage,
	get,
	initState,
	restoreFromStorage,
	setDefaults
} from './state';
import {initLookups} from './state/lookups';
import {
  addCustomStyles,
  initStory,
  loadFromData,
  runCustomScripts
} from './story';
import {initStyle} from './style';
import {initTemplate} from './template';

/**
 * Does all initialization of the engine. This function is called when the page
 * first loads.
 */
export function init() {
  const data = document.querySelectorAll('tw-storydata');

  if (data.length === 0) {
    console.warn('No <tw-storydata> element was found in HTML.');
    return;
  }

  if (data.length > 1) {
    console.warn(
      'Multiple <tw-storydata> elements were found in HTML. Using the first.'
    );
  }

  loadFromData(data[0] as HTMLElement);
  initExtensibility();
  initState();
  Object.assign(window, {go, restart});

  // Logger-related init is here to avoid a circular dependency between state
  // and logger.

  initLoggerState();
  setDefaults(loggerDefaults);
  initDisplay();
  initStyle();
  initTemplate();
  initLookups();
  initSound();
  initStory();

  if (get('config.testing')) {
    initBackstage();
  } else {
    if (canRestoreFromStorage()) {
      restoreFromStorage();
    }
  }

  // Run story custom code last.

  addCustomStyles();
  runCustomScripts();
}

init();
