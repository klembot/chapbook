# Fonts and Colors

The easiest way to customize your story's fonts and colors is with the **Style**
backstage tab[^1], which sets values in the `config.style` object for you. As
you make changes in that tab, your story's appearance will automatically update,
so you can easily experiment to find a look that fits your story. However,
changes you make will not be permanently saved. The next time you test or play
your story, it will revert back to its previous appearance.

In order to make changes in the **Style** tab permanent, you must copy the code
in the **Config** panel at the top of the tab into your starting passage's vars
section. (This passage is shown with a rocket-ship icon in Twine's story map.)
Clicking anywhere in the box the code sits in will automatically select all of
it to make copying and pasting easy.

Doing so will cause the appropriate variables to be set when your story first
begins--which doesn't mean that it has to be the only appearance your story
takes on. You can change variables in the `config.style` object in a later
passage's vars section and your story's appearance will change when the passage
is visited. You could use this, for example, to denote a dream sequence or
flashback.

The other panels in the **Style** tab, **Page**, **Header**, and **Footer**, all
have the same fields. As you might guess, **Page** sets the base style of your
story and **Header** and **Footer** govern the areas above and below the main
text. By default, Chapbook stories don't have a header.

<div class="page-diagram">
	<div class="header">header</div>
	<div class="content">main content</div>
	<div class="footer">footer</div>
</div>

The values you set for page, header, and footer styles inherit from each other.
That means that if a header or footer style value isn't set, it will use the
corresponding page value instead. If a page value isn't set either, Chapbook's
default style will be used instead.

## Setting Text Style

<aside data-hint="info">
Applies to:

<ul>
<li><code>config.style.page.font</code></li>
<li><code>config.style.page.link.font</code></li>
<li><code>config.style.page.link.active.font</code></li>
<li><code>config.style.page.header.font</code></li>
<li><code>config.style.page.header.link.font</code></li>
<li><code>config.style.page.header.link.active.font</code></li>
</aside>

Chapbook uses a concise notation for specifying text style. Below is a simple
example:

```
Palatino 18
```

This sets a Palatino typeface at 18 pixels tall.[^2] But in actual use, you
ought to use something like this instead:

```
Palatino/serif 18
```

Slashes separate alternate typefaces in what is called a _font stack_. Before
the advent of web fonts, font stacks were a crucial part of web design. At that
time, web browsers were only capable of displaying fonts installed in the
operating system, so designers had to specify alternate typefaces in order to
create a consistent appearance across different operating systems.

In our current times, font stacks affect more what a page looks like at first
glance--typically, text appears immediately in a system font, then in a web font
after it finishes loading. (See [External Web Fonts](external-web-fonts.md) for
details on how to use a web font with Chapbook.) But there are players who will
have disabled web fonts, either out of personal preference or a need to save
network bandwidth, and it's good practice to design your story to accommodate
that.

The example above indicates that if a typeface named Palatino isn't available to
the player's web browser, `serif` signals it should fall back to a generic serif
font.[^3] If you'd like to set your story in Helvetica, you might use:

```
Helvetica/Arial/sans-serif 14
```

Many people viewing your story using a Windows computer won't have Helvetica
available, but they almost certainly will have Arial, Microsoft's [Helvetica
competitor][helvetica-vs-arial], and if for some reason they have neither, the
story will use whatever sans serif font is available.

When specifying typefaces that have spaces in their name, you don't need to do
anything special:

```
Times/Times New Roman/serif 20
```

You can also modify a font with the words `bold`, `italic`, `underline` or
`small caps`. If you'd like to use multiple styles, put spaces between them:

```
Palatino 18 bold italic
```

There is a special font style named `regular`, which removes any bold, italic,
underline, or small-cap styling that the font would normally inherit.

Font styles _must_ be entered in all-lowercase. This is because you can omit
parts of the declaration. All of the below are valid font notations:

- `Palatino`
- `18`
- `bold italic`
- `Palatino bold`
- `18 small caps`

The omitted parts are inherited as described above.

<aside data-hint="info">
The font size you specify may be increased by Chapbook. See <a href="font-scaling.html">Font Scaling</a> for more information.
</aside>

## Colors

<aside data-hint="info">
Applies to:
<ul>
<li><code>config.style.backdrop</code></li>
<li><code>config.style.page.color</code></li>
<li><code>config.style.page.link.color</code></li>
<li><code>config.style.page.link.lineColor</code></li>
<li><code>config.style.page.link.active.color</code></li>
<li><code>config.style.page.link.active.lineColor</code></li>
<li><code>config.style.page.color</code></li>
<li><code>config.style.page.link.color</code></li>
<li><code>config.style.page.link.lineColor</code></li>
<li><code>config.style.page.link.active.color</code></li>
<li><code>config.style.page.link.active.lineColor</code></li>
</aside>

Although you don't have to use it, Chapbook includes a color palette called
[Reasonable Colors][reasonable-colors] created by Matthew Howell. Reasonable
Colors is designed to make designing accessible and attractive color
combinations easy.

There are 25 hues, and each hue has 6 shades:

<div class="swatch-row">
<div class="swatch" style="background-color: rgb(246, 246, 246);">gray-1</div>
<div class="swatch" style="background-color: rgb(226, 226, 226);">gray-2</div>
<div class="swatch" style="background-color: rgb(139, 139, 139);">gray-3</div>
<div class="swatch" style="background-color: rgb(111, 111, 111);">gray-4</div>
<div class="swatch" style="background-color: rgb(62, 62, 62);">gray-5</div>
<div class="swatch" style="background-color: rgb(34, 34, 34);">gray-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 247, 249);">rose-1</div>
<div class="swatch" style="background-color: rgb(255, 220, 229);">rose-2</div>
<div class="swatch" style="background-color: rgb(255, 59, 141);">rose-3</div>
<div class="swatch" style="background-color: rgb(219, 0, 114);">rose-4</div>
<div class="swatch" style="background-color: rgb(128, 0, 64);">rose-5</div>
<div class="swatch" style="background-color: rgb(76, 0, 35);">rose-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 248, 248);">raspberry-1</div>
<div class="swatch" style="background-color: rgb(255, 221, 223);">raspberry-2</div>
<div class="swatch" style="background-color: rgb(255, 66, 108);">raspberry-3</div>
<div class="swatch" style="background-color: rgb(222, 0, 81);">raspberry-4</div>
<div class="swatch" style="background-color: rgb(130, 0, 44);">raspberry-5</div>
<div class="swatch" style="background-color: rgb(81, 0, 24);">raspberry-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 248, 246);">red-1</div>
<div class="swatch" style="background-color: rgb(255, 221, 216);">red-2</div>
<div class="swatch" style="background-color: rgb(255, 70, 71);">red-3</div>
<div class="swatch" style="background-color: rgb(224, 0, 43);">red-4</div>
<div class="swatch" style="background-color: rgb(131, 0, 20);">red-5</div>
<div class="swatch" style="background-color: rgb(83, 0, 3);">red-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 248, 245);">orange-1</div>
<div class="swatch" style="background-color: rgb(255, 222, 209);">orange-2</div>
<div class="swatch" style="background-color: rgb(253, 77, 0);">orange-3</div>
<div class="swatch" style="background-color: rgb(205, 60, 0);">orange-4</div>
<div class="swatch" style="background-color: rgb(117, 33, 0);">orange-5</div>
<div class="swatch" style="background-color: rgb(64, 22, 0);">orange-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 248, 243);">cinnamon-1</div>
<div class="swatch" style="background-color: rgb(255, 223, 198);">cinnamon-2</div>
<div class="swatch" style="background-color: rgb(213, 115, 0);">cinnamon-3</div>
<div class="swatch" style="background-color: rgb(172, 92, 0);">cinnamon-4</div>
<div class="swatch" style="background-color: rgb(99, 51, 0);">cinnamon-5</div>
<div class="swatch" style="background-color: rgb(55, 29, 0);">cinnamon-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 248, 239);">amber-1</div>
<div class="swatch" style="background-color: rgb(255, 224, 178);">amber-2</div>
<div class="swatch" style="background-color: rgb(185, 131, 0);">amber-3</div>
<div class="swatch" style="background-color: rgb(146, 103, 0);">amber-4</div>
<div class="swatch" style="background-color: rgb(82, 56, 0);">amber-5</div>
<div class="swatch" style="background-color: rgb(48, 33, 0);">amber-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 249, 229);">yellow-1</div>
<div class="swatch" style="background-color: rgb(255, 229, 62);">yellow-2</div>
<div class="swatch" style="background-color: rgb(156, 139, 0);">yellow-3</div>
<div class="swatch" style="background-color: rgb(125, 111, 0);">yellow-4</div>
<div class="swatch" style="background-color: rgb(70, 61, 0);">yellow-5</div>
<div class="swatch" style="background-color: rgb(41, 35, 0);">yellow-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(247, 255, 172);">lime-1</div>
<div class="swatch" style="background-color: rgb(213, 242, 0);">lime-2</div>
<div class="swatch" style="background-color: rgb(129, 147, 0);">lime-3</div>
<div class="swatch" style="background-color: rgb(103, 118, 0);">lime-4</div>
<div class="swatch" style="background-color: rgb(57, 65, 0);">lime-5</div>
<div class="swatch" style="background-color: rgb(34, 38, 0);">lime-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(229, 255, 195);">chartreuse-1</div>
<div class="swatch" style="background-color: rgb(152, 251, 0);">chartreuse-2</div>
<div class="swatch" style="background-color: rgb(92, 155, 0);">chartreuse-3</div>
<div class="swatch" style="background-color: rgb(73, 124, 0);">chartreuse-4</div>
<div class="swatch" style="background-color: rgb(38, 69, 0);">chartreuse-5</div>
<div class="swatch" style="background-color: rgb(24, 38, 0);">chartreuse-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(224, 255, 217);">green-1</div>
<div class="swatch" style="background-color: rgb(114, 255, 108);">green-2</div>
<div class="swatch" style="background-color: rgb(0, 162, 31);">green-3</div>
<div class="swatch" style="background-color: rgb(0, 130, 23);">green-4</div>
<div class="swatch" style="background-color: rgb(0, 73, 8);">green-5</div>
<div class="swatch" style="background-color: rgb(6, 40, 0);">green-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(220, 255, 230);">emerald-1</div>
<div class="swatch" style="background-color: rgb(93, 255, 162);">emerald-2</div>
<div class="swatch" style="background-color: rgb(0, 160, 90);">emerald-3</div>
<div class="swatch" style="background-color: rgb(0, 129, 71);">emerald-4</div>
<div class="swatch" style="background-color: rgb(0, 72, 37);">emerald-5</div>
<div class="swatch" style="background-color: rgb(0, 40, 18);">emerald-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(218, 255, 239);">aquamarine-1</div>
<div class="swatch" style="background-color: rgb(66, 255, 198);">aquamarine-2</div>
<div class="swatch" style="background-color: rgb(0, 159, 120);">aquamarine-3</div>
<div class="swatch" style="background-color: rgb(0, 127, 95);">aquamarine-4</div>
<div class="swatch" style="background-color: rgb(0, 71, 52);">aquamarine-5</div>
<div class="swatch" style="background-color: rgb(0, 40, 27);">aquamarine-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(215, 255, 247);">teal-1</div>
<div class="swatch" style="background-color: rgb(0, 255, 228);">teal-2</div>
<div class="swatch" style="background-color: rgb(0, 158, 140);">teal-3</div>
<div class="swatch" style="background-color: rgb(0, 124, 110);">teal-4</div>
<div class="swatch" style="background-color: rgb(0, 68, 60);">teal-5</div>
<div class="swatch" style="background-color: rgb(0, 39, 34);">teal-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(196, 255, 254);">cyan-1</div>
<div class="swatch" style="background-color: rgb(0, 250, 251);">cyan-2</div>
<div class="swatch" style="background-color: rgb(0, 153, 154);">cyan-3</div>
<div class="swatch" style="background-color: rgb(0, 122, 123);">cyan-4</div>
<div class="swatch" style="background-color: rgb(0, 67, 68);">cyan-5</div>
<div class="swatch" style="background-color: rgb(0, 37, 37);">cyan-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(218, 250, 255);">powder-1</div>
<div class="swatch" style="background-color: rgb(141, 240, 255);">powder-2</div>
<div class="swatch" style="background-color: rgb(0, 152, 169);">powder-3</div>
<div class="swatch" style="background-color: rgb(0, 121, 135);">powder-4</div>
<div class="swatch" style="background-color: rgb(0, 64, 72);">powder-5</div>
<div class="swatch" style="background-color: rgb(0, 34, 39);">powder-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(227, 247, 255);">sky-1</div>
<div class="swatch" style="background-color: rgb(174, 233, 255);">sky-2</div>
<div class="swatch" style="background-color: rgb(0, 148, 180);">sky-3</div>
<div class="swatch" style="background-color: rgb(0, 117, 144);">sky-4</div>
<div class="swatch" style="background-color: rgb(0, 64, 79);">sky-5</div>
<div class="swatch" style="background-color: rgb(0, 31, 40);">sky-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(232, 246, 255);">cerulean-1</div>
<div class="swatch" style="background-color: rgb(185, 227, 255);">cerulean-2</div>
<div class="swatch" style="background-color: rgb(0, 146, 197);">cerulean-3</div>
<div class="swatch" style="background-color: rgb(0, 116, 157);">cerulean-4</div>
<div class="swatch" style="background-color: rgb(0, 60, 84);">cerulean-5</div>
<div class="swatch" style="background-color: rgb(0, 29, 42);">cerulean-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(232, 242, 255);">azure-1</div>
<div class="swatch" style="background-color: rgb(198, 224, 255);">azure-2</div>
<div class="swatch" style="background-color: rgb(0, 143, 219);">azure-3</div>
<div class="swatch" style="background-color: rgb(0, 113, 175);">azure-4</div>
<div class="swatch" style="background-color: rgb(0, 59, 94);">azure-5</div>
<div class="swatch" style="background-color: rgb(0, 28, 48);">azure-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(240, 244, 255);">blue-1</div>
<div class="swatch" style="background-color: rgb(212, 224, 255);">blue-2</div>
<div class="swatch" style="background-color: rgb(0, 137, 252);">blue-3</div>
<div class="swatch" style="background-color: rgb(0, 109, 202);">blue-4</div>
<div class="swatch" style="background-color: rgb(0, 56, 109);">blue-5</div>
<div class="swatch" style="background-color: rgb(0, 26, 57);">blue-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(243, 243, 255);">indigo-1</div>
<div class="swatch" style="background-color: rgb(222, 221, 255);">indigo-2</div>
<div class="swatch" style="background-color: rgb(101, 126, 255);">indigo-3</div>
<div class="swatch" style="background-color: rgb(0, 97, 252);">indigo-4</div>
<div class="swatch" style="background-color: rgb(0, 50, 138);">indigo-5</div>
<div class="swatch" style="background-color: rgb(0, 22, 73);">indigo-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(247, 241, 255);">violet-1</div>
<div class="swatch" style="background-color: rgb(232, 218, 255);">violet-2</div>
<div class="swatch" style="background-color: rgb(155, 112, 255);">violet-3</div>
<div class="swatch" style="background-color: rgb(121, 74, 255);">violet-4</div>
<div class="swatch" style="background-color: rgb(45, 15, 191);">violet-5</div>
<div class="swatch" style="background-color: rgb(11, 0, 116);">violet-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(253, 244, 255);">purple-1</div>
<div class="swatch" style="background-color: rgb(247, 217, 255);">purple-2</div>
<div class="swatch" style="background-color: rgb(209, 80, 255);">purple-3</div>
<div class="swatch" style="background-color: rgb(176, 31, 227);">purple-4</div>
<div class="swatch" style="background-color: rgb(102, 0, 135);">purple-5</div>
<div class="swatch" style="background-color: rgb(58, 0, 79);">purple-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 243, 252);">magenta-1</div>
<div class="swatch" style="background-color: rgb(255, 215, 246);">magenta-2</div>
<div class="swatch" style="background-color: rgb(249, 17, 224);">magenta-3</div>
<div class="swatch" style="background-color: rgb(202, 0, 182);">magenta-4</div>
<div class="swatch" style="background-color: rgb(116, 0, 104);">magenta-5</div>
<div class="swatch" style="background-color: rgb(68, 0, 60);">magenta-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background-color: rgb(255, 247, 251);">pink-1</div>
<div class="swatch" style="background-color: rgb(255, 220, 236);">pink-2</div>
<div class="swatch" style="background-color: rgb(255, 47, 178);">pink-3</div>
<div class="swatch" style="background-color: rgb(210, 0, 143);">pink-4</div>
<div class="swatch" style="background-color: rgb(121, 0, 81);">pink-5</div>
<div class="swatch" style="background-color: rgb(75, 0, 48);">pink-6</div>
</div>

To use a particular shade, enter the name in its box, e.g. `yellow-6`. To ensure
that text has enough color contrast, choose two shades that have at least a
numerical difference of 3. That is, `yellow-6` on a `yellow-3` background has
sufficient contrast, but `red-5` on `red-3` doesn't. The [Reasonable
Colors][reasonable-colors] site also has suggestions on colors that will complement a given hue--choose a hue to see detailed information--but you don't have to follow these suggestions, of course.

You can also use [any other color notation][color-notation] that web browsers
understand, from the traditional hex triplet notation (e.g. `#0b7285`) to more
modern ones, such as `hsla(0%, 65%, 48%, 0.75)`.

When setting colors in `config`, often you can specify both a background and
foreground. For instance, you can set `config.style.page.color` to
`'orange-4 on orange-1'`. However, when specifying a border color, for instance
`config.style.page.link.lineColor`, only the foreground is used.

As with fonts, you can omit parts of a color declaration. Setting
`config.style.page.link.color` to `'on blue-3'` causes links to use the page's
foreground color, whatever it may be, but use a medium blue as background.


## Open Color (deprecated)

Version 1 of Chapbook included a different color palette called [Open
Color][open-color]. You can continue to use it, but this palette will be removed
in version 3 of Chapbook. To continue to use these colors, add `oc-` in front of
their name: i.e. `oc-red-6` or `oc-gray`.

The full list of hues and shades available in Open Color is available on [its
project web site][open-color].

<style>
.page-diagram {
	width: 20vw;
	height: 50vh;
	border: 1px solid black;
	margin: 1em auto;
	font-style: italic;
	text-align: center;
	display: flex;
	flex-direction: column;
}

.page-diagram .header {
	border-bottom: 1px solid black;
}

.page-diagram .content {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.page-diagram .footer {
	border-top: 1px solid black;
}

.swatch-row {
	display: flex;
	height: 50px;
}

.swatch-row.last {
	margin-bottom: 1em;
}

.swatch {
	flex-grow: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 80%;
}

.swatch-row .swatch:nth-child(1), .swatch-row .swatch:nth-child(2)  {
	color: black;
}
</style>

[^1]:To review, launching your story with Twine's **Test** button will cause the backstage view to appear, including the **Style** tab.

[^2]: If you are familiar with [CSS units](https://developer.mozilla.org/en-US/docs/Web/CSS/length), you can also use them, e.g. `Palatino 1rem` or `Palatino 25%`.

[^3]: What's a serif? [Wikipedia](https://en.wikipedia.org/wiki/Serif) aptly answers.

[reasonable-colors]: https://www.reasonable.work/colors/
[open-color]: https://yeun.github.io/open-color/
[color-notation]:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color#How_to_describe_a_color
[helvetica-vs-arial]:
  https://ilovetypography.com/2007/10/06/arial-versus-helvetica/
