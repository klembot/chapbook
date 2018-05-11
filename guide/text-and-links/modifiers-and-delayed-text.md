# Modifiers and Delayed Text

Markdown and links aren't everything you can do with Chapbook. This section introduces a new concept, _modifiers_, that you'll use more once you begin adding code to your stories. But for now, this sectiont will show how to use a modifier to cause part of your passage to appear after a time delay.

If you've never seen this effect before, take a look at the introduction to Stephen Granade's _[Will Not Let Me Go]_. The sentences fade in and out, leaving you with a single word, "remember." Although that story wasn't built with Chapbook, you can use Chapbook's delayed text functionality to achieve the same effect.

A modifier is an instruction in your text that only Chapbook sees. Modifiers are always single lines that begin and end with square brackets[^1], like so:

```
You settle in for the long transatlantic flight.

[after 1 second]
You remember suddenly that you left the stove on at home.
```

The text `[after 1s]` is never shown to the player. Instead, Chapbook displays `You remember suddenly that you left the stove on at home.` after the previous text has been onscreen for one second. The _after_ modifier handles this behavior for you.

You can put any measurement of time you want in the after modifier[^2], and you can abbreviate the units of time. The below are all valid:

```
[after 300 milliseconds]
[after 300ms]
[after 1 minute]
```

The `after` modifier only allows round numbers. Instead of writing `1.5 seconds`, you must write `1 second 500 milliseconds`, or shorter: `1s500ms` or `1500ms`.

## Advice on using `after`

The `after` modifier should be used sparingly, and the delays should be specified keeping in mind that everyone reads a different pace. One minute may not seem very long, but it's an eternity for fast players.

As a hint to impatient players that there is more to come, Chapbook displays a progress spinner at the bottom of the page. Players can also click or tap anywhere on the page to skip past the delay. TODO how to disable this and why you shouldn't

## Modifiers normally create paragraphs
Modifiers normally force the text that follows it to be in a separate paragraph from the text before it. There are cases, though, where you want text to appear with the preceding paragraph instead. The `append` modifier makes this happen.

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

[^1]: If you'd like to show players a line of text with brackets in it, enter a single space at the start of the line. Chapbook will display the text as-is without the space you entered.
[^2]: Including, fiendishly, days, months, and years. Chapbook uses a library called `timestring` to parse these delays. [Its documentation](https://github.com/mike182uk/timestring/blob/master/README.md#keywords) lists out all of the possibilities.
