import {StateChangeEventDetail} from '../../custom-events';
import {createLoggers} from '../../logger';
import {get} from '../../state';
import {CustomElement} from '../../util/custom-element';
import './external-fonts.css';

const {log} = createLoggers('display');

/**
 * Manages loading external fonts as set in the `config.style.fonts` object.
 * This doesn't set any fonts per se, only loads them. This is available as
 * `<external-fonts>`.
 */
export class ExternalFonts extends CustomElement {
	connectedCallback() {
		window.addEventListener('state-change', this);
		this.defaultHtml('<div data-google></div><div data-typekit></div>');
	}

	disconnectedCallback() {
		window.removeEventListener('state-change', this);
	}

	handleEvent({detail}: CustomEvent<StateChangeEventDetail>) {
		// If the entire config.style.fonts object has been set, set each font.

		const parentSet = ['config', 'config.style', 'config.style.fonts'].includes(
			detail.name
		);

		if (parentSet) {
			const fontVars = get('config.style.fonts') as Record<
				string,
				{name?: unknown; url?: unknown}
			>;

			if (!fontVars) {
				return;
			}

			for (const varName in fontVars) {
				const name = fontVars[varName as keyof typeof fontVars].name;
				const url = fontVars[varName as keyof typeof fontVars].url;

				if (typeof name === 'string' && typeof url === 'string') {
					this.loadUrlFont(varName, url, name);
				}
			}

			return;
		}

		// If one font has been set, load it.

		const directFontMatch = detail.name.match(
			/^config\.style\.fonts\.([^.]+)/i
		);

		if (directFontMatch) {
			const fontVar = directFontMatch[1];
			const fontName = get(`config.style.fonts.${fontVar}.name`);
			const fontUrl = get(`config.style.fonts.${fontVar}.url`);

			if (typeof fontUrl === 'string' && typeof fontName === 'string') {
				log(`Adding font from URL (${fontName})`);
				this.loadUrlFont(fontVar, fontUrl, fontName);
			}

			return;
		}

		if (
			detail.name === 'config.style.googleFont' &&
			typeof detail.value === 'string'
		) {
			this.loadGoogleFont(detail.value);
		} else if (
			detail.name === 'config.style.typekitFont' &&
			typeof detail.value === 'string'
		) {
			this.loadTypekitFont(detail.value);
		}
	}

	/**
	 * Loads a Google font.
	 * @param source - HTML embed code
	 */
	loadGoogleFont(source: string) {
		log('Adding Google font');
		this.query('[data-google]').innerHTML = source;
	}

	/**
	 * Loads a Typekit font.
	 * @param source - HTML embed code
	 */
	loadTypekitFont(source: string) {
		log('Adding Typekit font');
		this.query('[data-typekit]').innerHTML = source;
	}

	/**
	 * Loads a font from a URL.
	 * @param varName - variable name to index the font by
	 * @param url - URL to load the font from
	 * @param name - name of the font
	 */
	loadUrlFont(varName: string, url: string, name: string) {
		log('Adding font from URL');

		const formatMatches = url.match(/\.(.+)$/);

		if (!formatMatches || !formatMatches[1]) {
			return;
		}

		const format = formatMatches[1];
		const fontEl =
			this.querySelector(`[data-url-${varName}]`) ??
			document.createElement('style');

		fontEl.setAttribute(`data-url-${varName}`, '');
		fontEl.innerHTML = `@font-face { font-family: "${name}"; src: url("${url}") format("${format}"); }`;

		if (!fontEl.parentNode) {
			this.appendChild(fontEl);
		}
	}
}
