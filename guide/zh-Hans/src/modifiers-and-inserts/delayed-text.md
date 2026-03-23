# 延迟文本｜Delayed Text

您也可以使用修饰符使段落中的部分文本延迟显示。如果您从未见过这种效果，不妨看看 Stephen Granade 的《不会让我走》的引言部分。句子会逐渐淡入淡出，最终只留下一个词——“记住”。虽然那个故事并非用 Chapbook 构建，但您可以使用 Chapbook 的延迟文本功能来实现相同的效果。

以下是该修饰符的实际应用示例：

```
你安顿下来，准备度过漫长的跨大西洋飞行。

[after 1 second]
你突然想起家里的炉子没关。
```
文本 `[after 1s]` 永远不会向玩家显示。相反，Chapbook 会在前一段文本显示一秒后，呈现“`你突然想起家里的炉子没关。`。

您可以在 `after` 修饰符[^1]中使用任意时间单位，且可缩写时间单位。以下均为有效格式：

```
[after 300 milliseconds]
[after 300ms]
[after 1 minute]
```
`after` 修饰符仅允许使用整数。因此，不能写作 `1.5 seconds`，而必须写成 `1 second 500 milliseconds`，或更简短的写法：`1s500ms` 或 `1500ms`。

## 关于使用 `after` 的建议｜Advice on Using `after`

应谨慎使用 `after` 修饰符，且在设定延迟时间时需考虑到每个人的阅读速度不同。一分钟或许看似不长，但对于阅读速度快的玩家而言却无比漫长。

Chapbook 通过在页面右下角显示一个动画手表图标来提示后续将有更多文本出现，不耐烦的玩家可通过点击鼠标或按键跳过延迟。此功能无法被禁用。

## 修饰符通常创建段落｜Modifiers Normally Create Paragraphs

修饰符通常会使紧随其后的文本与前文处于不同的段落中。不过，在某些情况下，您可能希望文本与前一段落一起显示。`append` 修饰符可以实现这一效果。

```
你终于解开了这个谜团。

[after 500ms; append]
但随后你突然意识到：为什么皮考克夫人的手提包里会有一根铅管呢？
```

分号允许您将多个修饰符连接在同一行中。它相当于：

```
[after 500ms]
[append]
但随后你突然意识到：为什么皮考克夫人的手提包里会有一根铅管呢？
```

无论您以何种顺序放置 `append` 修饰符，这都无关紧要；与 `after` 不同，您可以单独输入它，无需任何额外说明。

[will not let me go]: http://ifarchive.org/if-archive/games/competition2017/Will%20Not%20Let%20Me%20Go/Will%20Not%20Let%20Me%20Go.html

[^1]: 包括，令人头疼的是，日、月、年。Chapbook使用一个名为 `timestring` 的库来解析这些延迟。其[文档](https://github.com/mike182uk/timestring/blob/master/README.md#keywords)列出了所有可能性。