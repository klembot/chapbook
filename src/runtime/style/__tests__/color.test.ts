import {describe, expect, it} from 'vitest';
import {parseColor, parseColorValue} from '../color';

describe('parseColorValue', () => {
  it.each([
    ['', ''],
    ['black', 'black'],
    ['white', 'white'],
    ['cornflowerblue', 'cornflowerblue'],
    ['blue', 'blue'],
    ['red-2', 'var(--color-red-2)'],
    ['red-7', 'red-7'], // Too large number for shade
    ['red-0', 'red-0'], // Too small number for shade
    ['oc-red-7', 'var(--oc-red-7)'],
    ['oc-red', 'var(--oc-red-9)'],
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
        color: 'red'
      }
    ],
    [
      'red-6 on black',
      {
        backgroundColor: 'black',
        color: 'var(--color-red-6)'
      }
    ]
  ])('parses %s as %s', (value, expected) =>
    expect(parseColor(value)).toEqual(expected)
  );
});
