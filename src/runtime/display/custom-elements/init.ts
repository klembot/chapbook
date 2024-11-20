import {defineElements} from '../../util/custom-element';
import {ErrorHandler} from './error-handler';
import {ExternalFonts} from './external-fonts';
import {PageSkip} from './page-skip';
import {PageSkipIndicator} from './page-skip-indicator';
import {PageTransition} from './page-transition';
import {StateCssVariables} from './state-css-variables';
import {StateDarkThemeCssOverrides} from './state-dark-theme-css-overrides';
import {WarningList} from './warning-list';

/**
 * Initializes custom elements related to display.
 */
export function initDisplayCustomElements() {
  defineElements({
    'error-handler': ErrorHandler,
    'external-fonts': ExternalFonts,
    'page-skip': PageSkip,
    'page-skip-indicator': PageSkipIndicator,
    'page-transition': PageTransition,
    'state-css-variables': StateCssVariables,
    'state-dark-theme-css-overrides': StateDarkThemeCssOverrides,
    'warning-list': WarningList
  });
}
