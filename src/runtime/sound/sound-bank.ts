import {createLoggers} from '../logger';
import fadeAudioEl from './fade';

const {log} = createLoggers('sound');
const soundBank: Record<string, HTMLAudioElement> = {};

/**
 * Loads a sound from a source URL.
 * @param name - name the sound will be referenced by later
 * @param url - URL of the sound source
 * @param preload - Preload this sound?
 */
export function load(name: string, url: string, preload?: boolean) {
	/*
	Create a DOM <audio> element for this effect if it doesn't already exist.
	*/

	if (!soundBank[name]) {
		soundBank[name] = document.createElement('audio');
		soundBank[name].setAttribute('src', url);

		if (preload) {
			soundBank[name].setAttribute('preload', 'auto');
		}

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

/**
 * Plays a sound from the bank, optionally looping it. If `loop` is false, this
 * returns a promise that resolves when the sound finishes playing. Otherwise,
 * the promise it returns resolves immediately. If there is an error with
 * playback (e.g. the sound requested doesn't exist in the bank), this throws an
 * error.
 */
export async function play(
	name: string,
	loop = false,
	fadeInDuration = 0
): Promise<void> {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	log(`Playing sound "${name}" (looping: ${loop})`);

	if (fadeInDuration > 0) {
		soundBank[name].volume = 0;
		fadeAudioEl(soundBank[name], 1, fadeInDuration);
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
			} catch (error) {
				reject(error);
			}
		});
	}
}

/**
 * Stops sound playing in the sound bank. If the sound is not playing, this does
 * nothing. If the sound requested doesn't exist in the bank, this throws an
 * error.
 */
export function stop(name: string, fadeOutDuration = 0) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	if (fadeOutDuration <= 0) {
		soundBank[name].pause();
		soundBank[name].currentTime = 0;
	} else {
		const oldVolume = soundBank[name].volume;

		fadeAudioEl(soundBank[name], 0, fadeOutDuration).then(() => {
			soundBank[name].pause();
			soundBank[name].volume = oldVolume;
			soundBank[name].currentTime = 0;
		});
	}
}

/**
 * Mutes or unmutes a previously loaded sound. If the sound requested doesn't
 * exist in the bank, this throws an error.
 */
export function setMute(name: string, value: boolean) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	soundBank[name].muted = value;
}

/**
 * Sets the volume on a previously loaded sound. This does *not* take into
 * account the master volume, `sound.volume`. If the sound requested doesn't
 * exist in the bank, this throws an error.
 */
export function setVolume(name: string, value: number) {
	if (!soundBank[name]) {
		throw new Error(`There is no sound loaded named ${name}.`);
	}

	if (value < 0 || value > 1) {
		throw new Error('A sound volume must be between 0 and 1.');
	}

	soundBank[name].volume = value;
}
