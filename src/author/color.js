// Color-related functions. This accepts #rrggbb, #rrggbbaa, hsl, hsla, rgb,
// rgba, and Open Color keywords. If you specify a bare Open Color, e.g. "red",
// it will pick the darkest part of the color range for you.
//
// This uses HSLA as a working format because it's the easiest of the Web
// formats to visualize: https://en.wikipedia.org/wiki/HSL_and_HSV

import openColors from 'open-color/open-color.json';
import parseColor from 'pure-color/parse';
import rgbToHsl from 'pure-color/convert/rgb2hsl';

function parse(value) {
	// If we matched only one part of an Open Color keyword, check to see if
	// there's a range. There are also Open Colors named 'black' and 'white'
	// which obviously don't have a range.

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

	const hsla = rgbToHsl(parseColor(value));

	// Pure Color doesn't force an alpha value.

	if (!hsla[3]) {
		hsla[3] = 1;
	}

	return hsla;
}

function format(value) {
	const hsla = parse(value);

	return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3] || 1})`;
}

export default {
	parse,
	format,

	spin(value, degrees) {
		const hsla = parse(value);

		hsla[0] = (hsla[0] + degrees) % 360;
		return format(hsla);
	},

	saturate(value, percent) {
		const hsla = parse(value);

		hsla[1] = Math.min(hsla[1] + hsla[1] * (1 + percent), 100);
		return format(hsla);
	},

	desaturate(value, percent) {
		const hsla = parse(value);

		hsla[1] = Math.max(hsla[1] - hsla[1] * (1 + percent), 0);
		return format(hsla);
	},

	lighten(value, percent) {
		const hsla = parse(value);

		hsla[2] = Math.min(hsla[2] + hsla[2] * (1 + percent), 100);
		return format(hsla);
	},

	darken(value, percent) {
		const hsla = parse(value);

		hsla[2] = Math.min(hsla[2] - hsla[2] * (1 + percent), 100);
		return format(hsla);
	},

	fadeIn(value, percent) {
		const hsla = parse(value);

		hsla[3] = Math.min(hsla[3] + hsla[3] * (1 + percent), 1);
		return format(hsla);
	},

	fadeOut(value, percent) {
		const hsla = parse(value);

		hsla[3] = Math.min(hsla[3] - hsla[3] * (1 + percent), 1);
		return format(hsla);
	}
};
