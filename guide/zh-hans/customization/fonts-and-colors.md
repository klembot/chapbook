# 字体和颜色｜Fonts and Colors

自定义故事字体与颜色的最简便方法是使用*样式*后台选项卡[^1]，该选项卡会为您自动设置 `config.style` 对象中的值。当您在该选项卡中进行调整时，故事外观将实时更新，方便您轻松尝试不同风格以匹配故事基调。但请注意，此处所做的更改不会永久保存。下次测试或运行故事时，界面将恢复至先前的外观状态。

<aside data-hint="info">
<p><strong>样式</strong>选项卡中提及了主题功能，并允许您在不同主题间切换。关于此功能的详细说明，请参阅<a href="dark-theme.html">深色主题</a>文档。</p>
<p>最重要的是要理解<strong>样式</strong>选项卡中的文本字段是反映当前主题的样式，并会在主题更改时更新。</p>
</aside>

若要使**样式**选项卡中的更改永久生效，必须将选项卡顶部**配置**面板中的代码复制到起始段落的变量部分。（该段落在 Twine 故事地图中显示为火箭图标。）点击代码所在框内的任意位置将自动全选所有内容，便于复制粘贴。

这样做会在故事开始时设置相应的变量——但这并不意味着这是故事唯一的呈现方式。你可以在后续段落的变量部分更改 `config.style` 对象中的变量，当访问该段落时，故事的外观就会改变。例如，你可以利用这一点来表示梦境序列或闪回。

**样式**选项卡中的其他面板，**页面**、**页眉**和**页脚**，都包含相同的字段。正如你可能猜到的，**页面**设置故事的基础样式，而**页眉**和**页脚**则控制主文本上方和下方的区域。默认情况下，Chapbook 故事没有页眉。

<div class="page-diagram">
	<div class="header">页眉</div>
	<div class="content">主要内容</div>
	<div class="footer">页脚</div>
</div>

您为页面、页眉和页脚样式设置的值会相互继承。 这意味着如果页眉或页脚样式值未设置，则会使用对应的页面值。如果页面值也未设置，则会使用 Chapbook 的默认样式。

## 设置文本样式｜Setting Text Style

<aside data-hint="info">
适用于：

<ul>
<li><code>config.style.page.font</code></li>
<li><code>config.style.page.link.font</code></li>
<li><code>config.style.page.link.active.font</code></li>
<li><code>config.style.page.header.font</code></li>
<li><code>config.style.page.header.link.font</code></li>
<li><code>config.style.page.header.link.active.font</code></li>
</aside>

Chapbook 使用一种简洁的符号来指定文本样式。下面是一个简单的例子：

```
Palatino 18
```

这将设置一个 18 像素高的 Palatino 字体。[^2]但在实际使用中，你应该使用类似这样的方式：

```
Palatino/serif 18
```

斜杠分隔了所谓的*字体栈*中的备用字体。在网络字体出现之前，字体栈是网页设计的关键组成部分。那时，网页浏览器只能显示操作系统中已安装的字体，因此设计师必须指定备用字体，以确保在不同操作系统上呈现一致的外观。

在我们当前的时代，字体栈更多影响的是页面第一眼的外观——通常，文本会先以系统字体立即显示，然后在网络字体加载完成后切换。（关于如何在Chapbook中使用网络字体的详细信息，请参阅[外部网络字体](external-web-fonts.md)。）但有些用户可能会出于个人偏好或节省网络带宽的需要而禁用网络字体，因此将你的故事设计成能适应这种情况是一种良好的实践。

上面的例子表明，如果玩家的网页浏览器没有名为 Palatino 的字体，`serif` 这个信号会指示其回退到通用的衬线字体。[^3]如果你想将故事文本设置为 Helvetica 字体，可以使用：

```
Helvetica/Arial/sans-serif 14
```

许多使用 Windows 电脑查看你故事的读者可能没有 Helvetica 字体，但他们几乎肯定会有 Arial——这是微软开发的 Helvetica 竞品字体。如果出于某种原因两者都没有，故事将使用任何可用的无衬线字体。

当指定名称中包含空格的字体时，你无需进行任何特殊处理：

```
Times/Times New Roman/serif 20
```

你还可以使用单词 `bold`（加粗），`italic`（斜体），`underline`（下划线）或 `small caps`（小型大写字母）来修改字体样式。如果想同时使用多种样式，请在它们之间用空格分隔：

```
Palatino 18 bold italic
```
有一种特殊的字体样式名为 `regular`（常规），它会移除字体通常会继承的任何粗体、斜体、下划线或小型大写字母样式。

字体样式*必须*全部以小写字母输入。这是因为你可以省略声明的部分内容。以下所有都是有效的字体表示法：

- `Palatino`
- `18`
- `bold italic`
- `Palatino bold`
- `18 small caps`

省略的部分将按照上述描述进行继承。

<aside data-hint="info">
你指定的字体大小可能会被 Chapbook 增加。更多信息请参阅<a href="font-scaling.html">字体缩放</a>。
</aside>

## 颜色｜Colors

<aside data-hint="info">
适用于：
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

虽然并非必须使用，但 Chapbook 包含一个名为"[合理色彩][reasonable-colors]"的调色板，由 Matthew Howell 创建。合理色彩旨在让设计既易于查看又美观的色彩组合变得简单。

共有 25 种色调，每种色调有 6 种深浅：

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

要使用特定色调，请在对应框中输入名称，例如 `yellow-6`。为确保文本具有足够的色彩对比度，请选择数值差异至少为 3 的两种色调。也就是说，`yellow-6` 在 `yellow-3` 背景上具有足够的对比度，但 `red-5` 在 `red-3` 背景上则不然。“[合理色彩][reasonable-colors]”网站还提供了关于如何搭配特定色调的色彩建议——选择一种色调即可查看详细信息——当然，您r是否遵循这些建议只取决于您。

您也可以使用任何其他网络浏览器支持的[颜色注释法][color-notation]，从传统的十六进制三元组表示法（例如 `#0b7285`）到更现代的表示法，例如 `hsla(0%, 65%, 48%, 0.75)`。

在 `config`（配置）中设置颜色时，通常可以同时指定背景色和前景色。例如，您可以将 `config.style.page.color` 设置为 `'orange-4 on orange-1'`。然而，在指定边框颜色时，例如 `config.style.page.link.lineColor`，则仅使用前景色。

与字体一样，您可以省略颜色声明的部分内容。将 `config.style.page.link.color` 设置为 `'on blue-3'` 会使链接使用页面的前景色（无论其具体颜色如何），但使用中等蓝色作为背景。

## Open Color（已弃用）｜Open Color (deprecated)

Chapbook 版本 1 包含一个名为开放色彩的不同调色板。您可以继续使用它，但此调色板将在 Chapbook 版本 3 中被移除。若要继续使用这些颜色，请在它们的名称前添加 `oc-`，例如：`oc-red-6` 或 `oc-gray`。

Open Color 中可用的完整色调和色度列表可在[其项目网站][open-color]上找到。

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

[^1]:
    回顾一下，使用 Twine 的**测试**按钮启动你的故事可以让后台视图出现，其中包括**样式**选项卡。

[^2]:
	如果你熟悉 [CSS 单位](https://developer.mozilla.org/en-US/docs/Web/CSS/length)，也可以使用它们，例如 `Palatino 1rem` 或 `Palatino 25%`。

[^3]:
    什么是衬线字体？[维基百科](https://en.wikipedia.org/wiki/Serif)给出了恰当的回答。

[reasonable-colors]: https://www.reasonable.work/colors/
[open-color]: https://yeun.github.io/open-color/
[color-notation]:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color#How_to_describe_a_color
[helvetica-vs-arial]:
  https://ilovetypography.com/2007/10/06/arial-versus-helvetica/
