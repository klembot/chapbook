import event from '../event';
import {get} from '../state';
import {selectAll} from '../util/dom-select';
import {init as initSoundEffects} from './effect';

export const defaults = {
	'sound.volume': 1
};

function setDomVolumes(el) {
	selectAll(el, 'audio[data-cb-sound-base-volume]').forEach(
		audioEl =>
			(audioEl.volume =
				get('sound.volume') *
				parseFloat(el.dataset.cbSoundBaseVolume || 1))
	);
}

export function init() {
	initSoundEffects();

	event.on('dom-mount', el => setDomVolumes(el));
	event.on('state-change', ({name}) => {
		if (name === 'sound.volume') {
			setDomVolumes(document.body);
		}
	});
}
