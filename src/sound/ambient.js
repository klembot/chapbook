/*
Returns HTML to play an ambient sound.
*/

import {get} from '../state';

let el;

export function play(name, volume) {
	if (!el) {
		el = document.createElement('audio');
		el.setAttribute('autoplay', 'yes');
		el.setAttribute('loop', 'yes');
		document.body.appendChild(el);
	}

	el.src = get(`sound.ambient.${name}.url`);
	el.dataset.cbSoundBaseVolume = volume;
}

export function ambientHtml(name, volume) {
	const url = get(`sound.ambient.${name}.url`);
	const description = get(`sound.ambient.${name}.description`);

	return `<audio src="${url}" autoplay="yes" loop="yes" data-cb-sound-base-volume="${volume}">${description}</audio>`;
}
