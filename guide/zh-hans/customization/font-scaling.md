# 字体缩放｜Font Scaling

默认情况下，Chapbook 会根据*视口*（即查看页面的容器）的宽度来缩放文本的字体大小。在台式电脑上，视口是浏览器窗口，玩家可以随意调整其大小。在平板电脑或移动设备上，视口通常是整个屏幕。

Chapbook 只会增大您为文本设置的字体大小，绝不会使其变小。其目的是无论视口大小如何，都保持文本处于舒适的尺寸，并防止在较大的视口中文本出现在不自然的狭窄列中。

您可以自定义 Chapbook 的字体缩放比例，或完全禁用此功能，使文本始终精确保持您指定的大小。

## 启用或禁用缩放功能｜Enabling or Disabling Scaling

要禁用字体缩放，请将 `config.style.fontScaling.enabled` 设置为 `false`。此设置会立即生效。若要重新启用字体缩放，请将此变量设置为 `true`。

请注意，玩家也可以通过更改浏览器设置来调整字体大小。您无法阻止这种情况发生——也不应试图阻止，因为玩家通常这样做是为了让文本更易于阅读。

## 控制缩放｜Controlling Scaling

除了 `config.style.fontScaling.enabled` 之外，还有两个变量必须设置，以便 Chapbook 能够缩放字体大小，这两个变量精确控制着缩放的发生方式：

`config.style.fontScaling.baseViewportWidth` 是一个以像素为单位的视口宽度值，当视口达到此宽度时，将完全使用 `config` 变量中设置的字体大小。换言之，在任何比此宽度更宽的视口下，字体大小将开始增大。此值必须是一个数字，如 `1280`，而不是 `'1280px'`。默认情况下，此值为 `1000`。

`config.style.fontScaling.addAtDoubleWidth` 是一个像素值，当视口宽度恰好是 `config.style.fontScaling.baseViewportWidth` 中数值的两倍时，此值将被添加到字体大小上。与 `baseViewportWidth` 类似，此值必须是一个数字，如 `10`，而不是 `'10px'`。字体大小的增加只能以像素为单位，不能使用其他单位。`addAtDoubleWidth` 定义了字体大小增加的比率。默认情况下，此值设置为 `6`。

还有第三个可选变量：`config.style.fontScaling.maximumSize`。这是无论视口变得多宽，字体能达到的最大尺寸。与其他变量不同，这是一个字符串。它应该是一个包含单位的 CSS 长度值，例如 `'36px'` 或 `'2rem'`。默认情况下，此变量未设置。

如果你不设置 `maximumSize`（最大值），那么字体将在所有视口宽度下进行缩放。

<aside data-hint="info">
没有 <code>minimumSize</code>（最小值）设置，因为 Chapbook 永远不会将字体缩放得比最初设置的尺寸更小。也就是说，如果你将 <code>config.style.page.font</code> 设置为 <code>'Helvetica 18'</code>，那么正文文本的最小尺寸将始终是 18 像素。
</aside>

如果这些变量中的任何一个被设置为错误的类型，例如 `config.style.fontScaling.baseViewportWidth` 被设置为 `'blue'`，那么 Chapbook 将不会执行任何字体缩放。

## 一个示例｜An Example

这些变量可能有些抽象。让我们通过一个示例来理解。我们假设玩家的浏览器设置没有增大或减小字体大小。

```
config.page.font: 'Helvetica 20'
config.style.fontScaling.baseViewportWidth: 1000
config.style.fontScaling.addAtDoubleWidth: 5
config.style.fontScaling.maximumSize: '30px'
```

| 当视口宽度为… | 字体大小为…                                    |
| ----------------------------- | --------------------------------------------------------------------------------- |
| 1000 p像素及以下      | 20 像素。使用原始尺寸。                   |
| 1000-2000 像素          | 从 20 像素线性缩放到 25 像素。
| 精确为 2000 像素   | 25 像素：原始尺寸加上在 `addAtDoubleWidth` 中设置的像素量。 |
| 2000-3000 像素         | 从 25 像素线性缩放到 30 像素。 |
| 3000 像素及更宽      | 30 像素。它受到 `maximumSize` 的限制。                            |

以下是此内容的视觉呈现。

<div style="text-align: center; background: white">
<img src="font-scaling.svg" alt="" height="337" width="350">
</div>
