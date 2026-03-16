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

## Modifiers Normally Create Paragraphs
Modifiers normally cause the text that follows them to be in a separate paragraph from the text before it. There are cases, though, where you want text to appear with the preceding paragraph instead. The `append` modifier makes this happen.

```
You've solved the mystery at last.

[after 500ms; append]
But then it hits you: why _did_ Mrs. Peacock have a lead pipe in her purse?
```

The semicolon allows you to join multiple modifiers together in a single line. It's equivalent to:

```
[after 500ms]
[append]
But then it hits you: why _did_ Mrs. Peacock have a lead pipe in her purse?
```

It doesn't matter which order you put `append`, and unlike `after`, you enter it by itself, without any extra explanation.

[will not let me go]: http://ifarchive.org/if-archive/games/competition2017/Will%20Not%20Let%20Me%20Go/Will%20Not%20Let%20Me%20Go.html

[^1]: Including, fiendishly, days, months, and years. Chapbook uses a library called `timestring` to parse these delays. [Its documentation](https://github.com/mike182uk/timestring/blob/master/README.md#keywords) lists out all of the possibilities.
