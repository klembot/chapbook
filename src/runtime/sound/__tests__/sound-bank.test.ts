import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {load, play, setMute, setVolume, stop} from '../sound-bank';
import fadeAudioEl from '../fade';

vi.mock('../fade');

const fadeAudioElMock = vi
	.mocked(fadeAudioEl)
	.mockImplementation(() => Promise.resolve());

const pauseSpy = vi.spyOn(HTMLAudioElement.prototype, 'pause');
const playSpy = vi.spyOn(HTMLAudioElement.prototype, 'play');

describe('play', () => {
	let lastPlayed: HTMLAudioElement;

	beforeEach(() => {
		load('test', 'test-url.mp3');
		playSpy.mockImplementation(async function () {
			// @ts-expect-error We want the `this` binding to be dynamic.
			lastPlayed = this as HTMLAudioElement;
		});
	});

	afterEach(() => {
		fadeAudioElMock.mockClear();
		playSpy.mockReset();
	});

	it('plays a previously-loaded sound', () => {
		expect(playSpy).not.toBeCalled();
		play('test');
		expect(playSpy).toBeCalledTimes(1);
		expect(lastPlayed.src).toMatch(/test-url\.mp3$/);
	});

	it('throws an error if the sound has not been loaded', () =>
		expect(() => play('nonexistent')).rejects.toThrow());

	it('loops the sound if the loop argument is true', () => {
		play('test', true);
		expect(lastPlayed.loop).toBe(true);
	});

	it("doesn't loop the sound if the loop argument is false", () => {
		play('test', true);
		play('test', false);
		expect(lastPlayed.loop).toBe(false);
	});

	it('fades the sound in if a duration is specified', () => {
		play('test', false, 200);
		expect(fadeAudioElMock.mock.calls).toEqual([[lastPlayed, 1, 200]]);
	});
});

describe('stop', () => {
	let lastPaused: HTMLMediaElement;

	beforeEach(() => {
		pauseSpy.mockImplementation(async function () {
			// @ts-expect-error We want the `this` binding to be dynamic.
			lastPaused = this as HTMLAudioElement;
		});
		playSpy.mockReturnValue(Promise.resolve());
		load('test', 'test-url.mp3');
	});

	afterEach(() => {
		pauseSpy.mockReset();
	});

	it('pauses a previously-loaded sound', () => {
		play('test');
		stop('test');
		expect(pauseSpy).toBeCalledTimes(1);
		expect(lastPaused.src).toMatch(/test-url\.mp3$/);
	});

	it('throws an error if the sound has not been loaded', () =>
		expect(() => stop('nonexistent')).toThrow());

	it('fades the sound out if a duration is specified', () => {
		stop('test', 200);
		expect(fadeAudioElMock.mock.calls).toEqual([[lastPaused, 0, 200]]);
	});
});

describe('setMute', () => {
	let lastPlayed: HTMLMediaElement;

	beforeEach(() => {
		playSpy.mockImplementation(async function () {
			// @ts-expect-error We want the `this` binding to be dynamic.
			lastPlayed = this as HTMLMediaElement;
		});

		load('test', 'test-url.mp3');
		play('test');
	});

	afterEach(() => {
		playSpy.mockReset();
	});

	it('mutes a previously unmuted sound', () => {
		setMute('test', true);
		expect(lastPlayed.muted).toBe(true);
	});

	it('unmutes a previously muted sound', () => {
		setMute('test', true);
		expect(lastPlayed.muted).toBe(true);
		setMute('test', false);
		expect(lastPlayed.muted).toBe(false);
	});

	it('throws an error if the sound has not been loaded', () =>
		expect(() => setMute('nonexistent', true)).toThrow());
});

describe('setVolume', () => {
	let lastPlayed: HTMLMediaElement;

	beforeEach(() => {
		playSpy.mockImplementation(async function () {
			// @ts-expect-error We want the `this` binding to be dynamic.
			lastPlayed = this as HTMLMediaElement;
		});

		load('test', 'test-url.mp3');
		play('test');
	});

	afterEach(() => {
		playSpy.mockReset();
	});

	it('changes the volume of a sound', () => {
		setVolume('test', 0.5);
		expect(lastPlayed.volume).toBe(0.5);
	});

	it('throws an error if the sound has not been loaded', () =>
		expect(() => setVolume('nonexistent', 1)).toThrow());

	it('throws an error if the volume is less than 0', () =>
		expect(() => setVolume('nonexistent', -1)).toThrow());

	it('throws an error if the volume is more than 1', () =>
		expect(() => setVolume('nonexistent', 2)).toThrow());
});
