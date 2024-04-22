import {defineElements} from '../../util/custom-element';
import {BodyContent} from './body-content';
import {ErrorHandler} from './error-handler';
import {ExternalFonts} from './external-fonts';
import {MarginalContent} from './marginal-content';
import {PageSkip} from './page-skip';
import {PageSkipIndicator} from './page-skip-indicator';
import {StateCssVariables} from './state-css-variables';
import {StateDarkThemeCssOverrides} from './state-dark-theme-css-overrides';
import {WarningList} from './warning-list';

/**
 * Initializes custom elements related to display.
 */
export function initDisplayCustomElements() {
  defineElements({
    'body-content': BodyContent,
    'error-handler': ErrorHandler,
    'external-fonts': ExternalFonts,
    'marginal-content': MarginalContent,
    'page-skip': PageSkip,
    'page-skip-indicator': PageSkipIndicator,
    'state-css-variables': StateCssVariables,
    'state-dark-theme-css-overrides': StateDarkThemeCssOverrides,
    'warning-list': WarningList
  });
}
