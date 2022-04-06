import {autopx, parseColor, parseColorValue, parseFont} from '../parse';

describe('autopx()', () => {
	it('converts integers to px', () => {
		expect(autopx(12)).toBe('12px');
	});

	it('leaves strings alone', () => {
		expect(autopx('12')).toBe('12');
		expect(autopx('1em')).toBe('1em');
		expect(autopx('1.25em')).toBe('1.25em');
	});
});

describe('parseColor()', () => {
	it('parses single colors as foregrounds', () => {
		expect(parseColor('#ff0000').color).toBe(parseColorValue('#ff0000'));
	});

	it('parses Open Color keywords as foregrounds', () => {
		expect(parseColor('red-5').color).toBe(parseColorValue('red-5'));
	});

	it('parses "x on y" format as foreground and background', () => {
		expect(parseColor('#ff0000 on #00ff00')).toEqual({
			'background-color': parseColorValue('#00ff00'),
			color: parseColorValue('#ff0000')
		});
		expect(parseColor('#ff0000 ON #00ff00')).toEqual({
			'background-color': parseColorValue('#00ff00'),
			color: parseColorValue('#ff0000')
		});
	});

	it('parses undefined as inheriting colors', () => {
		expect(parseColor()).toEqual({
			'background-color': 'inherit',
			color: 'inherit'
		});
	});

	it('it throws an error when given something other than a string', () => {
		expect(() => parseColor(null)).toThrow();
		expect(() => parseColor(0)).toThrow();
	});
});

describe('parseFont()', () => {
	it('parses a single number as a font size', () => {
		expect(parseFont('12')['font-size']).toBe('12px');
		expect(parseFont('12px')['font-size']).toBe('12px');
		expect(parseFont('1.25rem')['font-size']).toBe('1.25rem');
	});

	it('parses a word as a font', () => {
		expect(parseFont('Palatino')['font-family']).toBe('"Palatino"');
	});

	it('parses modifiers on their own', () => {
		let result = parseFont('bold italic');

		expect(result['font-family']).toBe('inherit');
		expect(result['font-weight']).toBe('bold');
		expect(result['font-style']).toBe('italic');

		result = parseFont('small caps');

		expect(result['font-size']).toBe('70%');
	});

	it('automatically adds quotes to font family names', () => {
		expect(parseFont('Times New Roman')['font-family']).toBe(
			'"Times New Roman"'
		);
	});

	it('interprets slashes in font names as alternatives', () => {
		expect(parseFont('Palatino/Times New Roman')['font-family']).toBe(
			'"Palatino","Times New Roman"'
		);
	});

	it('parses [font family] [font size]', () => {
		let result = parseFont('Palatino 12');

		expect(result['font-family']).toBe('"Palatino"');
		expect(result['font-size']).toBe('12px');

		result = parseFont('Times New Roman 12');

		expect(result['font-family']).toBe('"Times New Roman"');
		expect(result['font-size']).toBe('12px');
	});

	it('parses [font family] [font size] [bold|italic|underline|small caps]', () => {
		let result = parseFont('Palatino 12 bold');

		expect(result['font-family']).toBe('"Palatino"');
		expect(result['font-size']).toBe('12px');
		expect(result['font-weight']).toBe('bold');

		result = parseFont('Palatino 12 italic');

		expect(result['font-family']).toBe('"Palatino"');
		expect(result['font-size']).toBe('12px');
		expect(result['font-style']).toBe('italic');

		result = parseFont('Palatino 12 underline');

		expect(result['font-family']).toBe('"Palatino"');
		expect(result['font-size']).toBe('12px');
		expect(result['text-decoration']).toBe('underline');
	});

	it('parses undefined values as inherit', () => {
		const result = parseFont();

		expect(result).toEqual({
			'font-family': 'inherit',
			'font-size': 'inherit',
			'font-style': 'inherit',
			'font-weight': 'inherit',
			'letter-spacing': 'inherit',
			'text-decoration': 'inherit',
			'text-transform': 'inherit'
		});
	});

	it('it throws an error when given a value other than a string', () => {
		expect(() => parseFont(null)).toThrow();
		expect(() => parseFont(0)).toThrow();
	});
});
