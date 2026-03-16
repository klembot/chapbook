# The Header and Footer

## Content

Normally, Chapbook displays your story's title and a link to restart it at the bottom of the page. This area, called the _footer_, can be changed to include additional information and links. You can also add information at the top of the page, in its _header_, in a similar manner. The _[Cloak of Darkness]_ example, for instance, displays the current location in the header.

The header and footer are further divided into three areas: _left_, _center_, and _right_. You do not need to place content into each area--Chapbook does its best to evenly space your content regardless of which areas you use.

To change a header or footer area, set the corresponding variable in the `config` object.

<table style="border: 1px solid #ddd; text-align: center">
	<tbody>
		<tr>
			<td><code>config.header.left</code></td>
			<td><code>config.header.center</code></td>
			<td><code>config.header.right</code></td>
		</tr>
		<tr>
			<td colspan="3"><i>main passage text</i></td>
		</tr>
		<tr>
			<td><code>config.footer.left</code></td>
			<td><code>config.footer.center</code></td>
			<td><code>config.footer.right</code></td>
		</tr>
	</tbody>
</table>

Remember that you must set the object property to a string for it to function correctly--meaning, you must put single or double quotes around the value. For example:

```
config.header.center: "Midday"
```

The contents of the variable are interpreted the same way that passage text is, so you can use links, [inserts], and, technically, [modifiers] in the variables:

```
config.header.right: "Money left: {money}"
config.footer.center: "[[Other stories in this anthology]]"
```

The header and footer are designed to display a single line of text, though, so modifiers are probably of limited use. The header and footer are updated every time a new passage is shown in the body of the page, so variable inserts like the one shown above will automatically update during play.

## Borders

In addition to [setting the font and color](./fonts-and-colors.html) of the
header and footer, you may also change the appearance of the borders that appear
between them and the main passage text. These borders normally are visible only
when there is content displayed in the header or footer.

There are two variables that control the appearance of the border itself:

- `config.style.dark.page.footer.border`
- `config.style.dark.page.header.border`

Similar to [`config.style.page.style.border`](./page-style.html), they take three possible values.

- `'none'` causes no border to be shown, even if there is content in the header or footer.
- `'thin-line'` causes a thin line to be used as a border.
- `'thick-line'` uses a thick line instead.

<aside data-hint="info">
Unlike <code>config.style.page.style.border</code>, setting these to <code>'shadow'</code> has no effect.
</aside>

To set the color used by the border, set either:

- `config.style.dark.page.footer.borderColor` or
- `config.style.dark.page.header.borderColor`.

This should be a single [color](fonts-and-colors.html#colors), like
`'orange-2'`.

[cloak of darkness]: https://klembot.github.io/chapbook/examples/cloak-of-darkness.html
[inserts]: ../modifiers-and-inserts/link-inserts.md
[modifiers]:../modifiers-and-inserts/modifiers-and-text-alignment.md