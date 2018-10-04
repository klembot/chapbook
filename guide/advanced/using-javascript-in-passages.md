# Using JavaScript in Passages

As a last resort, Chapbook allows you to mix JavaScript into the text of your passage. To do this, use a code fence (three backticks on a single line, then your code, then another three backticks on a separate line):

<pre><code>```
document.title = 'A Sticky Pickle';
```

"Oh dear," you think to yourself. "That stain will never come out."</code></pre>

JavaScript blocks normally do not output anything in Chapbook; however, if you would like them to output text, it provides a function `write()`--just plain `write()`, not `document.write()`--that will output HTML source code. Text output via `write()` will _not_ be processed as Markdown.

Below is an example showing how `write()` works:

<pre><code>Before you lose your temper, you count to yourself:

```
for (let i = 1; i &lt;= 10; i++) {
	write(i + '... ');
}
```</code></pre>