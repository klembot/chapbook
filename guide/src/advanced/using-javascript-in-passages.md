# Using JavaScript in Passages

As a last resort, Chapbook allows you to mix JavaScript into the text of your passage. To do this, use a `[JavaScript]` modifier:

```
[JavaScript]
document.title = 'A Sticky Pickle';

[continued]
"Oh dear," you think to yourself. "That stain will never come out."
```

The JavaScript modifier normally does not output anything in Chapbook; however, if you would like to output text, the modifier provides a function `write()`--just plain `write()`, not `document.write()`--that will output HTML source code. Text output via `write()` _will_ be processed for links and Markdown.

Below is an example showing how `write()` works:

```
Before you lose your temper, you count to yourself:

[JavaScript]
for (let i = 1; i <= 10; i++) {
	write(i + '... ');
}
```

You can refer to variables defined in vars sections as you would expect in JavaScript. Changing them in JavaScript will persist changes as you'd expect, as well.

```
color: 'red
--
[JavaScript]
write(`The sky is ${color}.`);
```

As a result, if you would like your JavaScript code to communicate back with the rest of your story, the easiest way to do this is to set the variable to an initial value in a vars section. If you absolutely need to create new variables in JavaScript, you can call `engine.state.set()` as below. This usage may change in future versions of Chapbook, though, whereas setting a variable initially in a vars section will always work.

```
[JavaScript]
let color = 'red';
engine.state.set('weather', 'sunny');

[continued]
It was a {weather} day. The sky was {color}.
```

This would display:

> It was a sunny day. The sky was {color}.

`{color}` is displayed as-is because if Chapbook cannot find a matching insert or variable name, it displays the source text as it was entered. Any variables declared using `let` or `const` will *not* be visible to other Chapbook code, and will not be persisted across browser sessions.