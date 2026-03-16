# Delayed Text

You can also use a modifier to cause part of the text of a passage to appear after a delay. If you've never seen this effect before, take a look at the introduction to Stephen Granade's _[Will Not Let Me Go]_. The sentences fade in and out, leaving you with a single word, "remember." Although that story wasn't built with Chapbook, you can use Chapbook's delayed text functionality to achieve the same effect.

Here's an example of this modifier in action:

```
You settle in for the long transatlantic flight.

[after 1 second]
You remember suddenly that you left the stove on at home.
```

The text `[after 1s]` is never shown to the player. Instead, Chapbook displays `You remember suddenly that you left the stove on at home.` after the previous text has been onscreen for one second.

You can put any measurement of time you want in the `after` modifier[^1], and you can abbreviate the units of time. The below are all valid:

```
[after 300 milliseconds]
[after 300ms]
[after 1 minute]
```

The `after` modifier only allows round numbers. Instead of writing `1.5 seconds`, you must write `1 second 500 milliseconds`, or shorter: `1s500ms` or `1500ms`.

## Advice on Using `after`

The `after` modifier should be used sparingly, and the delays should be specified keeping in mind that everyone reads a different pace. One minute may not seem very long, but it's an eternity for fast players.

Chapbook signals that more text will be coming by displaying an animated watch in the lower-right corner of the page, and impatient players can click the mouse or press a key to skip over the delay. This functionality cannot be disabled.

## 修饰符通常创建段落｜Modifiers Normally Create Paragraphs

修饰符通常会使紧随其后的文本与前文处于不同的段落中。不过，在某些情况下，您可能希望文本与前一段落一起显示。`append` 修饰符可以实现这一效果。

```
你终于解开了这个谜团。

[after 500ms; append]
但随后你突然意识到：为什么皮考克夫人的手提包里会有一根铅管呢？
```

分号允许您将多个修饰符连接在同一行中。它相当于：

```
[after 500ms]
[append]
但随后你突然意识到：为什么皮考克夫人的手提包里会有一根铅管呢？
```

无论您以何种顺序放置 `append` 修饰符，这都无关紧要；与 `after` 不同，您可以单独输入它，无需任何额外说明。

[will not let me go]: http://ifarchive.org/if-archive/games/competition2017/Will%20Not%20Let%20Me%20Go/Will%20Not%20Let%20Me%20Go.html

[^1]: 包括，令人头疼的是，日、月、年。Chapbook使用一个名为 `timestring` 的库来解析这些延迟。其[文档](https://github.com/mike182uk/timestring/blob/master/README.md#keywords)列出了所有可能性。