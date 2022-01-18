# Fonts and Colors

The easiest way to customize your story's fonts and colors is with the **Style** backstage tab[^1], which sets values in the `config.style` object for you. As you make changes in that tab, your story's appearance will automatically update, so you can easily experiment to find a look that fits your story. However, changes you make will not be permanently saved-- the next time you test or play your story, it will revert back to its previous appearance.

In order to make changes in the **Style** tab permanent, you must copy the code in the **Config** panel at the top of the tab into your starting passage's vars section. (This passage is shown with a rocket-ship icon in Twine's story map.) Clicking anywhere in the box the code sits in will automatically select all of it to make copying and pasting easy.

Doing so will cause the appropriate variables to be set when your story first begins-- which doesn't mean that it has to be the only appearance your story takes on. You can change variables in the `config.style` object in a later passage's vars section and your story's appearance will change when the passage is visited. You could use this, for example, to denote a dream sequence or flashback.

The other panels in the **Style** tab, **Page**, **Header**, and **Footer**, all have the same fields. As you might guess, **Page** sets the base style of your story and **Header** and **Footer** govern the areas above and below the main text. By default, Chapbook stories don't have a header.

<div class="page-diagram">
	<div class="header">header</div>
	<div class="content">main content</div>
	<div class="footer">footer</div>
</div>

The values you set for page, header, and footer styles inherit from each other. That means that if a header or footer style value isn't set, it will use the corresponding page value instead. If a page value isn't set either, Chapbook's default style will be used instead.

## Setting Text Style

{% hint style="info" %}
Applies to:

- `config.style.page.font`
- `config.style.page.link.font`
- `config.style.page.link.active.font`
- `config.style.page.header.font`
- `config.style.page.header.link.font`
- `config.style.page.header.link.active.font`
{% endhint %}

Chapbook uses a concise notation for specifying text style. Below is a simple example:

```
Palatino 18
```

This sets a Palatino typeface at 18 pixels tall.[^2] But in actual use, you ought to use something like this instead:

```
Palatino/serif 18
```

Slashes separate alternate typefaces in what is called a _font stack_. Before the advent of web fonts, font stacks were a crucial part of web design. At that time, web browsers were only capable of displaying fonts installed in the operating system, so designers had to specify alternate typefaces in order to create a consistent appearance across different operating systems.

In our current times, font stacks affect more what a page looks like at first glance--typically, text appears immediately in a system font, then in a web font after it finishes loading. (See [External Web Fonts][external-web-fonts.md] for details on how to use a web font with Chapbook.) But there are players who will have disabled web fonts, either out of personal preference or a need to save network bandwidth, and it's good practice to design your story to accommodate that.

The example above indicates that if a typeface named Palatino isn't available to the player's web browser, `serif` signals it should fall back to a generic serif font.[^3] If you'd like to set your story in Helvetica, you might use:

```
Helvetica/Arial/sans-serif 14
```

Many people viewing your story using a Windows computer won't have Helvetica available, but they almost certainly will have Arial, Microsoft's [Helvetica competitor][helvetica-vs-arial], and if for some reason they have neither, the story will use whatever sans serif font is available.

When specifying typefaces that have spaces in their name, you don't need to do anything special:

```
Times/Times New Roman/serif 20
```

You can also modify a font with the words `bold`, `italic`, `underline` or `small caps`. If you'd like to use multiple styles, just put spaces between them:

```
Palatino 18 bold italic
```

There is a special font style named `regular`, which removes any bold, italic, underline, or small-cap styling that the font would normally inherit. Font styles _must_ be entered in all-lowercase. This is because you can omit parts of the declaration. All of the below are valid font notations:

- `Palatino`
- `18`
- `bold italic`
- `Palatino bold`
- `18 small caps`

The omitted parts are inherited as described above.

## Colors

{% hint style="info" %}
Applies to: 
- `config.style.backdrop`
- `config.style.page.color`
- `config.style.page.link.color`
- `config.style.page.link.lineColor`
- `config.style.page.link.active.color`
- `config.style.page.link.active.lineColor`
- `config.style.page.color`
- `config.style.page.link.color`
- `config.style.page.link.lineColor`
- `config.style.page.link.active.color`
- `config.style.page.link.active.lineColor`
{% endhint %}

Although you don't have to use it, Chapbook has a built-in color palette called [Open Color][open-color]. It has a versatile range of hues that are designed to harmonize with each other.

Besides `black` and `white`, Open Color has 13 base hues:

<div class="swatch-row last">
<div class="swatch" style="background: #212529">gray</div>
<div class="swatch" style="background: #c92a2a">red</div>
<div class="swatch" style="background: #a61e4d">pink</div>
<div class="swatch" style="background: #862e9c">grape</div>
<div class="swatch" style="background: #5f3dc4">violet</div>
<div class="swatch" style="background: #5f3dc4">indigo</div>
<div class="swatch" style="background: #1864ab">blue</div>
<div class="swatch" style="background: #0b7285">cyan</div>
<div class="swatch" style="background: #087f5b">teal</div>
<div class="swatch" style="background: #2b8a3e">green</div>
<div class="swatch" style="background: #5c940d">lime</div>
<div class="swatch" style="background: #e67700">yellow</div>
<div class="swatch" style="background: #d9480f">orange</div>
</div>

To use them, enter the appropriate name. Open Color also offers 10 shades per hue:

<div class="swatch-row light">
<div class="swatch" style="background: #f8f9fa">gray-0</div>
<div class="swatch" style="background: #fff5f5">red-0</div>
<div class="swatch" style="background: #fff0f6">pink-0</div>
<div class="swatch" style="background: #f8f0fc">grape-0</div>
<div class="swatch" style="background: #f3f0ff">violet-0</div>
<div class="swatch" style="background: #edf2ff">indigo-0</div>
<div class="swatch" style="background: #e7f5ff">blue-0</div>
<div class="swatch" style="background: #e3fafc">cyan-0</div>
<div class="swatch" style="background: #e6fcf5">teal-0</div>
<div class="swatch" style="background: #ebfbee">green-0</div>
<div class="swatch" style="background: #f4fce3">lime-0</div>
<div class="swatch" style="background: #fff9db">yellow-0</div>
<div class="swatch" style="background: #fff4e6">orange-0</div>
</div>
<div class="swatch-row light">
<div class="swatch" style="background: #f1f3f5">gray-1</div>
<div class="swatch" style="background: #ffe3e3">red-1</div>
<div class="swatch" style="background: #ffdeeb">pink-1</div>
<div class="swatch" style="background: #f3d9fa">grape-1</div>
<div class="swatch" style="background: #e5dbff">violet-1</div>
<div class="swatch" style="background: #dbe4ff">indigo-1</div>
<div class="swatch" style="background: #d0ebff">blue-1</div>
<div class="swatch" style="background: #c5f6fa">cyan-1</div>
<div class="swatch" style="background: #c3fae8">teal-1</div>
<div class="swatch" style="background: #d3f9d8">green-1</div>
<div class="swatch" style="background: #e9fac8">lime-1</div>
<div class="swatch" style="background: #fff3bf">yellow-1</div>
<div class="swatch" style="background: #ffe8cc">orange-1</div>
</div>
<div class="swatch-row light">
<div class="swatch" style="background: #e9ecef">gray-2</div>
<div class="swatch" style="background: #ffc9c9">red-2</div>
<div class="swatch" style="background: #fcc2d7">pink-2</div>
<div class="swatch" style="background: #eebefa">grape-2</div>
<div class="swatch" style="background: #d0bfff">violet-2</div>
<div class="swatch" style="background: #bac8ff">indigo-2</div>
<div class="swatch" style="background: #a5d8ff">blue-2</div>
<div class="swatch" style="background: #99e9f2">cyan-2</div>
<div class="swatch" style="background: #96f2d7">teal-2</div>
<div class="swatch" style="background: #b2f2bb">green-2</div>
<div class="swatch" style="background: #d8f5a2">lime-2</div>
<div class="swatch" style="background: #ffec99">yellow-2</div>
<div class="swatch" style="background: #ffd8a8">orange-2</div>
</div>
<div class="swatch-row light">
<div class="swatch" style="background: #dee2e6">gray-3</div>
<div class="swatch" style="background: #ffa8a8">red-3</div>
<div class="swatch" style="background: #faa2c1">pink-3</div>
<div class="swatch" style="background: #e599f7">grape-3</div>
<div class="swatch" style="background: #b197fc">violet-3</div>
<div class="swatch" style="background: #91a7ff">indigo-3</div>
<div class="swatch" style="background: #74c0fc">blue-3</div>
<div class="swatch" style="background: #66d9e8">cyan-3</div>
<div class="swatch" style="background: #63e6be">teal-3</div>
<div class="swatch" style="background: #8ce99a">green-3</div>
<div class="swatch" style="background: #c0eb75">lime-3</div>
<div class="swatch" style="background: #ffe066">yellow-3</div>
<div class="swatch" style="background: #ffc078">orange-3</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background: #ced4da">gray-4</div>
<div class="swatch" style="background: #ff8787">red-4</div>
<div class="swatch" style="background: #f783ac">pink-4</div>
<div class="swatch" style="background: #da77f2">grape-4</div>
<div class="swatch" style="background: #9775fa">violet-4</div>
<div class="swatch" style="background: #748ffc">indigo-4</div>
<div class="swatch" style="background: #4dabf7">blue-4</div>
<div class="swatch" style="background: #3bc9db">cyan-4</div>
<div class="swatch" style="background: #38d9a9">teal-4</div>
<div class="swatch" style="background: #69db7c">green-4</div>
<div class="swatch" style="background: #a9e34b">lime-4</div>
<div class="swatch" style="background: #ffd43b">yellow-4</div>
<div class="swatch" style="background: #ffa94d">orange-4</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background: #adb5bd">gray-5</div>
<div class="swatch" style="background: #ff6b6b">red-5</div>
<div class="swatch" style="background: #f06595">pink-5</div>
<div class="swatch" style="background: #cc5de8">grape-5</div>
<div class="swatch" style="background: #845ef7">violet-5</div>
<div class="swatch" style="background: #5c7cfa">indigo-5</div>
<div class="swatch" style="background: #339af0">blue-5</div>
<div class="swatch" style="background: #22b8cf">cyan-5</div>
<div class="swatch" style="background: #20c997">teal-5</div>
<div class="swatch" style="background: #51cf66">green-5</div>
<div class="swatch" style="background: #94d82d">lime-5</div>
<div class="swatch" style="background: #fcc419">yellow-5</div>
<div class="swatch" style="background: #ff922b">orange-5</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background: #868e96">gray-6</div>
<div class="swatch" style="background: #fa5252">red-6</div>
<div class="swatch" style="background: #e64980">pink-6</div>
<div class="swatch" style="background: #be4bdb">grape-6</div>
<div class="swatch" style="background: #7950f2">violet-6</div>
<div class="swatch" style="background: #4c6ef5">indigo-6</div>
<div class="swatch" style="background: #228be6">blue-6</div>
<div class="swatch" style="background: #15aabf">cyan-6</div>
<div class="swatch" style="background: #12b886">teal-6</div>
<div class="swatch" style="background: #40c057">green-6</div>
<div class="swatch" style="background: #82c91e">lime-6</div>
<div class="swatch" style="background: #fab005">yellow-6</div>
<div class="swatch" style="background: #fd7e14">orange-6</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background: #495057">gray-7</div>
<div class="swatch" style="background: #f03e3e">red-7</div>
<div class="swatch" style="background: #d6336c">pink-7</div>
<div class="swatch" style="background: #ae3ec9">grape-7</div>
<div class="swatch" style="background: #7048e8">violet-7</div>
<div class="swatch" style="background: #4263eb">indigo-7</div>
<div class="swatch" style="background: #1c7ed6">blue-7</div>
<div class="swatch" style="background: #1098ad">cyan-7</div>
<div class="swatch" style="background: #0ca678">teal-7</div>
<div class="swatch" style="background: #37b24d">green-7</div>
<div class="swatch" style="background: #74b816">lime-7</div>
<div class="swatch" style="background: #f59f00">yellow-7</div>
<div class="swatch" style="background: #f76707">orange-7</div>
</div>
<div class="swatch-row">
<div class="swatch" style="background: #343a40">gray-8</div>
<div class="swatch" style="background: #e03131">red-8</div>
<div class="swatch" style="background: #c2255c">pink-8</div>
<div class="swatch" style="background: #9c36b5">grape-8</div>
<div class="swatch" style="background: #6741d9">violet-8</div>
<div class="swatch" style="background: #3b5bdb">indigo-8</div>
<div class="swatch" style="background: #1971c2">blue-8</div>
<div class="swatch" style="background: #0c8599">cyan-8</div>
<div class="swatch" style="background: #099268">teal-8</div>
<div class="swatch" style="background: #2f9e44">green-8</div>
<div class="swatch" style="background: #66a80f">lime-8</div>
<div class="swatch" style="background: #f08c00">yellow-8</div>
<div class="swatch" style="background: #e8590c">orange-8</div>
</div>
<div class="swatch-row last">
<div class="swatch" style="background: #212529">gray-9</div>
<div class="swatch" style="background: #c92a2a">red-9</div>
<div class="swatch" style="background: #a61e4d">pink-9</div>
<div class="swatch" style="background: #862e9c">grape-9</div>
<div class="swatch" style="background: #5f3dc4">violet-9</div>
<div class="swatch" style="background: #364fc7">indigo-9</div>
<div class="swatch" style="background: #1864ab">blue-9</div>
<div class="swatch" style="background: #0b7285">cyan-9</div>
<div class="swatch" style="background: #087f5b">teal-9</div>
<div class="swatch" style="background: #2b8a3e">green-9</div>
<div class="swatch" style="background: #5c940d">lime-9</div>
<div class="swatch" style="background: #e67700">yellow-9</div>
<div class="swatch" style="background: #d9480f">orange-9</div>
</div>

As above, to use a particular shade, enter the name in its box, e.g. `yellow-6`. You can also use [any other color notation][color-notation] that web browsers understand, from the traditional hex triplet notation (e.g. `#0b7285`) to more modern ones, such as `hsla(0%, 65%, 48%, 0.75)`.

When setting colors in `config`, often you can specify both a background and foreground. For instance, you can set `config.style.page.color` to `'orange-9 on orange-0'`. However, when specifying a border color, for instance `config.style.page.link.lineColor`, only the foreground is used.

As with fonts, you can omit parts of a color declaration. Setting `config.style.page.link.color` to `'on blue-4'` causes links to use the page's foreground color, whatever it may be, but use a medium blue as background.

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

.swatch-row.light .swatch {
	color: black;
}
</style>

[^1]: To review, launching your story with Twine's **Test** button will cause the backstage view to appear, including the **Style** tab.

[^2]: If you are familiar with [CSS units](https://developer.mozilla.org/en-US/docs/Web/CSS/length), you can also use them, e.g. `Palatino 1rem` or `Palatino 25%`.

[^3]: What's a serif? [Wikipedia](https://en.wikipedia.org/wiki/Serif) aptly answers.

[open-color]: https://yeun.github.io/open-color/
[color-notation]: https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color#How_to_describe_a_color
[helvetica-vs-arial]: https://ilovetypography.com/2007/10/06/arial-versus-helvetica/
