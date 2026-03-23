# 添加自定义插入｜Adding Custom Inserts

Chapbook 可以通过自定义插入内容进行扩展。以下代码添加了一个 `{smiley face}` 插入，用于显示 😀 表情符号。

```
[JavaScript]
engine.extend('2.0.0', () => {
	engine.template.inserts.add({
		match: /^smiley face$/i,
		render: () => '😀'
	});
});
```

您还可以将类似这样的代码放入 Twine 故事中的 JavaScript 部分——这里使用 `[JavaScript]` 修饰符以增加清晰度。[^1]

首先，任何对 Chapbook 引擎的扩展都必须封装在 `engine.extend()` 函数调用中。第一个参数是使你的插入内容正常工作所需的最低 Chapbook 版本；这样，如果你分享你的自定义内容，任何将其插入到无法兼容的 Chapbook 版本中的用户都会收到一个无害的警告，而不是引擎因错误而崩溃。Chapbook [遵循语义化版本控制](https://semver.org/)以协助实现这一点。

`engine.extend()` 的第二个参数是你想要运行的自定义代码。在这个函数中，我们添加了一个新的插入内容，它是一个具有两个属性的对象：

-   `match`: 模板引擎将查找以渲染插入内容的正则表达式。请省略花括号；模板引擎会为你处理这一点。插入内容的 `match` 属性必须始终至少包含一个空格，这样它们就永远不会被误认为是变量插入。
-   `render`: 一个返回应显示内容的字符串的函数。返回的值最终将作为 Markdown 渲染。

你可能还记得，插入内容可以[接受多个参数](./modifiers-and-inserts/link-inserts.md)。以下是一个更复杂的示例来演示这一点：

```
[JavaScript]
engine.extend('2.0.0', () => {
	engine.template.inserts.add({
		match: /^icon of/i,
		render(firstArg, props, invocation) {
			let result = '';

			if (firstArg.toLowerCase() === 'wizard') {
				result = '🧙';
			}

			if (firstArg.toLowerCase() === 'vampire') {
				result = '🧛';
			}

			switch (props.mood.toLowerCase()) {
				case 'anger':
					result += '💥';
					break;

				case 'love':
					result += '❤️';
					break;
			}

			return result;
		}
	});
});
```

这会产生以下效果：

| 输入                                 | 显示 |
| ------------------------------------- | --------- |
| `{icon of: 'wizard'}`                 | 🧙        |
| `{icon of: 'wizard', mood: 'anger'}`  | 🧙💥      |
| `{icon of: 'wizard', mood: 'love'}`   | 🧙❤️      |
| `{icon of: 'vampire'}`                | 🧛        |
| `{icon of: 'vampire', mood: 'anger'}` | 🧛💥      |
| `{icon of: 'vampire', mood: 'love'}`  | 🧛❤️      |

首先，请注意，`match` 属性并不试图匹配整个插入内容；它只需要能够将此插入与其他任何已输入的插入区分开来。同时，请记住，插入的第一部分需要是两个单词，即`icon of`，以便将其与变量插入区分开。

然后，`render()` 属性接受三个新参数：`firstArg`, `props`（属性）, 和 `invocation`（调用）。`firstArg` 是提供给插入第一部分的参数，`props` 是一个对象，列出了插入中给出的所有其他参数。属性名称区分大小写，因此 `{icon of: 'wizard', mood: 'anger'}` 将只显示 🧙。最后一个参数 `invocation` 是整个插入文本，完全按照输入时的样子，但不包括周围的花括号。提供这个参数是为了在 `firstArg` 或 `props` 不足以实现你想要的效果时，你可以直接查看 `invocation`。

以下是一些示例，说明这些参数在实际中如何工作。

| 输入                                   | firstArg  | props             | invocation                            |
| --------------------------------------- | --------- | ----------------- | ------------------------------------- |
| `{smiley face}`                         | `null`    | `{}`              | `smiley face`                         |
| `{smiley face: 'happy'}`                | `'happy'` | `{}`              | `smiley face: 'happy'`                |
| `{smiley face, size: 'large'}`          | `null`    | `{size: 'large'}` | `smiley face, size: 'large'`          |
| `{smiley face: 'happy', size: 'large'}` | `'happy'` | `{size: 'large'}` | `smiley face: 'happy', size: 'large'` |

[^1]: 重要提醒：不能在同一个段落中定义并使用同一个插入内容。