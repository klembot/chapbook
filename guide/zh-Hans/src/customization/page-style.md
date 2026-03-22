# 页面样式｜Page Style

在足够宽的网页浏览器窗口中，Chapbook 会在故事文本周围添加水平边距，以提供舒适的阅读体验。文本栏的确切宽度基于 `config.style.page.font` 中设置的字体大小。您可以通过多个变量来控制文本周围的外观。

首先，变量 `config.style.page.style.border` 接受以下几个可能的值之一：

- `'none'` 会在页面内容周围创建不可见的边框。
- `'thin-line'` 和 `'thick-line'` 会在内容周围创建扁平边框。
- `'shadow'` 会在内容周围添加投影效果。

Chapbook 的默认外观是 `'shadow'`（阴影）。

若使用 `'thin-line'` 或 `'thick-line'`，可通过变量 `config.style.page.style.borderColor` 来指定线条颜色。该值应设置为单一[颜色][color]。

变量 `config.style.backdrop` 用于设置文本内容周围区域的背景[颜色][color]。但在较小的浏览器窗口（尤其是移动设备）中，此区域不可见。

当故事显示新段落时，会根据 `config.body.transition.name` 变量中的设置，在文本之间创建过渡效果：

- `'crossfade'` 会使旧文本淡出的同时新文本淡入
- `'fadeInOut'` 会使旧文本淡出，然后新文本再淡入
- `'none'` 会使新文本立即替换旧文本

<aside data-hint="info">
<p><code>'crossfade'</code> 和 <code>'fadeInOut'</code> 过渡效果要求玩家的网页浏览器支持视图过渡 API。如果不支持，Chapbook 将改用 <code>'none'</code> 过渡效果。
</aside>

Chapbook 的默认过渡效果是 `'crossfade'`。

如果你使用 `'crossfade'` 或 `'fadeInOut'` 效果，可以通过设置 `config.body.transition.duration` 来控制过渡时长，该值应为与 [after 修饰符][after]接受的格式相同的字符串。请注意，它不支持小数，因此如果你希望过渡持续半秒，请将 `config.page.transition.duration` 设置为 `'500ms'`。另外要记住，持续时间是指完整过渡的时长——相同持续时间的“交叉淡入淡出”和“淡入淡出”过渡可能看起来持续时间不同，因为“淡入淡出”包含两个步骤。

最后，Chapbook 默认将页面内的文本垂直居中。要更改此设置，请将 `config.style.page.verticalAlign` 设置为 `'top'`（置顶）, `'center'`（居中）, 或 `'bottom'`（置底）。

[color]: fonts-and-colors.html#colors
[after]: ./text-and-links/modifiers-and-delayed-text.html