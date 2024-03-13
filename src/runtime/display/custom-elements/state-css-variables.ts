import {StateChangeEventDetail} from '../../custom-events';
import {get} from '../../state';
import {parseColor} from '../../style';
import {parseFont} from '../../style/font';
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

		if (
			!['number', 'string'].includes(typeof value) ||
			!/^config\.style\./.test(name)
		) {
			return;
		}

		// Config ending in `.color`, like `config.style.page.color`.

		const colorMatch = /^config\.style\.(.*)\.color$/.exec(name);

		if (colorMatch) {
			const varName = colorMatch[1].replace(/\./g, '-');
			const {backgroundColor, color} = parseColor(value);

			this.style.setProperty(`--${varName}-background-color`, backgroundColor);
			this.style.setProperty(`--${varName}-color`, color);
			return;
		}

		// Config ending in `.lineColor`, like `config.style.page.link.lineColor`.

		const lineColorMatch = /^config\.style\.(.*)\.lineColor$/.exec(name);

		if (lineColorMatch) {
			const varName = lineColorMatch[1].replace(/\./g, '-');
			const {color} = parseColor(value);

			this.style.setProperty(`--${varName}-text-decoration-color`, color);
			return;
		}

		// Config ending in `.font`, like `config.style.page.font`.

		const fontMatch = /^config\.style\.(.*)\.font$/.exec(name);

		if (fontMatch) {
			const varName = fontMatch[1].replace(/\./g, '-');
			const font = parseFont(value);

			// We have to specify all these properties individually because
			// `font-family` or `font-size` might be 'inherit', and the `font`
			// shorthand requires both to have actual values.

			this.style.setProperty(`--${varName}-font-family`, font.fontFamily);
			this.style.setProperty(`--${varName}-font-size`, font.fontSize);
			this.style.setProperty(`--${varName}-font-style`, font.fontStyle);
			this.style.setProperty(`--${varName}-font-variant`, font.fontVariant);
			this.style.setProperty(`--${varName}-font-weight`, font.fontWeight);
			this.style.setProperty(
				`--${varName}-text-decoration`,
				font.textDecoration
			);
			this.style.setProperty(`--${varName}-text-transform`, font.textTransform);
			return;
		}

		// Special cases.

		switch (name) {
			case 'config.style.backdrop': {
				const {color} = parseColor(value);

				this.style.setProperty('--backdrop-color', color);
				break;
			}

			case 'config.style.page.fork.divider.size':
				this.style.setProperty('--page-fork-divider-size', `${value}px`);
				break;

			case 'config.style.page.fork.divider.style':
				this.style.setProperty('--page-fork-divider-style', value);
				break;

			case 'config.style.page.verticalAlign':
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
}
