import {defineElements} from '../../util/custom-element';
import {BackstageSidebar} from './backstage';
import {HistoryTable} from './history';
import {Notes} from './notes';
import {StateSnapshots, StateVariables} from './state';
import {StyleConfig, StyleGroup, StyleTheme} from './style';
import {Tab, TabPanel, Tabs} from './tabs';
import {VariableInput} from './variable-input';

/**
 * Defines all backstage custom elements in the DOM.
 */
export function initBackstageCustomElements() {
  defineElements({
    'backstage-history-table': HistoryTable,
    'backstage-notes': Notes,
    'backstage-sidebar': BackstageSidebar,
    'backstage-state-snapshots': StateSnapshots,
    'backstage-state-variables': StateVariables,
    'backstage-style-config': StyleConfig,
    'backstage-style-group': StyleGroup,
    'backstage-style-theme': StyleTheme,
    'backstage-tab': Tab,
    'backstage-tab-panel': TabPanel,
    'backstage-tabs': Tabs,
    'backstage-variable-input': VariableInput
  });
}
