/*
A function that parses colors. This accepts #rrggbb, #rrggbbaa, hsl, hsla, rgb,
rgba, and Open Color keywords. If you specify a bare Open Color, e.g. "red", it
will pick the darkest part of the color range for you.

This uses HSLA as an output format because it's the easiest of the Web
formats to visualize: https://en.wikipedia.org/wiki/HSL_and_HSV
*/

import openColors from 'open-color/open-color.json';
import parseColor from 'pure-color/parse';
import rgbToHsl from 'pure-color/convert/rgb2hsl';

/*
Parses a color into an array of hsla values.
*/

export function parse(value) {
	if (typeof value !== 'string') {
		throw new Error('Only strings can be parsed as colors.');
	}

	/*
	If we matched only one part of an Open Color keyword, check to see if
	there's a range. There are also Open Colors named 'black' and 'white'
	which obviously don't have a range.
	*/

	if (openColors[value]) {
		if (Array.isArray(openColors[value])) {
			value = openColors[value][openColors[value].length - 1];
		} else {
			value = openColors[value];
		}
	}

	const colorLookup = /^(\w+)-(\d)$/.exec(value);

	if (colorLookup && openColors[colorLookup[1]]) {
		value = openColors[colorLookup[1]][colorLookup[2]];
	}

	const rgba = parseColor(value);
	const hsla = rgbToHsl(rgba);

	/*
	Pure Color doesn't force an alpha value, and doesn't preserve alpha in
	conversions.
	*/

	hsla[3] = rgba[3] !== undefined ? rgba[3] : 1;
	return hsla;
}

export function format(value) {
	value = typeof value === 'string' ? parse(value) : value;

	return `hsla(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3] || 1})`;
}
