# 深色主题｜Dark Theme

Chapbook 提供两种主题：

- *浅色*主题，采用浅色背景搭配深色文字
- *深色*主题，即在深色背景上显示浅色文字

它首先使用与*系统主题*相对应的主题。现在大多数操作系统都允许用户为界面选择浅色或深色外观。例如，在 macOS 中，这需要在系统设置的“外观”中进行配置；而在较新的 Windows 版本中，则需在个性化选项的“颜色”部分进行设置。如果 Chapbook 无法检测到系统主题，或者玩家使用的浏览器未向网页提供此信息，则将默认使用浅色主题。

Chapbook 会在故事页脚处显示一个名为**切换主题**的链接，允许玩家在浅色和深色主题之间进行切换。与其他[状态](./state/)设置一样，该设置会在多个游戏会话之间保持记忆。

浅色主题也可被视为默认主题。当深色主题启用时，Chapbook 会对深色主题未定义的样式使用浅色主题。通常深色主题仅在色彩方面与浅色主题存在差异，因此您无需重复设置某些样式（例如字体）。

下面这些行为均可自定义。

- 您可以同时自定义浅色与深色主题。
- 您可以将 Chapbook 锁定为仅使用单一主题：既可以是默认的浅色主题，也可以是您自定义的主题。 
- 您可以在故事的其他位置放置切换主题的链接。

## 使用后台的样式选项卡自定义主题｜Customizing Themes Using the Style Backstage Tab

后台的**样式**选项卡顶部有文字说明当前激活的是浅色还是深色主题。使用该文字旁的**切换主题**按钮可在浅色与深色主题间切换。此按钮的功能与页面页脚中的**切换主题**链接完全相同。

**页面**、**页眉**和**页脚**下方的文本字段会更新显示当前主题的对应值。当深色主题激活时，若特定样式仍沿用浅色主题的定义，则该字段会以浅灰色显示对应数值。

**主题切换**复选框控制着 Chapbook 是否会在主题之间切换。如果取消勾选此项，Chapbook 将始终使用浅色主题，无视系统设置，并会隐藏页面上的主题切换器。

## 在代码中自定义主题｜Customizing Themes in Code

本节中所有关于如何自定义外观的描述都适用于默认的浅色主题。例如，设置 `config.style.page.font` 会调整浅色主题下的[字体](fonts-and-colors.html)。

深色主题使用的变量名与浅色主题几乎相同，但它们以 `config.style.dark` 开头，而非 `config.style`。因此，`config.style.dark.page.font` 用于设置深色主题下的字体。

如果深色主题变量未定义，Chapbook 将回退至浅色主题对应变量所设置的值。

举个例子，请参考以下变量：

```
config.style.backdrop: 'blue-3'
config.style.dark.backdrop: 'blue-6'
config.style.page.font: 'Courier 24'
```

深色与浅色主题都将使用 Courier 24 作为字体，但深色主题的背景色为深蓝色，而浅色主题的背景色为浅蓝色。

<aside data-hint="info">
若设置 c<code>config.style.dark.page.style.borderColor</code>，请务必同时设置 <code>config.style.dark.page.style.border</code>，即使其值与 <code>config.style.page.style.border</code>（即浅色主题版本）相同。这是此类变量在屏幕显示转换过程中的特殊处理要求。
</aside>

## 在代码中使用当前主题｜Using the Current Theme in Code

[查询](./state/objects-and-lookups.html) `browser.darkTheme` 保存着当前主题是否为深色 (`true`) 或浅色 (`false`) 的信息。与其他查找器一样，您不能直接更改此值。请按照下文所述，设置 `config.style.page.theme.override`。

还有一个 `browser.darkSystemTheme` 查询，其作用方式与 `browser.darkTheme` 相同，但不会考虑 Chapbook 代码中的任何覆盖设置。它会尽最大能力报告系统是否正在使用深色主题。

## 控制主题切换｜Controlling Theme Switching

[变量](./state/the-vars-section.html) `config.style.page.theme.override` 用于追踪 Chapbook 正在使用的主题。

| 值           | 效果                                          |
| --------------- | ----------------------------------------------- |
| `'light'`       | 无论系统主题如何，始终使用浅色主题 |
| `'dark'`        |无论系统主题如何，始终使用深色主题 |
| 任何其他值 | 使用系统主题                       |

页面页脚中出现的“切换主题”链接会更改此值。您也可以直接设置此值。

您可以使用 `{theme switcher}` [插入](./modifiers-and-inserts/link-inserts.html)来显示切换主题的链接。您可以像这样自定义每个主题显示的标签：

`{theme switcher, darkLabel: '使用浅色主题', lightLabel: '使用深色主题'}`

标签名称可能令人困惑。它们指的是当前主题，而不是将要切换到的主题。因此，如上例所示，`darkLabel` 是点击链接将切换到浅色主题时显示的标签。

如果您希望无论当前主题如何都显示相同的标签，请将 `darkLabel` 和 `lightLabel` 设置为相同的值。

## 禁用主题切换｜Disabling Theme Switching

如果您希望故事无论系统主题如何都使用相同的主题，请将变量 `config.style.page.theme.enableSwitching` 设置为 `false`。这将导致 Chapbook 无论系统主题和 `config.style.page.theme.override` 中设置的任何值如何，都仅使用浅色主题。它还会导致所有 `{theme switcher}` 插入内容被隐藏。

尽管此变量使 Chapbook 使用浅色主题（例如，在 `config.style` 下定义的主题，而非 `config.style.dark`），但您仍然可以将此主题定义为任意外观。如果您希望故事仅呈现深色背景上的浅色文字，可以自定义相应的浅色主题。