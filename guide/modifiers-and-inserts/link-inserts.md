# Link Inserts

Sometimes you'd like to link to a passage, but don't know its name exactly. Take the passage below:

```
You walk a bit down the alleyway. The scent of the black trash bags simmering in the summer heat is overpowering--terrible in three separate yet indescribable ways--so you [[retreat for now]].
```

All well and good, except that alleyways often have two entrances. If a player could reach this passage two different ways, how can you make sure they return to the right place? You can use an _insert_ to do this. Inserts are special instructions in passage text that are framed with curly brackets, `{like this}`, and are interpreted instead of displayed verbatim. They're called inserts because they instruct Chapbook to insert something into the text for you. In this case, we want Chapbook to insert a link to whatever passage the player was looking at before they reached this one.

In this case, we'd write:

```
You walk a bit down the alleyway. The scent of the black trash bags simmering in the summer heat is overpowering--terrible in three separate yet indescribable ways--so you {back link, label: 'retreat for now'}.
```

Inserts follow this format:

<p class="insert-example">
	<span class="punc">{</span>
	<span class="identifier">insert name</span>
	<span class="punc">:</span>
	<span class="direct-object">value</span>
	<span class="punc">,</span>
	<span class="param1">
		<span class="param-name">parameter name</span>
		<span class="punc">:</span>
		<span class="param-value">value</span>
	</span>
	<span class="punc">,</span>
	<span class="param2">
		<span class="param-name">parameter name</span>
		<span class="punc">:</span>
		<span class="param-value">value</span>
	</span>
	<span class="punc">}</span>
</p>

-   The *insert name* signals what type of insert this is, i.e. `back link`.
-   *Parameter names* signal more specific descriptions of how the insert should
    appear or behave, i.e. `label`. Each kind of insert accepts different
    parameter names. Parameter names, unlike values, never have quotation marks
    around them. An insert can have any number of parameters, including none.
    Two are shown in the example above to demonstrate that they are divided by
    commas.
-   *Values* are where you specify the behavior of the insert. If a parameter
    value is text--like the words `'retreat for now'`--they must have either
    single or double quotation marks around them, so that Chapbook knows where
    the beginning and end of the text is. There's no difference in how single or
    double quotation marks are handled; it's just convenient to write `{back
    link, label: 'Exclaim, "Well, I never!"'}`.[^1] Any other types of values,
    such as numbers, must not have quotation marks around them. 

An insert must have its contents all on one line--no line breaks with the Enter or Return key are permitted.

Everything in the example above is optional except the insert name. Different inserts use different variations of this usage--for instance, the `back link` insert does not use a value following the insert name:

<p class="insert-example">
	<span class="punc">{</span>
	<span class="identifier">back link</span>
	<span class="punc">,</span>
	<span class="param1">
		<span class="param-name">label</span>
		<span class="punc">:</span>
		<span class="param-value">'retreat for now'</span>
	</span>
	<span class="punc">}</span>
</p>

You can also leave off the `label` property and just write `{back link}`: in this case, Chapbook will assume you'd like it to use the word 'Back' as the link label.

If Chapbook is unable to understand the contents of an insert, it displays it as-is. This is so that you can otherwise use curly brackets in your text.

{% hint style='danger' %}
You cannot nest inserts inside each other.
{% endhint %}

## Restarting the Story

There's another insert very similar to `{back link}` that's named `{restart link}`. Instead of going to a previous passage, it takes the player back to the very beginning of the story. You could of course link back to the first passage by name, but for now, consider this a handy shortcut. `{restart link}` also resets other aspects of Chapbook's operation, as you'll learn in [Continuity Between Sessions](../state/continuity.md).

As with `{back link}`, `{restart link}` allows you to specify a label:

```
{restart link, label: 'Oh forget it all'}
```

If you write `{restart link}` by itself, Chapbook will use the label 'Restart'.

## Manual Links

You can also insert a link using the insert `{link to}`. Below are some examples:

```
You decide after entirely too much deliberation to download {link to: 'https://mozilla.org/firefox', label: 'Firefox'}.

You notice that there is a {link to: 'narrow alleyway'} off to one side.

A {link to: 'Bryan Mills', label: 'A man with *certain* skills'} is just who's needed.
```

The third example demonstrates one use of manual link inserts: although they are more verbose than simple links, they do allow you to enter Markdown formatting into the link label. Passage links also have other uses; see [The Vars Section][vars-in-inserts] for how you can change the destination of a link dynamically.

## Cycling Links

Chapbook has an insert for cycling links--that is, links that do not move the player anywhere, but change their label. See [Menus and Cycling Links][cycling] for more information.

[vars-section]: ../state/the-vars-section.html
[cycling]: ../player-input/menus-cycling-links.md
[vars-in-inserts]: ../state/the-vars-section.html#expressions-can-be-used-in%20inserts

[^1]: If you need to use a single or double quote inside a text value set off with the same punctuation mark, put a backslash (`\`) in front of it, like so: `{back link, label: '"I couldn\'t possibly comment," he replied.'}`

<style>
.insert-example {
	font-size: 120%;
	text-align: center;
	display: flex;
	justify-content: center;
}

.insert-example span {
	display: flex;
}

.insert-example .punc {
	padding: 0 0.2em;
	color: #868e96; /* gray-6 */
	background-color: #f1f3f5; /* gray-1 */
}

.insert-example .identifier {
	padding: 0 0.2em;
	background-color: #ffe3e3; /* red-1 */
}

.insert-example .direct-object, .insert-example .param-value {
	padding: 0 0.2em;
	background-color: #d0ebff; /* blue-1 */
}

.insert-example .param-name {
	padding: 0 0.2em;
	background-color: #ffe8cc; /* orange-1 */
}
</style>