/*
A function to render _inserts_ in a text string. Inserts are a mixture of
variable interpolation and template helpers marked off by curly braces.

The simplest insert is a variable name:

My favorite color is {color}. => My favorite color is red.
(assuming that color is a defined variable)

Inserts can also be syntax sugar for function calls:

{restart link}
{link to: "From the Top"}
{link to: "From the Top", hidden: true}

Any number of extra arguments can be passed in `key: value` format. Keys must be
be able to be parsed as valid JavaScript object keys without being quoted, and
they may not be the same as the initial keyword (`restart` or `link to` in the
examples above). Inserts are set in the renderer as objects with two keys:

-	`match`: a regular expression matching the inital invocation, e.g.
	/^restart\s+link/. A match _must_ include whitespace so it can never conflict
	with a variable insert.
-   `render`: a function that takes a single argument, then props and raw
    contents of the insert; and returns string output. Some examples:
	-	`{restart link}` calls `render(null, {}, 'restart link')`
    -   `{restart link, label: 'Try Again'}` calls `render(null, {label: 'Try
        Again}, "restart link, label: 'Try Again'")`
    -   `{link to: 'Secret Room'}` calls `render('Secret Room', {}, "link to:
        'Secret Room'")`
    -   `{link to: 'Secret Room', hidden: true}` calls `render('Secret Room',
        {hidden: true}, "link to: 'Secret Room', hidden: true")`

If an insert can't be parsed successfully, it is left as-is.
*/

import {get} from '../state';

export default function render(src, inserts) {
	return src.replace(/\{\s*(.+?)\s*\}/gm, (original, invocation) => {
		if (/\s/.test(invocation)) {
			// This can only be a function call.

			const keyword = invocation.match(/^[^:,]+/)[0];
			const insert = inserts.find(i => i.match.test(keyword));

			if (insert) {
				// Parse out the arguments.

				const args = invocation.replace(keyword, '');

				if (args[0] === ':') {
					/*
					We're looking at a `{keyword that can have spaces: value,
					foo: value, bar: value}` invocation. We need to massage it
					so that the entire string can be parsed as a JavaScript
					object. Note restriction above about named args not having
					the same name as the initial invocation, e.g. {foo: 'bar',
					foo: 'baz'} is not a valid insert syntax in source code.
					*/

					const props = new Function(
						`return {"${keyword}" ${args}}`
					)();

					const firstArg = props[keyword];

					delete props[keyword];
					return insert.render(firstArg, props, invocation);
				} else if (args[0] === ',') {
					// This is a `{keyword, foo: value, bar: value}` invocation.

					const props = new Function(`return {${args.substr(1)}}`)();

					return insert.render(null, props, invocation);
				} else if (args === '') {
					// This is a `{keyword}` invocation.

					return insert.render(null, {}, invocation);
				}
			}
		} else {
			// This can only be a variable.

			const value = get(invocation);
			console.log(invocation, value);

			if (value !== undefined) {
				return value;
			}
		}

		// We weren't able to parse it-- return it as-is.

		return original;
	});
}
