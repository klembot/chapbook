import {Color} from '../color';

describe('Color', () => {
	it('parses hex triplets', () => {
		expect(new Color('#ff0000').toString()).toBe('hsla(0, 100%, 50%, 1)');
	});

	it('parses hex quadruplets', () => {
		expect(new Color('#ff000088').toString()).toBe(
			'hsla(0, 100%, 50%, 0.53)'
		);
	});

	it('parses hsl colors', () => {
		expect(new Color('hsl(120, 100%, 50%)').toString()).toBe(
			'hsla(120, 100%, 50%, 1)'
		);
	});

	it('parses hsla colors', () => {
		expect(new Color('hsl(120, 100%, 50%, 0.25)').toString()).toBe(
			'hsla(120, 100%, 50%, 0.25)'
		);
	});

	it('parses rgb colors', () => {
		expect(new Color('rgb(0, 0, 255)').toString()).toBe(
			'hsla(240, 100%, 50%, 1)'
		);
	});

	it('parses rgba colors', () => {
		expect(new Color('rgba(0, 0, 255, 0.66)').toString()).toBe(
			'hsla(240, 100%, 50%, 0.66)'
		);
	});
});
