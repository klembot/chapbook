import {
  StateChangeEventDetail,
  SystemThemeChangeEventDetail
} from '../../../custom-events';
import {get, set} from '../../../state';
import {CustomElement} from '../../../util/custom-element';
import './theme.css';

export class StyleTheme extends CustomElement {
  connectedCallback() {
    this.defaultHtml(`
      <details open>
      <summary>Theme</summary>
      <p>The <strong data-theme-name></strong> theme is active. <button>Switch Theme</button></p>
      <p>
      <label><input type="checkbox"> Theme switching</label>
      </p>
      </details>
    `);
    this.update();
    this.query('button').addEventListener('click', () => this.switchTheme());
    this.query('input').addEventListener('change', () =>
      this.toggleThemeSwitching()
    );
    window.addEventListener('system-theme-change', this);
    window.addEventListener('state-change', this);
    this.update();
  }

  disconnectedCallback() {
    window.removeEventListener('system-theme-change', this);
  }

  handleEvent(
    event: CustomEvent<StateChangeEventDetail | SystemThemeChangeEventDetail>
  ) {
    if (
      event.type === 'system-theme-change' ||
      [
        'config.style.page.theme.override',
        'config.style.page.theme.enableSwitching'
      ].includes((event.detail as StateChangeEventDetail).name)
    ) {
      this.update();
    }
  }

  switchTheme() {
    set(
      'config.style.page.theme.override',
      get('browser.darkTheme') ? 'light' : 'dark'
    );
  }

  toggleThemeSwitching() {
    set(
      'config.style.page.theme.enableSwitching',
      !get('config.style.page.theme.enableSwitching')
    );
    this.update();
  }

  update() {
    const themeSwitchingEnabled = !!get(
      'config.style.page.theme.enableSwitching'
    );

    this.query<HTMLInputElement>('input').checked = themeSwitchingEnabled;
    this.query<HTMLButtonElement>('button').disabled = !themeSwitchingEnabled;
    this.query('[data-theme-name]').innerHTML = get('browser.darkTheme')
      ? 'dark'
      : 'light';
  }
}
