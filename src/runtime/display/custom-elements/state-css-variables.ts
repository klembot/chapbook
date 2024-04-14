import {StateChangeEventDetail} from '../../custom-events';
import {get, varNames} from '../../state';
import {parseColor} from '../../style';
import {FontParsingOptions, parseFont} from '../../style/font';
import {CustomElement} from '../../util/custom-element';

/**
 * Sets CSS variables on itself based on state changes under `config.style`.
 * This is available as `<state-css-variables>`.
 */
export class StateCssVariables extends CustomElement {
  connectedCallback() {
    window.addEventListener('state-change', this);
  }

  disconnectedCallback() {
    window.removeEventListener('state-change', this);
  }

  handleEvent(event: CustomEvent<StateChangeEventDetail>) {
    const {name, value} = event.detail;

    if (!/^config\.style\./.test(name)) {
      return;
    }

    // Config ending in `.color`, like `config.style.page.color`.

    const colorMatch = /^config\.style\.(.*)\.color$/.exec(name);

    if (colorMatch && typeof value === 'string') {
      this.updateColor(colorMatch[1].replace(/\./g, '-'), value);
      return;
    }

    // Config ending in `.lineColor`, like `config.style.page.link.lineColor`.

    const lineColorMatch = /^config\.style\.(.*)\.lineColor$/.exec(name);

    if (lineColorMatch && typeof value === 'string') {
      this.updateLineColor(lineColorMatch[1].replace(/\./g, '-'), value);
      return;
    }

    // Config ending in `.font`, like `config.style.page.font`.

    const fontMatch = /^config\.style\.(.*)\.font$/.exec(name);

    if (fontMatch && typeof value === 'string') {
      this.updateFont(fontMatch[1].replace(/\./g, '-'), value);
      return;
    }

    // Special cases.

    switch (name) {
      case 'config.style.backdrop': {
        const {color} = parseColor(value);

        this.style.setProperty('--backdrop-color', color);
        break;
      }

      case 'config.style.fontScaling.enabled':
      case 'config.style.fontScaling.baseViewportWidth':
      case 'config.style.fontScaling.addAtDoubleWidth':
      case 'config.style.fontScaling.maximumSize':
        this.recalculateFontSizes();
        break;

      case 'config.style.page.fork.divider.size':
        if (typeof value === 'string' || typeof value === 'number') {
          this.style.setProperty('--page-fork-divider-size', `${value}px`);
        }
        break;

      case 'config.style.page.fork.divider.style':
        if (typeof value === 'string') {
          this.style.setProperty('--page-fork-divider-style', value);
        }
        break;

      case 'config.style.page.verticalAlign':
        if (typeof value !== 'string') {
          break;
        }

        switch (value) {
          case 'top':
            this.style.setProperty(
              '--page-current-passage-justify-content',
              'flex-start'
            );
            break;

          case 'center':
            this.style.setProperty(
              '--page-current-passage-justify-content',
              'center'
            );
            break;

          case 'bottom':
            this.style.setProperty(
              '--page-current-passage-justify-content',
              'flex-end'
            );
            break;
        }
        break;

      case 'config.style.page.style.border':
      case 'config.style.page.style.borderColor': {
        switch (value) {
          case 'none':
            this.style.setProperty('--page-border', 'none');
            this.style.setProperty('--page-box-shadow', 'none');
            break;

          case 'shadow':
            this.style.setProperty('--page-border', 'none');
            this.style.setProperty(
              '--page-box-shadow',
              '0 4px 8px hsla(0, 0%, 0%, 0.25)'
            );
            break;

          case 'thick-line':
            this.style.setProperty(
              '--page-border',
              `4px solid ${
                parseColor(get('config.style.page.style.borderColor') as string)
                  .color
              }`
            );
            this.style.setProperty('--page-box-shadow', 'none');
            break;

          case 'thin-line':
            this.style.setProperty(
              '--page-border',
              `1px solid ${
                parseColor(get('config.style.page.style.borderColor') as string)
                  .color
              }`
            );
            this.style.setProperty('--page-box-shadow', 'none');
            break;
        }
      }
    }
  }

  /**
   * Recalculates all font sizes set.
   */
  recalculateFontSizes() {
    // Need to include defaults here so that even the default font changes.

    for (const varName of varNames(true)) {
      const fontMatch = /^config\.style\.(.*)\.font$/.exec(varName);

      if (fontMatch) {
        const value = get(varName);

        if (typeof value === 'string') {
          this.updateFont(fontMatch[1].replace(/\./g, '-'), value);
        }
      }
    }
  }

  /**
   * Updates color-related CSS variables for a particular prefix.
   */
  updateColor(prefix: string, value: string) {
    const {backgroundColor, color} = parseColor(value);

    this.style.setProperty(`--${prefix}-background-color`, backgroundColor);
    this.style.setProperty(`--${prefix}-color`, color);
  }

  /**
   * Updates font-related CSS variables for a prefix.
   */
  updateFont(prefix: string, value: string) {
    const scalingEnabled = get('config.style.fontScaling.enabled');
    const options: FontParsingOptions = {};

    if (scalingEnabled) {
      const baseViewportWidth = get(
        'config.style.fontScaling.baseViewportWidth'
      );
      const addAtDoubleWidth = get('config.style.fontScaling.addAtDoubleWidth');
      const maximumSize = get('config.style.fontScaling.maximumSize');

      // Set options as best we can so long based on whether types match.

      if (
        typeof baseViewportWidth === 'number' &&
        typeof addAtDoubleWidth === 'number'
      ) {
        options.scaling = {
          baseViewportWidth,
          addAtDoubleWidth
        };

        if (typeof maximumSize === 'string') {
          options.scaling.maximumSize = maximumSize;
        }
      }
    }

    const font = parseFont(value, options);

    // We have to specify all these properties individually because
    // `font-family` or `font-size` might be 'inherit', and the `font`
    // shorthand requires both to have actual values.

    this.style.setProperty(`--${prefix}-font-family`, font.fontFamily);
    this.style.setProperty(`--${prefix}-font-size`, font.fontSize);
    this.style.setProperty(`--${prefix}-font-style`, font.fontStyle);
    this.style.setProperty(`--${prefix}-font-variant`, font.fontVariant);
    this.style.setProperty(`--${prefix}-font-weight`, font.fontWeight);
    this.style.setProperty(`--${prefix}-text-decoration`, font.textDecoration);
    this.style.setProperty(`--${prefix}-text-transform`, font.textTransform);
  }

  /**
   * Updates line color-related CSS variables for a prefix. Similar to
   * #updateColor, but only uses the foreground color.
   */
  updateLineColor(prefix: string, value: string) {
    const {color} = parseColor(value);

    this.style.setProperty(`--${prefix}-text-decoration-color`, color);
  }
}
