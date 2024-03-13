import timestring from 'timestring';
import {get, set, setDefaults} from '../state';
import {load, play, setMute, setVolume, stop} from './sound-bank';
import {createLoggers} from '../logger';

const {warn} = createLoggers('sound');

export function initSound() {
	setDefaults({
		'sound.mute': false,
		'sound.volume': 1,
		'sound.transitionDuration': '1s'
	});
	window.addEventListener('state-change', ({detail}) => {
		const {name, value} = detail;

		// Special cases: 'sound', 'sound.ambient', or 'sound.effect' set wholesale.
		// This usually happens when state is restored.

		const setAllAmbient = ['sound', 'sound.ambient'].includes(name);
		const setAllEffects = ['sound', 'sound.effect'].includes(name);

		if (setAllAmbient) {
			const untypedAmbient = get('sound.ambient');

			if (typeof untypedAmbient === 'object' && untypedAmbient) {
				const ambient = untypedAmbient as Record<
					string,
					Record<string, unknown>
				>;

				for (const name in ambient) {
					if (typeof ambient[name].url === 'string') {
						load(name, ambient[name].url as string, false);
					}

					if (typeof ambient[name].volume === 'number') {
						setVolume(name, ambient[name].volume as number);
					}

					if ('muted' in ambient[name]) {
						setMute(name, !!ambient[name].muted);
					}

					if (ambient[name].playing === true) {
						// This may fail due to browser autoplay policy.

						play(name, true).catch(error =>
							warn(
								`Could not resume playing ambient sound "${name}" (${error.message})`
							)
						);
					}
				}
			}
		}

		if (setAllEffects) {
			const untypedEffect = get('sound.effect');

			if (typeof untypedEffect === 'object' && untypedEffect) {
				const effect = untypedEffect as Record<string, Record<string, unknown>>;

				for (const name in effect) {
					if (typeof effect[name].url === 'string') {
						load(name, effect[name].url as string, true);
					}

					if (typeof effect[name].volume === 'number') {
						setVolume(name, effect[name].volume as number);
					}

					if ('muted' in effect[name]) {
						setMute(name, !!effect[name].muted);
					}

					if (effect[name].playing) {
						play(name, false)
							.then(() => set(`sound.effect.${name}.playing`, false))
							.catch(error =>
								warn(
									`Could not resume playing sound effect "${name}" (${error.message}`
								)
							);
					}
				}
			}
		}

		// Stop processing here.

		if (setAllAmbient || setAllEffects) {
			return;
		}

		// Try to parse the variable name.

		const nameBits = /^sound\.(ambient|effect)\.(.+?)\.(.+)$/i.exec(name);

		if (!nameBits) {
			return;
		}

		// If we matched, nameBits[1] is `ambient` or `effect`, nameBits[2] is the
		// sound name, and nameBits[3] is the property being set on it.

		switch (nameBits[3].toLowerCase()) {
			case 'playing': {
				let durationSource = '0s';

				if (typeof get(`${nameBits[2]}.transitionDuration`) === 'string') {
					durationSource = get(`${nameBits[2]}.transitionDuration`) as string;
				}

				if (typeof get('sound.transitionDuration') === 'string') {
					durationSource = get('sound.transitionDuration') as string;
				}

				if (value) {
					if (nameBits[1] === 'ambient') {
						play(nameBits[2], true, timestring(durationSource, 'ms'));
					} else {
						play(nameBits[2], false).then(() => set(name, false));
					}
				} else {
					if (nameBits[1] === 'ambient') {
						stop(nameBits[2], timestring(durationSource, 'ms'));
					} else {
						stop(nameBits[2]);
					}
				}
				break;
			}

			case 'url':
				load(nameBits[2], value, nameBits[1] === 'effect');
				break;

			case 'volume':
				setVolume(nameBits[2], value);
				break;
		}
	});
}
