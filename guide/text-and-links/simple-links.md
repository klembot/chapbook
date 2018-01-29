# Simple Links
At the heart of every Twine story are links. Chapbook follows the Twine conventions for typing links, which is to say, it steals shamelessly from the syntax used by wikis everywhere.

The simplest link notation surrounds a name of a passage with double square brackets: `[[A tiny door]]`. This displays the title of the passage directly in the text.

Sometimes it makes sense to obscure the name of the destination in the text--perhaps because your passage is named `A Grisly End`, or the title of the passage is capitalized but you'd like to link it in the middle of a sentence. You can do this in two different, but equivalent ways.

Typed | Displayed
------|----------
`You [[open the door->A Grisly End]] with great confidence.` | You <a href="javascript:void(0)">open the door</a> with great confidence.
`The [[Miss Scarlet<-young lady]] seated in the chaise seems inexplicably guilty to you.` | The <a href="javascript:void(0)">young lady</a> seated in the chaise seems inexplicably guilty to you.

(The links don't lead anywhere in the examples above, of course.)

The easiest way to remember this is to think ofthen arrow pointing to the passage you're linking to. It doesn't matter which direction the arrow points; use the syntax that feels most comfortable to you.

You cannot use [Markdown or other formatting characters](formatting) inside a link. If you'd like to italicize a certain link, for example, put the formatting around the link instead, i.e. `_[[a friend of a friend]]_`.

## External links
To link to another web page, enter a URL instead of a passage name. You can use any link syntax you'd like, though the arrow syntax makes your text more readable in most cases:

Typed                                                       | Displayed
------------------------------------------------------------|----------
`You [[open Twine->https://twinery.org]] on your computer.` | You <a href="https://twinery.org">open Twine</a> on your computer.

## Older link syntax
Chapbook also supports the link syntax from Twine 1 that used a vertical bar (or pipe character):

Typed | Displayed
------|----------
`You [[open the door|A Grisly End]] with great confidence.` | You <a href="javascript:void(0)">open the door</a> with great confidence.

This is harder to remember than the arrow syntax, so there's little reason to use it now unless you learned it from Twine 1.

## More Complex Scenarios
Chapbook also allows you to create links that:

* Take the player to the passage the player had just come from
* Take the player to a passage chosen on-the-fly (for example, to choose randomly from a set of passages)
* restart the story
* run custom JavaScript

Doing any of the above requires some coding; see *** TBD *** for details.