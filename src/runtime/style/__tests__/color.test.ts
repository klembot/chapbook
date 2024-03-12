import {describe, expect, it} from 'vitest';
import {parseColor, parseColorValue} from '../color';

describe('parseColorValue', () => {
	it.each([
		['', ''],
		['black', 'black'],
		['white', 'white'],
		['cornflowerblue', 'cornflowerblue'],
		['blue', 'var(--oc-blue-9)'],
		['red-7', 'var(--oc-red-7)'],
		['#ff0000', '#ff0000'],
		['hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)']
	])('parses %s as %s', (value, expected) =>
		expect(parseColorValue(value)).toBe(expected)
	);
});

describe('parseColor', () => {
	it.each([
		['', {backgroundColor: 'inherit', color: 'inherit'}],
		[
			'red',
			{
				backgroundColor: 'inherit',
				color: 'var(--oc-red-9)'
			}
		],
		[
			'red-7 on black',
			{
				backgroundColor: 'black',
				color: 'var(--oc-red-7)'
			}
		]
	])('parses %s as %s', (value, expected) =>
		expect(parseColor(value)).toEqual(expected)
	);
});
