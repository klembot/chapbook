# 嵌入段落｜Embedding Passages

在分支叙事中，一个常见的需求是让不同的路径汇聚在一起。实现这一点的最简单方法是让两个段落链接到同一个段落，但你也可以通过将一个段落嵌入到另一个段落中，以在故事中创造一个不那么明显的衔接。

例如，想象一下，主角在前往名为“L.A.”的段落途中，要么乘坐飞机，要么乘坐火车：

```
你花了几个小时看着云朵在飞机机翼下飘移，随后抵达了[[L.A.]]。
```

```
The cross-country train ride leaves plenty of space for contemplation on the way to [[L.A.]]
```

你也可以使用 `{embed passage}` 插入功能，直接将段落合并：

```
You spend a few hours watching the clouds drift below the wings of the plane.

{embed passage: 'L.A.'}
```

```
The cross-country train ride leaves plenty of space for contemplation.

{embed passage: 'L.A.'}
```

两段文字将在其文本下方显示“L.A.”段落的内容。除了段落名称外，`{embed passage}` 的插入不接受任何其他参数。

请记住，与任何插入功能一样，`{embed passage}` 可以放置在段落文本的任何位置。它可以夹在段落的文本之间，甚至可以重复使用。