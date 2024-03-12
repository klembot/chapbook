import 'open-color/open-color.css';

/**
 * Color keys present in open-color that have numeric shades.
 */
const openColorShades = [
	'gray',
	'red',
	'pink',
	'grape',
	'violet',
	'indigo',
	'blue',
	'cyan',
	'teal',
	'green',
	'lime',
	'yellow',
	'orange'
];

/**
 * Parses a single color value, not a color declaration that an author would
 * use. Exported for testing only.
 * @private
 */
export function parseColorValue(value: string) {
	if (typeof value !== 'string') {
		throw new Error('Only strings can be parsed as color values.');
	}

	let result = value;

	// If we matched only one part of an Open Color keyword, check to see if
	// there's a range.

	if (openColorShades.includes(value)) {
		return `var(--oc-${value}-9)`;
	}

	const colorLookup = /^(\w+)-(\d)$/.exec(value);

	if (colorLookup && openColorShades.includes(colorLookup[1])) {
		result = `var(--oc-${value})`;
	}

	return result;
}

/**
 * Parses an authored color value, which can be either `color` (foreground only)
 * or `color on color` (foreground and background).
 */
export function parseColor(source?: string) {
	const result: Pick<CSSStyleDeclaration, 'backgroundColor' | 'color'> = {
		backgroundColor: 'inherit',
		color: 'inherit'
	};

	if (source === undefined) {
		return result;
	}

	if (typeof source !== 'string') {
		throw new Error('Only strings can be parsed as colors.');
	}

	const bits = source.split(/ on /i);

	result.color = parseColorValue(bits[0].trim().toLowerCase());

	if (result.color === '') {
		result.color = 'inherit';
	}

	if (bits.length === 2) {
		result.backgroundColor = parseColorValue(bits[1].trim().toLowerCase());
	}

	return result;
}
