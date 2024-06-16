import {
  StateChangeEventDetail,
  SystemThemeChangeEventDetail
} from '../../../custom-events';
import {get} from '../../../state';
import {CustomElement} from '../../../util/custom-element';

const fields = [
  {name: 'Font', suffix: 'font'},
  {name: 'Color', suffix: 'color'},
  {name: 'Link Font', suffix: 'link.font'},
  {name: 'Link Color', suffix: 'link.color'},
  {name: 'Link Line Color', suffix: 'link.lineColor'},
  {name: 'Active Link Font', suffix: 'link.active.font'},
  {name: 'Active Link Color', suffix: 'link.active.color'},
  {name: 'Active Link Line Color', suffix: 'link.active.lineColor'}
];

/**
 * Shows a set of text inputs allowing editing a set of related style
 * properties. Available as `<backstage-style-group>` and is used repeatedly
 * under the Style backstage tab. The `prefix` attribute controls the variables
 * the inputs are bound to, and `title` controls the visible title.
 *
 * This always shows values for the current theme, dark or light.
 */
export class StyleGroup extends CustomElement {
  connectedCallback() {
    const prefix = this.getAttribute('prefix');
    const title = this.getAttribute('title');

    this.defaultHtml(`
			<details open>
				<summary>${title}</summary>
				${fields
          .map(
            ({name, suffix}) => `
						<label data-prefix="%.${suffix}">
							${name}
							<backstage-variable-input name="${prefix}.${suffix}" string />
						</label>
					`
          )
          .join('')}
			</details>
		`);
    window.addEventListener('state-change', this);
    window.addEventListener('system-theme-change', this);
    this.updateInputs();
  }

  updateInputs() {
    const prefix = this.getAttribute('prefix') ?? '';
    const isDark = get('browser.darkTheme');
    let namespace = 'config.style.';

    if (isDark) {
      namespace += 'dark.';
    }

    for (const input of this.queryAll('backstage-variable-input')) {
      const newName = (input.closest('[data-prefix]') as HTMLElement | null)
        ?.dataset.prefix;

      if (newName) {
        input.setAttribute('name', namespace + newName.replace('%', prefix));
        input.removeAttribute('placeholder');

        if (isDark) {
          const lightFallback = get(
            `config.style.${newName.replace('%', prefix)}`
          );

          if (typeof lightFallback === 'string') {
            input.setAttribute('placeholder', lightFallback);
          }
        }
      }
    }
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (this.innerHTML === '') {
      return;
    }

    switch (name) {
      case 'title':
        this.query('summary').innerText = value;
        break;
      case 'prefix':
        this.updateInputs();
        break;
    }
  }

  handleEvent(
    event: CustomEvent<StateChangeEventDetail | SystemThemeChangeEventDetail>
  ) {
    if (
      event.type === 'system-theme-change' ||
      (event.detail as StateChangeEventDetail).name ===
        'config.style.page.theme.override'
    ) {
      this.updateInputs();
    }
  }

  static observedAttributes = ['prefix', 'title'];
}
