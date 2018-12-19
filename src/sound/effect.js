/*
Manages playing sound effects, which for now must be separately-hosted files. There
are two parts to playing a sound effect: defining it by name by creating
properties on `sound.effect`, and then playing it in a passage using an insert.
Defining the effect ahead of time allows it to be preloaded.

An example:

```
sound.effect.smash.url: "smash.mp3"
sound.effect.smash.description: "loud crash"
--
{sound effect: 'smash'}
```

See `../template/inserts/sound-effect.js` for the code that handles playing the
sound effect.
*/

import createLoggers from '../logger';
import event from '../event';
import {get} from '../state';

const {log, warn} = createLoggers('sound');
let bank = {};
let bankDom = document.createElement('div');

bankDom.setAttribute('hidden', true);

/* We don't use this attribute-- it's here for hacking purposes. */

bankDom.dataset.cbAudioPreload = '';

export function init() {
	document.body.appendChild(bankDom);

	event.on('state-change', ({name}) => {
		/* Extract the sound name. */

		const effectMatch = /^sound\.effect\.([^\.]+)/.exec(name);

		if (effectMatch && effectMatch[1]) {
			const effectName = effectMatch[1];
			const effect = get(`sound.effect.${effectName}`);

			/*
			Create a DOM <audio> element for this effect if it doesn't already
			exist.
			*/

			if (!bank[effectName]) {
				bank[effectName] = document.createElement('audio');
				bank[effectName].setAttribute('preload', 'auto');
				bankDom.appendChild(bank[effectName]);
				log(`Added new <audio> element to bank for "${effectName}"`);
			}

			bank[effectName].setAttribute('src', effect.url);
		}
	});
}

/*
Returns HTML to play a sound effect.
*/

export function effectHtml(name) {
	const url = get(`sound.effect.${name}.url`);
	const description = get(`sound.effect.${name}.description`);

	return `<audio src="${url}" autoplay="yes">${description}</audio>`;
}
