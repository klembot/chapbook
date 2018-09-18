# Modifiers and Text Alignment

One thing not mentioned in the previous section is how you would center text, or even right-align it. Alignment was never part of the original version of Markdown, and so various dialects of Markdown use their own notation for it.[^1]

Chapbook uses a general-purpose notation called a _modifier_ to apply special handling to blocks of text. Modifiers are always single lines that begin and end with square brackets[^2], like so:

```
Above the cave mouth, someone has carved:

[align center]
_Lasciate ogne speranza, voi ch'intrate_
```

The text `[align center]` is never shown to the player. Instead, Chapbook centers the text following it. As you might have guessed, you can also write `[align right]` and `[align left]`.

## The `continue` modifier

Modifiers apply to all the text that follow them, until either the end of the passage or another modifier appears in the source text. To cancel all active modifiers, use `[continue]` like so:

```
Above the cave mouth, someone has carved:

[align center]
_Lasciate ogne speranza, voi ch'intrate_

[continue]
You feel a little less confident in your plan.
```

`[continue]` simply cancels all active modifiers. You can abbreviate it as `[cont'd]` or `[cont]`.

[^1]: Twine 2's default format, Harlowe, for instance, uses punctuation like ` =><= ` to indicate centered text, while other Markdown dialects put arrows around centered text, like `->SALE TODAY<-`.
[^2]: If you'd like to show players a line of text with brackets in it, enter a single backslash (`\`) at the start of the line. Chapbook will display the text as-is without the backslash you entered.
