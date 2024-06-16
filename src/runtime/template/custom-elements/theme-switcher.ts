import {StateChangeEventDetail} from '../../custom-events';
import {get, set} from '../../state';
import {InlineButton} from './inline-button';

/**
 * A clickable control which toggles between light and dark themes by setting
 * `config.style.page.theme.override`. It displays a label that can be overriden
 * by the `light-label` and `dark-label` attributes. The name of these
 * attributes correspond to the current state of the theme, not what it will
 * switch to when clicked. That is, `light-label` is used when the theme is
 * currently light.
 *
 * If `config.style.page.theme.enableSwitching` is set to a falsy value, this
 * will display nothing.
 *
 * Available as `<theme-switcher>`.
 */
export class ThemeSwitcher extends InlineButton {
  constructor() {
    super();
    this.addEventListener('click', this);
    window.addEventListener('state-change', this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateLabel();
    this.updateVisibility();
  }

  disconnectedCallback() {
    window.removeEventListener('state-change', this);
  }

  handleEvent(event: MouseEvent | CustomEvent<StateChangeEventDetail>) {
    if (event.type === 'click') {
      set(
        'config.style.page.theme.override',
        get('browser.darkTheme') ? 'light' : 'dark'
      );

      this.updateLabel();
    } else {
      const {detail} = event as CustomEvent<StateChangeEventDetail>;

      if (detail.name === 'config.style.page.theme.enableSwitching') {
        this.updateVisibility();
      }
    }
  }

  updateLabel() {
    const current = get('browser.darkTheme') ? 'dark' : 'light';

    this.innerHTML = this.getAttribute(`${current}-label`) ?? 'Switch Theme';
  }

  updateVisibility() {
    if (get('config.style.page.theme.enableSwitching')) {
      this.removeAttribute('hidden');
    } else {
      this.setAttribute('hidden', '');
    }
  }

  attributeChangedCallback() {
    this.updateLabel();
  }

  static observedAttributes = ['dark-label', 'light-label'];
}
