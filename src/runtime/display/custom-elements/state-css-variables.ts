import {StateChangeEventDetail} from '../../custom-events';
import {get, varNames} from '../../state';
import {parseColor} from '../../style';
import {FontParsingOptions, parseFont} from '../../style/font';
import {CustomElement} from '../../util/custom-element';

/**
 * Sets CSS variables on itself based on state changes under `config.style`.
 * This doesn't handle any logic related to light/dark theme: see
 * state-dark-theme-css-overrides.ts for that.
 *
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

    if (name === 'config' || name === 'config.style') {
      // The entire config object has changed, likely because we just restored
      // state. We need to update all properties.

      for (const varName of varNames()) {
        if (varName.startsWith('config.style.')) {
          const varValue = get(varName);

          if (typeof varValue === 'string') {
            this.handleStateChange(varName, varValue);
          }
        }
      }
    } else if (name.startsWith('config.style.')) {
      // An individual style property has changed.

      this.handleStateChange(name, value);
    }
  }

  handleStateChange(name: string, value: string) {
    const cssName = `--${name
      .replace(/^config\.style\./, '')
      .replace(/\./g, '-')}`;

    // Config ending in `.color`, like `config.style.page.color`. We need to
    // strip off the trailing `-color` because our method will set `-color` and
    // `-background-color`.

    if (typeof value === 'string' && cssName.endsWith('-color')) {
      this.updateColor(cssName.replace(/-color$/, ''), value);
      return;
    }

    // Config ending in `.lineColor`, like `config.style.page.link.lineColor`.
    // Likewise need to strip off the final `-lineColor` as it'll be replaced.

    if (typeof value === 'string' && cssName.endsWith('-lineColor')) {
      this.updateLineColor(cssName.replace(/-lineColor$/, ''), value);
      return;
    }

    // Config ending in `.font`, like `config.style.page.font`. Need to strip
    // trailing property here as well.

    if (typeof value === 'string' && cssName.endsWith('-font')) {
      this.updateFont(cssName.replace(/-font$/, ''), value);
      return;
    }

    // Special cases.

    switch (cssName) {
      case '--backdrop':
      case '--dark-backdrop': {
        const {color} = parseColor(value);

        this.style.setProperty(`${cssName}-color`, color);
        break;
      }

      case '--fontScaling-enabled':
      case '--fontScaling-baseViewportWidth':
      case '--fontScaling-addAtDoubleWidth':
      case '--fontScaling-maximumSize':
        // These do not have dark/light individual settings.
        this.recalculateFontSizes();
        break;

      case '--page-fork-divider-size':
      case '--dark-page-fork-divider-size':
        if (typeof value === 'string' || typeof value === 'number') {
          this.style.setProperty(cssName, `${value}px`);
        }
        break;

      case '--page-fork-divider-style':
      case '--dark-page-fork-divider-style':
        if (typeof value === 'string') {
          this.style.setProperty(cssName, value);
        }
        break;

      case '--page-verticalAlign':
      case '--dark-page-verticalAlign': {
        if (typeof value !== 'string') {
          break;
        }

        const prefix = cssName.replace(/-verticalAlign$/, '');

        switch (value) {
          case 'top':
            this.style.setProperty(
              `${prefix}-current-passage-justify-content`,
              'flex-start'
            );
            break;

          case 'center':
            this.style.setProperty(
              `${prefix}-current-passage-justify-content`,
              'center'
            );
            break;

          case 'bottom':
            this.style.setProperty(
              `${prefix}-current-passage-justify-content`,
              'flex-end'
            );
            break;
        }
        break;
      }

      case '--page-footer-border':
      case '--page-footer-borderColor':
      case '--page-header-border':
      case '--page-header-borderColor':
      case '--dark-page-footer-border':
      case '--dark-page-footer-borderColor':
      case '--dark-page-header-border':
      case '--dark-page-header-borderColor':
      case '--page-style-border':
      case '--dark-page-style-border':
      case '--page-style-borderColor':
      case '--dark-page-style-borderColor': {
        const cssPrefix = cssName
          .replace(/-style-[^-]*?$/, '')
          .replace(/-border(Color)?$/, '');
        const namePrefix = name.replace(/\.[^.]*?$/, '');
        const borderStyle = get(`${namePrefix}.border`);
        const borderColor = get(`${namePrefix}.borderColor`);

        switch (borderStyle) {
          case 'none':
            this.style.setProperty(`${cssPrefix}-border`, 'none');
            this.style.setProperty(`${cssPrefix}-box-shadow`, 'none');
            break;

          case 'shadow':
            this.style.setProperty(`${cssPrefix}-border`, 'none');
            // The idea is to create a somewhat subtle inner and outer glow, then a blended drop shadow.
            this.style.setProperty(
              `${cssPrefix}-box-shadow`,
              'inset 0 0 2px 2px hsla(0, 0%, 100%, 0.05), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 2px 2px hsla(0, 0%, 0%, 0.05), 0 4px 4px hsla(0, 0%, 0%, 0.05), 0 8px 8px hsla(0, 0%, 0%, 0.05), 0 16px 16px hsla(0, 0%, 0%, 0.05)'
            );
            break;

          case 'thick-line':
            this.style.setProperty(
              `${cssPrefix}-border`,
              `4px solid ${parseColor(borderColor as string).color}`
            );
            this.style.setProperty(`${cssPrefix}-box-shadow`, 'none');
            break;

          case 'thin-line':
            this.style.setProperty(
              `${cssPrefix}-border`,
              `1px solid ${parseColor(borderColor as string).color}`
            );
            this.style.setProperty(`${cssPrefix}-box-shadow`, 'none');
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
          this.updateFont(`--${fontMatch[1].replace(/\./g, '-')}`, value);
        }
      }
    }
  }

  /**
   * Updates color-related CSS variables for a particular prefix.
   */
  updateColor(prefix: string, value: string) {
    const {backgroundColor, color} = parseColor(value);

    this.style.setProperty(`${prefix}-background-color`, backgroundColor);
    this.style.setProperty(`${prefix}-color`, color);
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

    this.style.setProperty(`${prefix}-font-family`, font.fontFamily);
    this.style.setProperty(`${prefix}-font-size`, font.fontSize);
    this.style.setProperty(`${prefix}-font-style`, font.fontStyle);
    this.style.setProperty(`${prefix}-font-variant`, font.fontVariant);
    this.style.setProperty(`${prefix}-font-weight`, font.fontWeight);
    this.style.setProperty(`${prefix}-text-decoration`, font.textDecoration);
    this.style.setProperty(`${prefix}-text-transform`, font.textTransform);
  }

  /**
   * Updates line color-related CSS variables for a prefix. Similar to
   * #updateColor, but only uses the foreground color.
   */
  updateLineColor(prefix: string, value: string) {
    const {color} = parseColor(value);

    this.style.setProperty(`${prefix}-text-decoration-color`, color);
  }
}
