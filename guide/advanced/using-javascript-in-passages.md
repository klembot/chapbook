# Using JavaScript in Passages

As a last resort, Chapbook allows you to mix JavaScript into the text of your passage. To do this, use a `[JavaScript]` modifier

```
[JavaScript]
document.title = 'A Sticky Pickle';

[continued]
"Oh dear," you think to yourself. "That stain will never come out."
```

The JavaScript modifier normally do not output anything in Chapbook; however, if you would like to output text, the modifier provides a function `write()`--just plain `write()`, not `document.write()`--that will output HTML source code. Text output via `write()` _will_ be processed for links and Markdown.

Below is an example showing how `write()` works:

```
Before you lose your temper, you count to yourself:

[JavaScript]
for (let i = 1; i <= 10; i++) {
	write(i + '... ');
}
```