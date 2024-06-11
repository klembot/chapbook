import {htmlify} from '../../util';
import {Insert} from './types';

/**
 * A clickable button which toggles between light and dark theme. If
 * `config.style.page.theme.enableSwitching` is set to a falsy value, this will
 * display nothing.
 */
export const themeSwitcher: Insert<{
  darkLabel?: string;
  lightLabel?: string;
  prefix?: string;
  suffix?: string;
}> = {
  match: /^theme\s+switcher$/i,
  render(_, {darkLabel, lightLabel, prefix, suffix}) {
    return htmlify(
      'theme-switcher',
      {
        prefix,
        suffix,
        class: 'link',
        'dark-label': darkLabel,
        'light-label': lightLabel
      },
      []
    );
  }
};
