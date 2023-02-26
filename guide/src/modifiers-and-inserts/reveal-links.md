# Reveal Links

A link can also reveal more text in your passage instead of displaying an entirely different one. Liza Daly uses this effect in _[Stone Harbor]_ (a story she created using another authoring system called [Windrift]) to give the story a novelistic feel.

Chapbook calls these _reveal links_, and they can either display more text or the contents of an entire passage.

To display more text, write:

```
I was driving home late one night when {reveal link: 'something odd occurred', text: 'I saw five deer staring at me from one side of the road, all in a line'}.
```

This will first display "I was driving home late one night when something odd occurred," and then when the player selected "something odd occurred," it will change to "I was driving home late one night when I saw five deer staring at me from one side of the road, all in a line."

The text you enter in either part of the insert will be interpreted as source code, so you can use [formatting] to further customize its appearance.

Revealing text works well for short substitutions, but writing long stretches of text can be awkward. In these instances, try revealing a passage:

```
I was driving home late one night when {reveal link: 'something odd occurred', passage: 'A Dangerous Incident'}.
```

This will work the same way as the previous example, only it will show the contents of the passage named 'A Dangerous Incident'.

{% hint style='info' %}
A passage shown by a reveal link will not be recorded in a session's history.
</aside>

When using a reveal link with a passage containing multiple paragraphs, Chapbook inserts the paragraphs in such a way that the surrounding text's order is maintained.

For example, if you have a passage named 'Shopping List':

```
Apples

Bananas

Carrots
```

and then a passage with this:

```
I went to buy {reveal link: 'groceries', passage: 'Shopping List'}. It was a rainy day.
```

The player will see this after they click the link:

> I went to buy Apples
>
> Bananas
>
> Carrots. It was a rainy day.

Notice how the period after the link insert is moved to the end, after Carrots, but not on a line by itself, and the rest of the paragraph continues.

[stone harbor]: https://stoneharborgame.com/
[windrift]: https://github.com/lizadaly/windrift
[formatting]: ../text-and-links/text-formatting.md