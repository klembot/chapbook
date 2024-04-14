/**
 * Possible CSS properties returned after parsing a font declaration.
 */
export type CSSFontProperties = Pick<
	CSSStyleDeclaration,
	| 'fontFamily'
	| 'fontSize'
	| 'fontStyle'
	| 'fontVariant'
	| 'fontWeight'
	| 'textDecoration'
	| 'textTransform'
>;

export interface FontScalingOptions {
  /**
   * Width of the viewport in pixels where the set font size should be used.
   */
  baseViewportWidth: number;
  /**
   * Pixels to add to the size of the font when the viewport size is double
   * `baseViewportWidth`.
   */
  addAtDoubleWidth: number;
  /**
   * Maximum font size, regardless of scaling applied. This can be in any CSS
   * unit, and if pixels are used, `px` should be appended. If undefined, no
   * clamping is applied.
   */
  maximumSize?: string;
}

export interface FontParsingOptions {
  /**
   * Options for font scaling. If omitted, no scaling will be applied.
   */
  scaling?: FontScalingOptions;
}

/**
 * Parses a font declaration into CSS properties.
 */
export function parseFont(source: string, {scaling}: FontParsingOptions) {
  const result: CSSFontProperties = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    fontWeight: 'inherit',
    textDecoration: 'inherit',
    textTransform: 'inherit'
  };

  if (source === undefined) {
    return result;
  }

  if (typeof source !== 'string') {
    throw new Error('Only strings can be parsed as fonts.');
  }

  function applyFonts(result: CSSFontProperties, fontSrc: string) {
    result.fontFamily = fontSrc
      .split('/')
      .map(font => {
        let out = font;

        // Generic fonts must not be quoted or they'll be misinterpreted.

        if (['monospace', 'sans-serif', 'serif'].includes(out)) {
          return out;
        }

        // But otherwise, we quote font names to be safe.

        if (out[0] !== '"') {
          out = '"' + out;
        }

        if (out[out.length - 1] !== '"') {
          out = out + '"';
        }

        return out;
      })
      .join(',');
  }

  function applyBold(result: CSSFontProperties) {
    result.fontWeight = 'bold';
  }

  function applyItalic(result: CSSFontProperties) {
    result.fontStyle = 'italic';
  }

  function applyRegular(result: CSSFontProperties) {
    result.fontStyle = 'none';
    result.fontWeight = 'normal';
    result.textDecoration = 'none';
    result.textTransform = 'none';
  }

  function applySmallCaps(result: CSSFontProperties) {
    result.fontVariant = 'small-caps';
    result.textTransform = 'lowercase';
  }

  function applyUnderline(result: CSSFontProperties) {
    result.textDecoration = 'underline';
  }

  const sizeMatch =
    /\b\d+(?:\.\d+)?(ch|cm|ex|in|mm|pc|pt|px|r?em|vh|vmax|vmin|vw|%)?/i.exec(
      source
    );

  if (sizeMatch) {
    // If the font size has no unit, assume px.

    result.fontSize = sizeMatch[0];

    if (/^\d+$/.test(sizeMatch[0])) {
      result.fontSize = `${sizeMatch[0]}px`;
    }

    // Apply font scaling.

    if (scaling) {
      result.fontSize = `calc(${result.fontSize} + (${scaling.addAtDoubleWidth} * (100vw - ${scaling.baseViewportWidth}px) / ${scaling.baseViewportWidth}))`;

      if (scaling.maximumSize) {
        result.fontSize = `min(${result.fontSize}, ${scaling.maximumSize})`;
      }
    }

    // Everything in front of the size is a font.

    if (sizeMatch.index !== 0) {
      applyFonts(result, source.substring(0, sizeMatch.index).trim());
    }

    // Everything afterwards modifies it.

    const modifiers = source.substring(sizeMatch.index);

    if (/\bregular\b/i.test(modifiers)) {
      applyRegular(result);
    } else {
      if (/\bbold\b/.test(modifiers)) {
        applyBold(result);
      }

      if (/\bitalics?\b/.test(modifiers)) {
        applyItalic(result);
      }

      if (/\bunderlined?/.test(modifiers)) {
        applyUnderline(result);
      }

      if (/\bsmall caps?\b/.test(modifiers)) {
        applySmallCaps(result);
      }
    }
  } else {
    // We are looking at a mixture of font names and modifiers.
    // Because modifiers would come last, we handle those cases first.

    let modMatch;
    let trimmedSource = source;

    // Because font names might include these words, we have to be
    // case-sensitive when searching for modifiers.

    while (
      (modMatch = /(bold|italics?|regular|small caps|underlined?)$/.exec(
        trimmedSource
      ))
    ) {
      switch (modMatch[0]) {
        case 'bold':
          applyBold(result);
          break;

        case 'italic':
        case 'italics':
          applyItalic(result);
          break;

        case 'regular':
          applyRegular(result);
          break;

        case 'small caps':
          applySmallCaps(result);
          break;

        case 'underline':
        case 'underlined':
          applyUnderline(result);
          break;
      }

      trimmedSource = trimmedSource.substring(0, modMatch.index).trim();
    }

    // Anything left over is a font name.

    if (trimmedSource.trim() !== '') {
      applyFonts(result, trimmedSource);
    }
  }

  return result;
}
