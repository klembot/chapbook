import {StateChangeEventDetail} from '../../custom-events';
import {get} from '../../state';
import {CustomElement} from '../../util/custom-element';
import {StateCssVariables} from './state-css-variables';

/**
 * This acts like a media query for StateCssVariables, overriding variables when
 * a dark theme is active. Because of this, it must be a child of
 * `<state-css-variables>`.
 *
 * This is available as `<state-dark-theme-css-overrides>`.
 */
export class StateDarkThemeCssOverrides extends CustomElement {
  connectedCallback() {
    window.addEventListener('state-change', this);
    window.addEventListener('system-theme-change', this);

    // This needs to be delayed so that the rest of the engine can initialize,
    // and the value of `browser.darkTheme` is accurate.
    Promise.resolve().then(() => this.update());
  }

  disconnectedCallback() {
    window.removeEventListener('state-change', this);
    window.removeEventListener('system-theme-change', this);
  }

  update() {
    if (get('browser.darkTheme')) {
      this.enable();
    } else {
      this.disable();
    }
  }

  /**
   * Disables all overrides.
   */
  disable() {
    this.style.cssText = '';
  }

  /**
   * Enables all overrides.
   */
  enable() {
    const parent = this.closest<StateCssVariables>('state-css-variables');

    // If there isn't an element to override, do nothing.

    if (!parent) {
      return;
    }

    // Remove any overrides previously set.

    this.style.cssText = '';

    // The only way to iterate over properties when we don't know names is by
    // index. We need to set all variables prefixed by `--dark` regardless of
    // whether a default version exists, because it may not.

    for (let i = 0; i < parent.style.length; i++) {
      const nameBits = /^--dark-(.*)/.exec(parent.style.item(i));

      if (nameBits?.[1]) {
        this.style.setProperty(
          `--${nameBits[1]}`,
          `var(--dark-${nameBits[1]})`
        );
      }
    }
  }

  handleEvent(
    event: CustomEvent<StateChangeEventDetail> | MediaQueryListEvent
  ) {
    if (event.type === 'system-theme-change') {
      this.update();
    } else {
      const {name} = (event as CustomEvent<StateChangeEventDetail>).detail;

      // We need to listen to changes on config and config.style because they
      // may be changed when state is restored at the start of a session.

      if (
        [
          'config',
          'config.style',
          'config.style.page.theme.enableSwitching',
          'config.style.page.theme.override'
        ].includes(name) ||
        name.startsWith('config.style.dark')
      ) {
        this.update();
      }
    }
  }
}
