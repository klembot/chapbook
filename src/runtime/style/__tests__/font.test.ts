import {describe, expect, it} from 'vitest';
import {parseFont} from '../font';

describe('parseFont', () => {
	it.each([
		['bold', {fontWeight: 'bold'}],
		['italic', {fontStyle: 'italic'}],
		['italics', {fontStyle: 'italic'}],
		[
			'regular',
			{
				fontStyle: 'none',
				fontWeight: 'normal',
				textDecoration: 'none',
				textTransform: 'none'
			}
		],
		['small caps', {fontVariant: 'small-caps', textTransform: 'lowercase'}],
		['underline', {textDecoration: 'underline'}],
		['underlined', {textDecoration: 'underline'}],
		['14', {fontSize: '14px'}],
		['2em', {fontSize: '2em'}],
		['Verdana', {fontFamily: '"Verdana"'}],
		['Verdana/sans-serif', {fontFamily: '"Verdana",sans-serif'}],
		['Verdana/Arial/sans-serif', {fontFamily: '"Verdana","Arial",sans-serif'}],
		['Verdana 14', {fontFamily: '"Verdana"', fontSize: '14px'}],
		[
			'Verdana 14 bold',
			{fontFamily: '"Verdana"', fontSize: '14px', fontWeight: 'bold'}
		],
		[
			'Noto Sans/sans-serif 3000% bold italic underlined small caps',
			{
				fontFamily: '"Noto Sans",sans-serif',
				fontSize: '3000%',
				fontStyle: 'italic',
				fontVariant: 'small-caps',
				fontWeight: 'bold',
				textDecoration: 'underline',
				textTransform: 'lowercase'
			}
		]
	])('parses %s as %s', (value, expected) =>
		expect(parseFont(value)).toEqual({
			fontFamily: 'inherit',
			fontSize: 'inherit',
			fontStyle: 'inherit',
			fontVariant: 'inherit',
			fontWeight: 'inherit',
			textDecoration: 'inherit',
			textTransform: 'inherit',
			...expected
		})
	);
});
