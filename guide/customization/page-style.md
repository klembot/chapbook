# Page Style

On sufficiently wide web browser windows, Chapbook will add horizontal margins around the text of your story so that it's comfortable to read. The exact width of the text column is based upon the font size that's set in `config.style.page.font`. You can control the appearance around the text through several variables.

First, the variable `config.style.page.style` takes one of several possible values:

- `'none'` creates no visible border around the page content
- `'thin-line'` and `'thick-line'` create flat borders around the content
- `'shadow'` adds a drop shadow around the content.

Chapbook's default appearance is `'shadow'`.

If you use `'thin-line'` or `'thick-line'`, you can specify the color of the line using the variable `config.style.page.borderColor`. This should be set to a single [color].

The variable `config.backdrop` sets the [color] of the area around the text content. On smaller browser windows (especially mobile devices), this area is not visible, however.

When the story shows a new passage, it creates a transition between text based on what is set in the `config.body.transition.name` variable:

- `'crossfade'` causes the old text to fade out at the same time that the new text fades in
- `'fadeInOut'` causes the old text to fade out, then the new text to fade in
- `'none'` causes the new text to replace the old text immediately

Chapbook's default transition is `'crossfade'`.

If you use `'crossfade'` or `'fadeInOut'`, you can control how long the transition takes by setting `config.body.transition.duration`, which should be a string in the same format that the [after modifer][after] accepts. Remember that it doesn't understand decimals, so if you'd like a transition to take half a second, set `config.page.transition.duration` to `'500ms'`. Also keep in mind that the duration is the duration of the complete transition-- a `'crossfade'` and `'fadeInOut'` transition with the same duration might look as though they last different amounts of time, as the `'fadeInOut'` has two steps.

You can also set how the header and footer content update using the following variables. They take the same values as their `body` counterparts.

- `config.header.transition.name`
- `config.header.transition.duration`
- `config.footer.transition.name`
- `config.footer.transition.duration`

Finally, Chapbook vertically centers text inside the page by default. To change this, set `config.style.page.verticalAlign` to either `'top'`, `'center'`, or `'bottom'`.

[color]: fonts-and-colors.html#colors
[after]: ../text-and-links/modifiers-and-delayed-text.html