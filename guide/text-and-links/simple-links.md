# Simple Links
At the heart of every Twine story are links. Chapbook follows the Twine conventions for typing links, which is to say, it steals shamelessly from the syntax used by wikis everywhere.

The simplest link notation surrounds a name of a passage with double square brackets: `[[A tiny door]]`. This displays the title of the passage directly in the text.

Sometimes it makes sense to obscure the name of the destination in the text--perhaps because your passage is named `A Grisly End`, or the title of the passage is capitalized but you'd like to link it in the middle of a sentence. You can do this in two different, but equivalent ways.

Typed | Displayed
------|----------
`You [[open the door->A Grisly End]] with great confidence.` | You <a href="javascript:void(0)">open the door</a> with great confidence.
`The [[Miss Scarlet<-young lady]] seated in the chaise seems inexplicably guilty to you.` | The <a href="javascript:void(0)">young lady</a> seated in the chaise seems inexplicably guilty to you.

(The links don't lead anywhere in the examples above, of course.)

The easiest way to remember this is to think of the arrow pointing to the passage you're linking to. It doesn't matter which direction the arrow points; use the syntax that feels most comfortable to you.

You cannot use [Markdown or other formatting characters][formatting] inside a simple link. If you'd like to italicize a certain link, for example, put the formatting around the link instead, i.e. `_[[a friend of a friend]]_`. See [Link Inserts][../modifiers-and-inserts/link-inserts.md] for how to create a link that has formatting inside it, like <a href="javascript:void(0)">a man with <em>particular</em> skills</a>.

## External Links
To link to another web page, enter a URL instead of a passage name. You can use any link syntax you'd like, though the arrow syntax makes your text more readable in most cases:

Typed                                                       | Displayed
------------------------------------------------------------|----------
`You [[open Twine->https://twinery.org]] on your computer.` | You <a href="https://twinery.org">open Twine</a> on your computer.

## Older Link Syntax
Chapbook also supports the link syntax from Twine 1 that used a vertical bar (or pipe character):

<table>
<thead>
<tr>
<th>Typed</th>
<th>Displayed</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>You [[open the door|A Grisly End]] with great confidence.</code>
<td>
You <a href="javascript:void(0)">open the door</a> with great confidence.
</td>
</tr>
<tbody>
</table>

This is harder to remember than the arrow syntax, so there's little reason to use it now unless you learned it from Twine 1.

<style>
tr, td {
	width: 50%;
}
</style>
