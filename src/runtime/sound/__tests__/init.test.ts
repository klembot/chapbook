import {describe, it} from 'vitest';

describe('initSound', () => {
	it.todo('defaults sound.mute to false');
	it.todo('defaults sound.volume to 1');
	it.todo("defaults sound.transitionDuration to '1s'");

	describe('When a sound is defined', () => {
		it.todo('loads it in the sound back');
	});

	describe("When a sound's volume is changed", () => {
		it.todo("changes the sound's volume");
	});

	describe("When a sound's playing value is changed", () => {
		it.todo('plays the sound if the value is true');
		it.todo('stops the sound if the value is false');

		it.todo('does the right thing if the sound is ambient');
	});
});
