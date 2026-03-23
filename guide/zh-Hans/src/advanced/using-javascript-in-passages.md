# 在段落中使用 JavaScript｜Using JavaScript in Passages

作为最后的手段，Chapbook 允许您在段落文本中混入 JavaScript。为此，请使用 `[JavaScript]` 修饰符：

```
[JavaScript]
document.title = '一个棘手的困境';

[continued]
“哎呀，”你暗自思忖，“那块污渍怕是再也洗不掉了。”
```

JavaScript 修饰符在 Chapbook 中通常不会输出任何内容；但是，如果您想输出文本，该修饰符提供了一个函数 `write()`——就是普通的 `write()`，而不是 `document.write()`——它将输出 HTML 源代码。通过 `write()` 输出的文本将进行链接和 Markdown 处理。

下面是一个展示 `write()` 如何工作的例子：

```
在你发脾气之前，先在心里默数：

[JavaScript]
for (let i = 1; i <= 10; i++) {
	write(i + '... ');
}
```

你可以像在 JavaScript 中预期的那样引用在变量部分定义的变量。在 JavaScript 中更改它们也会如预期般保持更改。

```
颜色: '红色的'
--
[JavaScript]
write(`天空是${颜色}。`);
```

因此，如果你希望你的 JavaScript 代码与故事的其他部分进行通信，最简单的方法是在 变量部分将变量设置为初始值。如果你真的需要在 JavaScript 中创建新变量，可以像下面这样调用 `engine.state.set()`。不过，这种用法在 Chapbook 的未来版本中可能会改变，而在变量部分初始设置变量将始终有效。

```
[JavaScript]
let 颜色 = '红色';
engine.state.set('天气', '阳光明媚');

[continued]
真是个{天气}的日子。天空是{颜色}的。
```

这将显示：

> 真是个阳光明媚的日子。天空是{颜色}。

`{颜色}` 会原样显示，因为如果 Chapbook 找不到匹配的插入内容或变量名，它会按输入时的原样显示文本。任何使用 `let` 或 `const` 声明的变量对其他 Chapbook 代码*不可见*，并且不会在浏览器会话之间保留。
