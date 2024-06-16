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
    expect(parseFont(value, {})).toEqual({
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

  it('sets font size correctly when all scaling options are set', () =>
    expect(
      parseFont('Verdana/sans-serif 24', {
        scaling: {
          addAtDoubleWidth: 50,
          baseViewportWidth: 1000,
          maximumSize: '36px'
        }
      }).fontSize
    ).toBe('min(calc(24px + max(50 * (100vw - 1000px) / 1000, 0px)), 36px)'));

  it('sets font size correctly when maximum font size is omitted', () =>
    expect(
      parseFont('Verdana/sans-serif 24', {
        scaling: {
          addAtDoubleWidth: 50,
          baseViewportWidth: 1000
        }
      }).fontSize
    ).toBe('calc(24px + max(50 * (100vw - 1000px) / 1000, 0px))'));
});
