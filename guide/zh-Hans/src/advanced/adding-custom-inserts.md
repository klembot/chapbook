# Adding Custom Inserts

Chapbook can be extended with custom inserts. Below is code that adds a `{smiley face}` insert that displays a 😀 emoji.

```
[JavaScript]
engine.extend('2.0.0', () => {
	engine.template.inserts.add({
		match: /^smiley face$/i,
		render: () => '😀'
	});
});
```

You can also place code like this into your story's JavaScript in Twine--this uses the `[JavaScript]` modifier for clarity.[^1]

First, any extension of the Chapbook engine must be wrapped in a `engine.extend()` function call. The first argument is the minimum version of Chapbook required to make your insert work; this is so that if you share your customization, anyone plugging it into a Chapbook version it won't work in will receive a harmless warning, instead of the engine crashing with an error. Chapbook follows [semantic versioning](https://semver.org/) to assist with this.

The second argument to `engine.extend()` is the customization code you'd like to run. In this function, we add a new insert, which is an object with two properties:

-   `match`: a regular expression that the template engine will look for to
    render your insert. Leave out the curly braces; the template engine will
    take care of this for you. Inserts must always have at least one space in
    their `match` property, so that they can never be mistaken for a variable
    insert.
-   `render`: a function that returns a string for what should be displayed. The
    returned value will be eventually rendered as Markdown.

You may remember that inserts [can take multiple parameters](../modifiers-and-inserts/link-inserts.md). Here's a more complex example that demonstrates this:

```
[JavaScript]
engine.extend('2.0.0', () => {
	engine.template.inserts.add({
		match: /^icon of/i,
		render(firstArg, props, invocation) {
			let result = '';

			if (firstArg.toLowerCase() === 'wizard') {
				result = '🧙';
			}

			if (firstArg.toLowerCase() === 'vampire') {
				result = '🧛';
			}

			switch (props.mood.toLowerCase()) {
				case 'anger':
					result += '💥';
					break;

				case 'love':
					result += '❤️';
					break;
			}

			return result;
		}
	});
});
```

This has the following effect:

| Typed                                 | Displayed |
| ------------------------------------- | --------- |
| `{icon of: 'wizard'}`                 | 🧙        |
| `{icon of: 'wizard', mood: 'anger'}`  | 🧙💥      |
| `{icon of: 'wizard', mood: 'love'}`   | 🧙❤️      |
| `{icon of: 'vampire'}`                | 🧛        |
| `{icon of: 'vampire', mood: 'anger'}` | 🧛💥      |
| `{icon of: 'vampire', mood: 'love'}`  | 🧛❤️      |

First, notice that the `match` property doesn't try to match the entire insert; it just needs to be able to distinguish this insert from any other entered. Also, remember that the first part of the insert needed to be two words, `icon of`, to distinguish it from a variable insert.

Then, the `render()` property takes three new arguments, `firstArg`, `props`, and `invocation`. `firstArg` is the parameter given to the first part of the insert, and `props` is an object listing out all other parameters given in the insert. The names of properties are case-sensitive, so `{icon of: 'wizard', Mood: 'anger'}` would only display 🧙. The final argument, `invocation`, is the entire text of the insert exactly as it was typed, except for the surrounding curly braces. This is provided so that if neither `firstArg` or `props` is enough to achieve the effect you're looking for, you can look at `invocation` directly.

Below are some examples as to how these arguments work in practice.

| Typed                                   | firstArg  | props             | invocation                            |
| --------------------------------------- | --------- | ----------------- | ------------------------------------- |
| `{smiley face}`                         | `null`    | `{}`              | `smiley face`                         |
| `{smiley face: 'happy'}`                | `'happy'` | `{}`              | `smiley face: 'happy'`                |
| `{smiley face, size: 'large'}`          | `null`    | `{size: 'large'}` | `smiley face, size: 'large'`          |
| `{smiley face: 'happy', size: 'large'}` | `'happy'` | `{size: 'large'}` | `smiley face: 'happy', size: 'large'` |

[^1]: Word of warning--you cannot define an insert in the same passage that you use it in.