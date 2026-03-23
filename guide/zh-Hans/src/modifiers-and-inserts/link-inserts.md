# 链接插入｜Link Inserts

有时您想链接到某个段落，但不确定其确切名称。以下面这段为例：

```
你沿着小巷走了一小段路。黑色垃圾袋在夏日高温下散发出的气味令人难以忍受——它以三种各自不同却又难以名状的方式汹汹袭来——于是你[[暂且退却]]。
```

一切都很好，只是小巷通常有两个入口。如果玩家可以通过两种不同方式到达这个段落，您如何确保他们返回正确的位置？您可以使用插入来实现这一点。插入是段落文本中的特殊指令，用花括号括起来，`{像这样}`，它们会被解释而不是逐字显示。之所以称为插入，是因为它们指示 Chapbook 为您在文本中插入某些内容。在这种情况下，我们希望 Chapbook 插入一个链接，指向玩家到达此段落之前正在查看的段落。

在这种情况下，我们会这样写：

```
你沿着小巷走了一小段路。黑色垃圾袋在夏日高温下散发出的气味令人难以忍受——它以三种各自不同却又难以名状的方式汹汹袭来——于是你{back link, label: '暂且退却'}。
```

插入内容遵循以下格式：

<p class="insert-example">
	<span class="punc">{</span>
	<span class="identifier">插入名称</span>
	<span class="punc">:</span>
	<span class="direct-object">值</span>
	<span class="punc">,</span>
	<span class="param1">
		<span class="param-name">参数名称</span>
		<span class="punc">:</span>
		<span class="param-value">值</span>
	</span>
	<span class="punc">,</span>
	<span class="param2">
		<span class="param-name">参数名称</span>
		<span class="punc">:</span>
		<span class="param-value">值</span>
	</span>
	<span class="punc">}</span>
</p>

-	*插入名称* (Insert name) 指示此插入的类型，例如`back link`（反向链接）。
-	*参数名称* (Parameter names) 指示了插入内容应如何显示或行为的更具体描述，例如 `label`。每种插入类型接受不同的参数名称。与值不同，参数名称从不使用引号包围。一个插入可以包含任意数量的参数，包括零个。上例中展示了两个参数，以说明它们由逗号分隔。
-	*值* (Values) 用于指定插入内容的行为。如果参数值是文本——例如词语“暂时撤退”——则必须用单引号或双引号包围，以便 Chapbook 知道文本的起始和结束位置。单引号和双引号的处理方式没有区别；这样书写只是为了方便，例如 `{back link, label: '惊呼道, "哎呀，我真是万万没想到！"'}`[^1]。任何其他类型的值，例如数字，则不得使用引号包围。

插入内容必须全部位于一行——不允许使用回车键进行换行。

除了插入名称外，上述示例中的所有内容都是可选的。不同的插入使用此用法的不同变体——例如，`back link` 插入在插入名称后不使用值：

<p class="insert-example">
	<span class="punc">{</span>
	<span class="identifier">back link</span>
	<span class="punc">,</span>
	<span class="param1">
		<span class="param-name">label</span>
		<span class="punc">:</span>
		<span class="param-value">'暂时撤退'</span>
	</span>
	<span class="punc">}</span>
</p>

您也可以省略 `label`（标签）属性，直接写成 `{back link}`: 在这种情况下，Chapbook 会默认使用 ‘Back’ 一词作为链接标签。

如果 Chapbook 无法理解插入内容，它会按原样显示。这样您就可以在文本中正常使用花括号。

<aside data-hint="danger">
您不能在插入内容中嵌套其他插入内容。
</aside>

## 重新开始故事｜Restarting the Story

还有一种与 `{back link}` 非常相似的插入功能，名为 `{restart link}`。它不会将玩家带回到之前的段落，而是让玩家回到故事的起点。你当然也可以通过名称链接回第一个段落，但现在，可以将其视为一个便捷的快捷方式。`{restart link}` 还会重置 Chapbook 操作的其他方面，你将在[《会话间的连续性》](./state/continuity.md)章节中了解到。

与 `{back link}` 一样，`{restart link}` 允许你指定一个标签：

```
{restart link, label: '哦，算了吧'}
```

如果你单独写 {restart link}，Chapbook 会使用标签 ‘Restart’。

## 手动链接｜Manual Links

你也可以使用插入 `{link to}` 来插入链接。以下是一些示例：

```
经过一番过度的深思熟虑后，你决定下载{link to: 'https://mozilla.org/firefox', label: '火狐浏览器'}。

你注意到一旁有条{link to: '狭窄小巷'}。

正好需要一位{link to: 'Bryan Mills', label: '身怀*绝技*的男子'}。
```

第三个例子展示了手动插入链接的一种用途：尽管它们比简单链接更为冗长，但确实允许你在链接标签中使用 Markdown 格式。段落链接还有其他用途；关于如何动态更改链接目标，请参阅[变量部分][vars-in-inserts]。

## 循环链接｜Cycling Links

Chapbook 提供了一种循环链接插入功能——这种链接不会将玩家导向任何地方，而是会改变其显示标签。更多信息请参阅菜单与[循环链接][cycling]章节。

[vars-section]: ./state/the-vars-section.html
[cycling]: ./player-input/dropdown-menus-cycling-links.md
[vars-in-inserts]: ./state/the-vars-section.html#expressions-can-be-used-in%20inserts

[^1]: 如果需要在以相同标点符号分隔的文本值内使用单引号或双引号，请在其前面加上反斜杠（`\`），例如：`{back link, label: '"我无 (couldn\'t) 可奉告，" 他回答道。'}`

<style>
.insert-example {
	font-size: 120%;
	text-align: center;
	display: flex;
	justify-content: center;
}

.insert-example span {
	display: flex;
}

.insert-example .punc {
	padding: 0 0.2em;
	color: #868e96; /* gray-6 */
	background-color: #f1f3f5; /* gray-1 */
}

.insert-example .identifier {
	padding: 0 0.2em;
	background-color: #ffe3e3; /* red-1 */
}

.insert-example .direct-object, .insert-example .param-value {
	padding: 0 0.2em;
	background-color: #d0ebff; /* blue-1 */
}

.insert-example .param-name {
	padding: 0 0.2em;
	background-color: #ffe8cc; /* orange-1 */
}
</style>