import {get, setLookup} from '../state';

/**
 * Initializes browser-related lookups.
 */
export function initBrowserLookups() {
  setLookup(
    'browser.darkSystemTheme',
    () =>
      !!(
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
  );
  setLookup('browser.darkTheme', () => {
    if (!get('config.style.page.theme.enableSwitching')) {
      return false;
    }

    switch (get('config.style.page.theme.override')) {
      case 'dark':
        return true;
      case 'light':
        return false;
      default:
        return get('browser.darkSystemTheme');
    }
  });
  setLookup('browser.height', () => window.innerHeight);
  setLookup('browser.online', () => window.navigator.onLine);
  setLookup('browser.width', () => window.innerWidth);
}
