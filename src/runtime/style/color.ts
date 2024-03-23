import 'open-color/open-color.css';
import 'reasonable-colors/reasonable-colors.css';

/**
 * Color keys present in open-color that have numeric shades. These are prefixed
 * because they're deprecated.
 */
const openColorHues = [
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
].map(value => `oc-${value}`);

/**
 * Color keys present in reasonable-colors that have numeric shades.
 */
const reasonableColorHues = [
  'gray',
  'rose',
  'raspberry',
  'red',
  'orange',
  'cinnamon',
  'amber',
  'yellow',
  'lime',
  'chartreuse',
  'green',
  'emerald',
  'aquamarine',
  'teal',
  'cyan',
  'powder',
  'sky',
  'cerulean',
  'azure',
  'blue',
  'indigo',
  'violet',
  'purple',
  'magenta',
  'pink'
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

  // Parse Open Color values. These are are deprecated and are planned to go
  // away entirely in the next major release.

  // If we matched only one part of an Open Color keyword, check to see if
  // there's a range.

  if (openColorHues.includes(value)) {
    return `var(--${value}-9)`;
  }

  const colorLookup = /^(oc-\w+)-\d$/.exec(value);

  if (colorLookup && openColorHues.includes(colorLookup[1])) {
    return `var(--${value})`;
  }

  // End parsing Open Color.

  // If we matched only one part of a Reasonable Color keyword, check to see if
  // there's a range.

  const reasonableColorLookup = /^(\w+)-([1-6])$/.exec(value);

  if (
    reasonableColorLookup &&
    reasonableColorHues.includes(reasonableColorLookup[1])
  ) {
    return `var(--color-${value})`;
  }

  return value;
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
