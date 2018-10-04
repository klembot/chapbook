import {autopx, parseColor, parseFont} from '../parse';
import {format as formatColor} from '../color';

describe('autopx()', () => {
	test('converts integers to px', () => {
		expect(autopx(12)).toBe('12px');
	});

	test('leaves strings alone', () => {
		expect(autopx('12')).toBe('12');
		expect(autopx('1em')).toBe('1em');
	});
});

describe('parseColor()', () => {
	test('parses single colors as foregrounds', () => {
		expect(parseColor('#ff0000').color).toBe(formatColor('#ff0000'));
	});

	test('parses Open Color keywords as foregrounds', () => {
		expect(parseColor('red-5').color).toBe(formatColor('red-5'));
	});

	test('parses "x on y" format as foreground and background', () => {
		expect(parseColor('#ff0000 on #00ff00')).toEqual({
			'background-color': formatColor('#00ff00'),
			color: formatColor('#ff0000')
		});
		expect(parseColor('#ff0000 ON #00ff00')).toEqual({
			'background-color': formatColor('#00ff00'),
			color: formatColor('#ff0000')
		});
	});
});

describe('parseFont()', () => {
	test('parses a single number as a font size', () => {
		expect(parseFont('12')['font-size']).toBe('12px');
	});

	test('parses a word as a font', () => {
		expect(parseFont('Palatino')['font-family']).toBe('"Palatino"');
	});

	test('parses modifiers on their own', () => {
		let result = parseFont('bold italic');

		expect(result['font-family']).toBe('inherit');
		expect(result['font-weight']).toBe('bold');
		expect(result['font-style']).toBe('italic');

		result = parseFont('small caps');

		expect(result['font-size']).toBe('70%');
	});

	test('automatically adds quotes to font family names', () => {
		expect(parseFont('Times New Roman')['font-family']).toBe(
			'"Times New Roman"'
		);
	});

	test('interprets slashes in font names as alternatives', () => {
		expect(parseFont('Palatino/Times New Roman')['font-family']).toBe(
			'"Palatino","Times New Roman"'
		);
	});

	test('parses [font family] [font size]', () => {
		let result = parseFont('Palatino 12');

		expect(result['font-family']).toBe('"Palatino"');
		expect(result['font-size']).toBe('12px');

		result = parseFont('Times New Roman 12');

		expect(result['font-family']).toBe('"Times New Roman"');
		expect(result['font-size']).toBe('12px');
	});

	test('parses [font family] [font size] [bold|italic|underline|small caps]', () => {
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
});
