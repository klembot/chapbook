# The Header and Footer

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

[cloak of darkness]: https://klembot.github.io/chapbook/examples/cloak-of-darkness.html
[inserts]: ../modifiers-and-inserts/link-inserts.md
[modifiers]:../modifiers-and-inserts/modifiers-and-text-alignment.md