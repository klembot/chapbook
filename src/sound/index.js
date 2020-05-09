/*
This manages audio sources of two types: ambient (music or background noise) or
effects (one-offs). Everything is managed through state properties. Below are
examples of what a sample set of state might look like.

```
sound.ambient.coffeehouse.url: "coffeehouse.mp3"
sound.ambient.coffeehouse.description: "coffeehouse background noise"
sound.ambient.coffeehouse.playing: true
sound.effect.bang.url: "bang.mp3"
sound.effect.bang.description: "explosion"
sound.effect.bang.volume: 0.75
sound.volume: 0.5
sound.mute: false
```

Ambient sound always loops once its `playing` property changes to true unless
something external changes it, while effects always change their `playing`
property to `false` when playback ends. Effects are also preloaded.

Descriptions are for the benefit of players who cannot perceive the sound,
whether because they have sound disabled in their browser or because they simply
have difficulty hearing.

`sound.volume` and `sound.mute` are master volume controls; you can also set
`volume` on a specific sound. In the example above, the effective volume of the
`bang` sound effect is 0.375 (0.75 * 0.5).

See also: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
*/

import timestring from 'timestring';
import createLoggers from '../logger';
import event from '../event';
import fade from './fade';
import {get, sameObject, set} from '../state';

const {log, warn} = createLoggers('sound');
let soundBank = {};
let soundBankEl;

export const defaults = {
	'sound.mute': false,
	'sound.volume': 1,
	'sound.transitionDuration': '1s',
};

export function init() {
	/*
	Create a DOM element to house <audio> elements for preloading and playback.
	*/

	soundBankEl = document.createElement('div');
	soundBankEl.setAttribute('hidden', true);

	/* We don't use this attribute-- it's just a locator for story code. */

	soundBankEl.dataset.cbSounds = '';
	document.body.appendChild(soundBankEl);

	event.on('state-change', ({name, value}) => {
		/*
		Special cases: 'sound', 'sound.ambient', or 'sound.effect' set
		wholesale. This usually happens when state is restored.
		*/

		const setAllAmbient = sameObject(name, 'sound.ambient');
		const setAllEffects = sameObject(name, 'sound.effect');

		if (setAllAmbient) {
			const ambient = get('sound.ambient');

			if (ambient) {
				Object.keys(ambient).forEach(name => {
					if (ambient[name].url) {
						load(name, ambient[name].url, false);
					}

					if (ambient[name].volume) {
						setVolume(name, ambient[name].volume);
					}

					if (ambient[name].muted !== undefined) {
						setMute(name, ambient[name].muted);
					}

					if (ambient[name].playing) {
						/* This may fail due to browser autoplay policy. */

						play(name, true).catch(e =>
							warn(
								`Could not resume playing ambient sound "${name}" (${e.message})`
							)
						);
					}
				});
			}
		}

		if (setAllEffects) {
			const effect = get('sound.effect');

			if (effect) {
				Object.keys(effect).forEach(name => {
					if (effect[name].url) {
						load(name, effect[name].url, true);
					}

					if (effect[name].volume) {
						setVolume(name, effect[name].volume);
					}

					if (effect[name].muted !== undefined) {
						setMute(name, effect[name].muted);
					}

					if (effect[name].playing) {
						play(name, false)
							.then(() => set(`sound.effect.${name}.playing`, false))
							.catch(e =>
								warn(
									`Could not resume playing sound effect "${name}" (${e.message}`
								)
							);
					}
				});
			}
		}

		/* Stop processing here. */

		if (setAllAmbient || setAllEffects) {
			return;
		}

		/* Try to parse the variable name. */

		const nameBits = /^sound\.(ambient|effect)\.(.+?)\.(.+)$/i.exec(name);

		if (!nameBits) {
			return;
		}

		/*
		If we matched, nameBits[1] is `ambient` or `effect`, nameBits[2] is the
		sound name, and nameBits[3] is the property being set on it.
		*/

		switch (nameBits[3].toLowerCase()) {
			case 'playing':
				if (value) {
					if (nameBits[1] === 'ambient') {
						play(
							nameBits[2],
							true,
							timestring(
								get(`${nameBits[2]}.transitionDuration`) ||
									get('sound.transitionDuration') ||
									'0s',
								'ms'
							)
						);
					} else {
						play(nameBits[2], false).then(() => set(name, false));
					}
				} else {
					if (nameBits[1] === 'ambient') {
						stop(
							nameBits[2],
							timestring(
								get(`${nameBits[2]}.transitionDuration`) ||
									get('sound.transitionDuration') ||
									'0s',
								'ms'
							)
						);
					} else {
						stop(nameBits[2]);
					}
				}
				break;

			case 'url':
				load(nameBits[2], value, nameBits[1] === 'effect');
				break;

			case 'volume':
				setVolume(nameBits[2], value);
				break;
		}
	});
}

/*
Loads a sound from a source URL.
*/

function load(name, url, preload) {
	/*
	Create a DOM <audio> element for this effect if it doesn't already exist.
	*/

	if (!soundBank[name]) {
		soundBank[name] = document.createElement('audio');
		soundBank[name].setAttribute('src', url);

		if (preload) {
			soundBank[name].setAttribute('preload', 'auto');
		}

		soundBankEl.appendChild(soundBank[name]);
		log(`Added new <audio> element to sound bank for "${name}" for ${url}`);
	} else {
		soundBank[name].setAttribute('src', url);

		if (preload) {
			soundBank[name].setAttribute('preload', 'auto');
		} else {
			soundBank[name].removeAttribute('preload');
		}

		log(`Updated <audio> element in sound bank for "${name}" to use ${url}`);
	}
}

/*
Plays a sound from the bank, optionally looping it. If `loop` is false, this
returns a promise that resolves when the sound finishes playing. Otherwise, it
returns nothing. If there is an error with playback (e.g. the sound requested
doesn't exist in the bank), this throws an error.
*/

function play(name, loop, fadeInDuration = 0) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	log(`Playing sound "${name}" (looping: ${loop})`);

	if (fadeInDuration > 0) {
		soundBank[name].volume = 0;
		fade(soundBank[name], 1, fadeInDuration);
	}

	if (loop) {
		soundBank[name].loop = true;
		return soundBank[name].play();
	} else {
		soundBank[name].loop = false;

		return new Promise((resolve, reject) => {
			try {
				soundBank[name].addEventListener('ended', function reset() {
					soundBank[name].removeEventListener('ended', reset);
					resolve();
				});
				soundBank[name].play().catch(e => reject(e));
			} catch (e) {
				reject(e);
			}
		});
	}
}

/*
Stops sound playing in the sound bank. If the sound is not playing, this does
nothing. If the sound requested doesn't exist in the bank, this throws an error.
*/

function stop(name, fadeOutDuration = 0) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	if (fadeOutDuration <= 0) {
		soundBank[name].pause();
		soundBank[name].currentTime = 0;
	} else {
		const oldVolume = soundBank[name].volume;

		fade(soundBank[name], 0, fadeOutDuration).then(() => {
			soundBank[name].pause();
			soundBank[name].volume = oldVolume;
			soundBank[name].currentTime = 0;
		});
	}
}

/*
Sets the volume on a previously loaded sound. This does *not* take into account
the master volume, `sound.volume`. If the sound requested doesn't exist in the
bank, this throws an error.
*/

function setVolume(name, value) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	if (value < 0 || value > 1) {
		throw new Error('A sound volume must be between 0 and 1.');
	}

	soundBank[name].volume = value;
}

/*
Mutes or unmutes a previously loaded sound. If the sound requested doesn't exist
in the bank, this throws an error.
*/

function setMute(name, value) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	soundBank[name].muted = value;
}
