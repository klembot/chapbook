# Text Formatting
Of course, you can type paragraphs into a Twine passage in Chapbook and it will display them as you would expect. But for other kinds of formatting, such as bold or italics, Chapbook follows the syntax of a popular markup language called [Markdown](markdown).

The term 'markup language' might sound complex, but in reality it's just a set of conventions of how to represent formatting in plain text. For example, to make part of your text italicized when displayed, you simply type asterisks around it, `*like so*`.

If you've never used Markdown before, try using the [dingus](dingus) as you read this section. It'san online playground with a funny name that not only allows you to quickly see how text will be rendered, but also has a cheatsheet that summarizes the different formatting available to you. Bear in mind, however, that Chapbook has a few extra formatting options available to you above and beyond the standard Markdown set.

## Italics and Boldface
To italicize a a phrase, type `*` or `_` (a single underscore)[^1] around it.

Typed                     | Displayed
--------------------------|------------------------
`_Unconventional_ tastes` | _Unconventional_ tastes
`*Unconventional* tastes` | *Unconventional* tastes

To make a phrase boldface, type `**` or `__` (two underscores) around it.

Typed                       | Displayed
----------------------------|------------------------
`__Unconventional__ tastes` | __Unconventional__ tastes
`**Unconventional** tastes` | **Unconventional** tastes

It doesn't matter whether you use asterisks or underscores, so long as you're consistent in a single usage, and you can mix and match them in your text.

Typed                                  | Displayed
---------------------------------------|-------------------------------------
`**"I'll _murder_ you,"** she hissed.` | **"I'll _murder_ you,"** she hissed.

## Small Caps
If you'd like to set some text in small caps--another type of emphasis sometimes used for text characters see in a story--type `~~` (two tildes) around it.

Typed                                          | Displayed
-----------------------------------------------|-------------------------------------
`Above the door was a ~~NO TRESPASSING~~ sign.` | Above the door was a <span style="font-size: 70%; text-transform: uppercase; letter-spacing: 0.08em">NO TRESPASSING</span> sign.

This convention, though not a part of original recipe Markdown, conflicts with some other Markdown dialects, which use `~~` for struck-out text, ~~like so~~. To do this, type `<del>` and `</del>` around your text:

Typed | Displayed
------|----------
`At the bottom of the page, nearly completely covered by the government censor's pen, was that same code name you had seen before: <del>S-5900</del>.` | At the bottom of the page, nearly completely covered by the government censor's pen, was that same code name you had seen before: <del>S-5900</del>.


## Section Breaks
A convention sometimes used in publishing to indicate a new scene, or a new line of thought is to separate the text using a series of asterisks, like this:

> It had been a long day, and I fell asleep nearly instantly.
> <p style="text-align: center">* &nbsp; * &nbsp; *</p>
> The following morning was no better than the day before.

To add a section break to your text, type `---` (three dashes) on a line by itself.

## Block Quotations
To indent a long quotation, put `>` (a greater-than symbol) in front of each line.

Typed | Displayed
------|----------
<code>&gt; Call me Ishmael. Some years ago--never mind how long precisely--having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.</code> | <blockquote>Call me Ishmael. Some years ago--never mind how long precisely--having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.</blockquote>

## Lists
To created a bulleted list (or, in the parlance of the web, an unordered list), type `*`, `-`, or `+` at the beginning of a new line. It doesn't matter which character you use, but you do need to be consistent in each list.

<table>
	<thead><tr><th>Typed</th><th>Displayed</th></tr></thead>
	<tbody>
	<tr><td><code>* Red<br>* Green<br>* Blue</code></td><td><ul><li>Red</li><li>Green</li><li>Blue</li></ul></td></tr>
	</tbody>
</table>

To create a numbered list (also known as an ordered list), start each line either with a number and a period, or just a `#`. The numbering you use doesn't actually matter--you can have two items starting with `2.` and the list will still be numbered correctly.

<table>
	<thead><tr><th>Typed</th><th>Displayed</th></tr></thead>
	<tbody>
	<tr><td><code># Red<br># Green<br># Blue</code></td><td><ol><li>Red</li><li>Green</li><li>Blue</li></ol></td></tr>
	<tr><td><code>1. Red<br>2. Green<br>3. Blue</code></td><td><ol><li>Red</li><li>Green</li><li>Blue</li></ol></td></tr>
	</tbody>
</table>

Why bother to specially format a numbered list? Just like in word processors, using this format will cause each item to be nicely indented, so that the second line of text of each item appears to the right of the initial number.

## Ignoring Formatting Characters
Occasionally you'll want to use Markdown formatting characters as-is, without them initiating formatting. The simplest way to do this is to put a `\` (backslash) in front of them.

Typed                       | Displayed
----------------------------|------------------------
`\*\* PLEASE EXIT NOW \*\*` | \*\* PLEASE EXIT NOW \*\*

## Other Custom Styling
You can also enter HTML into a passage without any extra code surrounding it. It will be displayed exactly as you type it in.

Markdown has a quirk where if you enter Markdown code inside of an inline element such as `<b>` or `<span>`, it will convert it to HTML. But in block elements such as `<p>` or `<div>`, it won't.

[^1]: Underscores as italics have a tangled history behind them; they resemble underlines, which were more-or-less invented as a workaround for typewriters being unable to italicize words.

## Code Blocks Don't Behave As You Might Expect
If you're already familiar with Markdown, you might know that you can normally put backticks (<code>`</code>) around text to put it in a monospaced font, `like this`. However, you'll find that if you do this in Chapbook, the text you enter won't display at all. This is because Chapbook interprets these blocks as special instructions. See **TBD** for more information on this.

In the meantime, just be aware that if you are looking for text to appear as though it's been typed, put `<code>` and `</code>` around it.

Typed                        | Displayed
-----------------------------|------------------------
`<code>echo "hello"</code>`  | `echo "hello"`

[markdown]: https://daringfireball.net/markdown
[dingus]: https://daringfireball.net/projects/markdown/dingus
[smallcaps]: https://practicaltypography.com/small-caps.html