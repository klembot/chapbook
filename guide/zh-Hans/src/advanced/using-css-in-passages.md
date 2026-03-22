# 在段落中使用 CSS｜Using CSS in Passages

大多数情况下，自定义故事外观的最佳方式是使用 [Chapbook 的内置功能][customization]或 Twine 中的*编辑样式表*菜单项。不过，也可以通过 [CSS] 修饰符创建特定于段落的 CSS。

```
[CSS]
.page article {
	color: green;
}

[continued]
这段文本将会是绿色的。
```

此修饰符中的 CSS 将全局应用——因此需要使用 `.page article` 选择器。

[customization]: ./customization