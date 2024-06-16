import {escape} from 'lodash-es';
import {get, set} from '../../state';
import {CustomElement} from '../../util/custom-element';
import './variable-input.css';

/**
 * A text input that has a two-way binding to a state variable. This is
 * available as `<backstage-variable-input>` and the variable it's bound to is
 * set using its `name` attribute.
 *
 * This isn't meant to be used outside of the backstage UI.
 */
export class VariableInput extends CustomElement {
  constructor() {
    super();
    this.addEventListener('input', event => {
      const name = this.getAttribute('name');

      if (!name || !event.target) {
        return;
      }

      const value = (event.target as HTMLInputElement).value;

      try {
        if (this.hasAttribute('string')) {
          set(name, value);
        } else {
          set(name, JSON.parse(value));
        }
      } catch {
        // The value couldn't be parsed, so do nothing.
      }
    });
  }

  attributeChangedCallback() {
    const name = this.getAttribute('name');

    if (!name) {
      return;
    }

    const value = get(name);
    let stringValue = JSON.stringify(value);

    if (this.hasAttribute('string')) {
      if (value === null || value === undefined) {
        stringValue = '';
      } else {
        stringValue = (value as object).toString();
      }
    }

    this.innerHTML = `<input type="text" placeholder="${
      this.getAttribute('placeholder') ?? ''
    }" value="${escape(stringValue)}" />`;
  }

  static observedAttributes = ['name', 'placeholder', 'string'];
}
