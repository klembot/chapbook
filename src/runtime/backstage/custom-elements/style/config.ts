import {get, varNames} from '../../../state';
import {CustomElement} from '../../../util/custom-element';
import './config.css';

const ignoredKeys = ['config.style.page.theme.override'];

/**
 * Shows a read-only text field showing code that reflects the current style.
 * It's available as `<backstage-style-config>` and is used by the Config
 * section of the Style backstage tab.
 */
export class StyleConfig extends CustomElement {
  connectedCallback() {
    this.defaultHtml(`
			<details open>
				<summary>Config</summary>
				<label for="cb-backstage-style-config">
					Enter this code into your first passage&rsquo;s variables section to
					permanently use this style:
				</label>
				<textarea
					readonly
					id="cb-backstage-style-config"
				></textarea>
			</details>
		`);
    window.addEventListener('state-change', this);
    this.update();
  }

  disconnectedCallback() {
    window.removeEventListener('state-change', this);
  }

  handleEvent() {
    this.update();
  }

  update() {
    this.query<HTMLTextAreaElement>('textarea').value = varNames(false)
      .reduce((out, key) => {
        if (!/^config.style/.test(key) || ignoredKeys.includes(key)) {
          return out;
        }

        const value = get(key);

        if (value === undefined) {
          return out;
        }

        return out + `${key}: ${JSON.stringify(get(key))}\n`;
      }, '')
      .trim();
  }
}
