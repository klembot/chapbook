import color from '../color';

describe('color', () => {
	it('parses hex triplets', () => {
		expect(color.parse('#ff0000')).toEqual([0, 100, 50, 1]);
	});

	it('parses hex quadruplets', () => {
		expect(color.parse('#ff000088')).toEqual([0, 100, 50, 0.53]);
	});

	it('parses hsl colors', () => {
		expect(color.parse('hsl(120, 100%, 50%)')).toEqual([120, 100, 50, 1]);
	});

	it('parses hsla colors', () => {
		expect(color.parse('hsla(120, 100%, 50%, 0.25)')).toEqual([
			120,
			100,
			50,
			0.25
		]);
	});

	it('parses rgb colors', () => {
		expect(color.parse('rgb(0, 0, 255)')).toEqual([240, 100, 50, 1]);
	});

	it('parses rgba colors', () => {
		expect(color.parse('rgba(0, 0, 255, 0.66)')).toEqual([
			240,
			100,
			50,
			0.66
		]);
	});

	it('parses Open Color keywords', () => {
		expect(color.parse('white')).toEqual([0, 0, 100, 1]);

		// Rounding errors(?) here.

		expect(color.parse('red')).toEqual([
			0,
			65.4320987654321,
			47.647058823529406,
			1
		]);

		expect(color.parse('red-5')).toEqual([0, 100, 70.98039215686275, 1]);
	});
});
