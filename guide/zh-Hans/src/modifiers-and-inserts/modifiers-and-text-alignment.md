# Modifiers and Text Alignment

One thing not mentioned in the previous section is how you would center text, or even right-align it. Alignment was never part of the original version of Markdown, and so various dialects of Markdown use their own notation for it.[^1]

Chapbook uses a general-purpose notation called a _modifier_ to apply special handling to blocks of text. Modifiers are always single lines that begin and end with square brackets[^2], like so:

```
Above the cave mouth, someone has carved:

[align center]
_Lasciate ogne speranza, voi ch'intrate_
```

The text `[align center]` is never shown to the player. Instead, Chapbook centers the text following it. As you might have guessed, you can also write `[align right]` and `[align left]`.

## `continue` 修饰符｜The `continue` modifier

修饰符会应用于其后出现的所有文本，直到段落结束或源文本中出现另一个修饰符。若要取消所有生效的修饰符，请使用 [continue] 如下所示：

```
洞口上方，有人刻着：

[align center]
_Lasciate ogne speranza, voi ch'intrate（来者需要放弃一切希望）_

[continue]
你对你的计划感到有点不那么自信了。
```

`[continue]` 仅用于取消所有生效的修饰符。可缩写为 `[cont'd]` 或 `[cont]`。

王洛木：简单来说，就是用来划清上一个修饰符的修饰范围的。

## Vertical text alignment

If you'd like to change how text is aligned vertically inside the page
container, see the [Page Style](../customization/page-style.html) section.

[^1]: Twine 2's default format, Harlowe, for instance, uses punctuation like ` =><= ` on the preceding line to indicate centered text, while other Markdown dialects put arrows around centered text, like `->SALE TODAY<-`.
[^2]: If you'd like to show players a line of text with brackets in it, enter a single backslash (`\`) at the start of the line. Chapbook will display the text as-is without the backslash you entered.
