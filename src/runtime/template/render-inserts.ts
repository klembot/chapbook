import {get} from '../state';
import {Insert} from './inserts';

/**
 * Tries to render a single insert surrounded with { and }. If this can't be
 * done, it returns the text as-is.
 */
function renderInsert(source: string, inserts: Insert[]) {
	// When we pass the raw invocation to inserts, we remove the brackets to make
	// parsing easier on the insert side.

	const invocation = source.substring(1, source.length - 1).trim();

	if (/\s/.test(invocation)) {
		// This can only be a functional insert.

		const keyword = invocation.match(/^[^:,]+/)?.[0];

		if (!keyword) {
			return source;
		}

		const insert = inserts.find(i => i.match.test(keyword));

		if (insert) {
			// Parse out the arguments.

			const args = invocation.replace(keyword, '');

			if (args[0] === ':') {
				// We're looking at a `{keyword that can have spaces: value,
				// foo: value, bar: value}` invocation. We need to massage it
				// so that the entire string can be parsed as a JavaScript
				// object. Note restriction above about named args not having
				// the same name as the initial invocation, e.g. {foo: 'bar',
				// foo: 'baz'} is not a valid insert syntax in source code.

				const props = new Function(`return {"${keyword}" ${args}}`)();
				const firstArg = props[keyword];

				delete props[keyword];
				return insert.render(firstArg, props, invocation);
			} else if (args[0] === ',') {
				// This is a `{keyword, foo: value, bar: value}` invocation.

				const props = new Function(`return {${args.substring(1)}}`)();

				return insert.render(null, props, invocation);
			} else if (args === '') {
				// This is a `{keyword}` invocation.

				return insert.render(null, {}, invocation);
			} else {
				// This looks garbled, so do nothing-- further down, we return source
				// as-is.
			}
		}
	} else {
		// This can only be a variable. We allow dereferencing array items at the end
		// of the invocation only, e.g. `myVar[2]` but not `myVar[0].color`.

		const dereferenceMatch = /(.+)\[(.+)\]$/.exec(invocation);
		let value;

		if (dereferenceMatch) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			value = (get(dereferenceMatch[1]) as any)?.[dereferenceMatch[2]];
		} else {
			value = get(invocation);
		}

		if (value !== undefined) {
			return value;
		}
	}

	// We weren't able to parse it--return it as-is.

	return source;
}

/**
 * Render inserts in a text string. Inserts are a mixture of variable
 * interpolation and template helpers marked off by curly braces.
 *
 * The simplest insert is a variable name:
 *
 * `My favorite color is {color}.` => `My favorite color is red.` (assuming that
 * `color` is a defined variable)
 *
 * Inserts can also be syntax sugar for function calls:
 * ```
 * {restart link} {link to: "From the Top"} {link to: "From the Top", hidden: true}
 * ```
 *
 * Any number of extra arguments can be passed in `key: value` format. Keys must
 * be be able to be parsed as valid JavaScript object keys without being quoted,
 * and they may not be the same as the initial keyword (`restart` or `link to`
 * in the examples above). Inserts are set in the renderer as objects with two
 * keys:
 *
 * -   `match`: a regular expression matching the inital invocation, e.g.
 *     `/^restart\s+link/`. A match _must_ include whitespace so it can never
 *     conflict with a variable insert.
 * -   `render`: a function that takes a single argument, then props and raw
 *     contents of the insert; and returns string output. Some examples:
 * 	- `{restart link}` calls `render(null, {}, 'restart link')`
 *	- `{restart link, label: 'Try Again'}` calls `render(null, {label: 'Try
 *     Again}, "restart link, label: 'Try Again'")`
 * 	- `{link to: 'Secret Room'}` calls `render('Secret Room', {}, "link to:
 *     'Secret Room'")`
 * 	- `{link to: 'Secret Room', hidden: true}` calls `render('Secret Room',
 *      {hidden: true}, "link to: 'Secret Room', hidden: true")`
 *
 * If an insert can't be parsed successfully, it is left as-is.
 **/
export default function render(source: string, inserts: Insert[]) {
  let result = '';

  // startText is the index of the text before the first curly bracket;
  // startCurly is the index of the bracket.

  let startText = 0;
  let startCurly = source.indexOf('{');

  if (startCurly === -1) {
    return source;
  }

  // Scan forward until we reach:
  // -   another '{' outside of a string value, indicating that the original '{'
  //     isn't the start of an insert
  // -   a single or double quote, indicating the start of a string value
  // -   a '}' that isn't inside a string, indicating the end of a possible
  //     insert

  let inString = false;
  let stringDelimiter;

  for (let i = startCurly + 1; i < source.length; i++) {
    switch (source[i]) {
      case '{':
        if (!inString) {
          // Reset start variables for the next match.

          startCurly = i;
        }
        break;

      case '"':
      case "'":
        // Ignore backslashed quotes.

        if (i > 0 && source[i - 1] !== '\\') {
          // Toggle inString status as needed.

          if (!inString) {
            inString = true;
            stringDelimiter = source[i];
          } else if (inString && stringDelimiter === source[i]) {
            inString = false;
          }
        }
        break;

      case '}':
        if (!inString) {
          const renderSrc = source.substring(startCurly, i + 1);
          let insertResult = '';

          try {
            insertResult = renderInsert(renderSrc, inserts);
          } catch (error) {
            console.warn(
              `An error occurred while rendering "${renderSrc}": ${
                (error as Error).message
              }`
            );

            insertResult = renderSrc;
          }

          if (insertResult === undefined) {
            insertResult = '';
          }

          result += source.substring(startText, startCurly) + insertResult;

          // Advance start variables for the next match.

          startText = i + 1;
          startCurly = source.indexOf('{', startText);
          i = startCurly;

          if (startCurly === -1) {
            // There are no more open curly brackets left to examine.
            // Short-circuit the for loop to bring it to an end.

            i = source.length;
          }
        }
        break;

      // Take no action on normal characters.
    }
  }

  // Any remaining text in src must be plain text, not an insert.

  return result + source.substring(startText);
}
