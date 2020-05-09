/*
Manages loading external fonts, either via services like Google Fonts or
directly loaded.
*/

import createLoggers from '../logger';
import event from '../event';
import {get, sameObject} from '../state';

const {log} = createLoggers('style');
const googleFontEl = document.createElement('div');
const typekitFontEl = document.createElement('div');
const urlFontEl = document.createElement('div');
const urlFonts = {};

function loadFontByUrl(varName, url, name) {
	const formatMatches = url.match(/\.(.+)$/);

	if (!formatMatches || !formatMatches[1]) {
		return;
	}

	const format = formatMatches[1];
	const fontEl = urlFonts[varName] || document.createElement('style');

	fontEl.dataset.cbFontLoader = varName;
	fontEl.innerHTML = `@font-face { font-family: "${name}"; src: url("${url}") format("${format}"); }`;

	if (!fontEl.parentNode) {
		urlFontEl.appendChild(fontEl);
	}
}

export function init() {
	/*
	We don't use these attributes -- they're just a locator for story code.
	*/

	googleFontEl.dataset.cbGoogleFontLoader = '';
	googleFontEl.setAttribute('hidden', true);
	typekitFontEl.dataset.cbTypekitFontLoader = '';
	typekitFontEl.setAttribute('hidden', true);
	urlFontEl.dataset.cbUrlFontLoader = '';
	urlFontEl.setAttribute('hidden', true);

	document.body.appendChild(googleFontEl);
	document.body.appendChild(typekitFontEl);
	document.body.appendChild(urlFontEl);

	event.on('state-change', ({name}) => {
		const parentSet =
			name === 'config' ||
			name === 'config.style' ||
			name === 'config.style.fonts';

		if (parentSet) {
			const fontVars = get('config.style.fonts');

			if (!fontVars) {
				return;
			}

			Object.keys(fontVars).forEach(varName => {
				const name = fontVars[varName].name;
				const url = fontVars[varName].url;

				if (name && url) {
					loadFontByUrl(varName, url, name);
				}
			});
		} else {
			const directFontMatch = name.match(/^config\.style\.fonts\.([^.]+)/i);

			if (directFontMatch) {
				const fontVar = directFontMatch[1];
				const fontName = get(`config.style.fonts.${fontVar}.name`);
				const fontUrl = get(`config.style.fonts.${fontVar}.url`);

				if (fontUrl && fontName) {
					log(`Adding font from URL (${fontName})`);
					loadFontByUrl(fontVar, fontUrl, fontName);
				}

				return;
			}
		}

		if (sameObject(name, 'config.style.googleFont')) {
			log('Adding Google font');
			googleFontEl.innerHTML = get('config.style.googleFont');
		}

		if (sameObject(name, 'config.style.typekitFont')) {
			log('Adding Typekit font');
			typekitFontEl.innerHTML = get('config.style.typekitFont');
		}
	});
}
