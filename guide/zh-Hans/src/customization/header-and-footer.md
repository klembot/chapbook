# 页眉和页脚｜The Header and Footer

## 内容｜Content

通常，Chapbook 会在页面底部显示故事标题和重启链接。这个区域称为*页脚*，可以修改以包含额外信息和链接。同样地，您也可以在页面顶部的*页眉*中添加信息。例如，《黑暗斗篷》示例会在页眉中显示当前位置。

页眉和页脚进一步划分为三个区域：*左侧*、*中间*和*右侧*。您无需在每个区域都放置内容——无论您使用哪些区域，Chapbook 都会尽力均匀分布您的内容。

要更改页眉或页脚区域，请在 `config` 对象中设置相应的变量。

<table style="border: 1px solid #ddd; text-align: center">
	<tbody>
		<tr>
			<td><code>config.header.left</code></td>
			<td><code>config.header.center</code></td>
			<td><code>config.header.right</code></td>
		</tr>
		<tr>
			<td colspan="3"><i>主段落文本</i></td>
		</tr>
		<tr>
			<td><code>config.footer.left</code></td>
			<td><code>config.footer.center</code></td>
			<td><code>config.footer.right</code></td>
		</tr>
	</tbody>
</table>

请记住，必须将对象属性设置为字符串才能使其正常工作——也就是说，必须用单引号或双引号将值括起来。例如：

变量的内容会以与段落文本相同的方式被解释，因此您可以在变量中使用链接、插入内容，以及从技术上讲，修饰符：

```
config.header.center: "中午"
```

变量的内容会以与段落文本相同的方式被解释，因此您可以在变量中使用链接、[插入][[inserts]]，以及从技术上讲，[修饰符][modifiers]也可以：

```
config.header.right: "剩余金额：{money}"
config.footer.center: "[[本合集中的其他故事]]"
```

不过，页眉和页脚设计为显示单行文本，因此修饰符的用途可能有限。每次页面主体中显示新段落时，页眉和页脚都会更新，因此如上所示的变量插入内容将在游戏过程中自动更新。

## 边框｜Borders

除了[设置页眉和页脚的字体和颜色](./fonts-and-colors.html)外，您还可以更改它们与主要段落文本之间出现的边框外观。这些边框通常仅在页眉或页脚中有内容显示时才可见。

有两个变量控制边框本身的外观：

- `config.style.dark.page.footer.border`
- `config.style.dark.page.header.border`

与 [`config.style.page.style.border`](./page-style.html) 类似，它们可以取三个可能的值。

- `'none'` 会导致不显示边框，即使页眉或页脚中有内容。
- `'thin-line'` 会使用一条细线作为边框。
- `'thick-line'` 使用粗线条代替边框。

<aside data-hint="info">
与 <code>config.style.page.style.border</code> 不同，将这些设置为 <code>'shadow'</code>（阴影）不会产生任何效果。
</aside>

要设置边框使用的颜色，请设置以下任一选项：

- `config.style.dark.page.footer.borderColor` 或者
- `config.style.dark.page.header.borderColor`.

这应该是一个单一[颜色](fonts-and-colors.html#colors)，例如 `'orange-2'`。

[cloak of darkness]: https://klembot.github.io/chapbook/examples/cloak-of-darkness.html
[inserts]: ./modifiers-and-inserts/link-inserts.md
[modifiers]:./modifiers-and-inserts/modifiers-and-text-alignment.md