<div class="intro intro-path">
    <h1>简介｜Introduction</h1>
</div>

本文是面向 Twine 2[^1] 的 Chapbook 故事格式指南。故事格式决定了通过 Twine 编辑器创作的故事在网页浏览器中的呈现方式；当您在 Twine 中点击"**启动**"按钮或将故事发布为文件时，所选的故事格式便会接管后续处理。

Chapbook 的设计宗旨是让创作者易于使用，同时为玩家生成赏心悦目的阅读体验。它为您的故事提供了合理的默认行为，并支持根据特定需求进行自定义调整。

本指南不要求您具备任何编程知识；不过，了解 CSS 或 JavaScript 会有所帮助，因为本指南大量运用了这两种技术。指南分为若干章节，将循序渐进地引导您完成故事创作过程。

但本指南默认您已熟悉 Twine 2 编辑器本身。若您是 Twine 的新用户，[《Twine 2 指南》]((http://twinery.org/wiki/twine2:guide)) 是绝佳的入门资料。网络上还有大量可供参考的教程资源。

## 许可协议｜Licensing

Chapbook 基于 [MIT 许可证](mit-license)发布。简而言之，您可将其用于创作免费或商业作品，无需支付任何版权费用。虽不强制要求，但若能在作品鸣谢中提及 Chapbook 与 Twine，我们将不胜感激。

因为 Chapbook 是开源的，其持续的开发与维护得到了以下 [Patreon]((https://patreon.com/klembot)) 支持者的资助：

<div class="patreon-supporters">
    <ul>
		<li>Anastasia Salter</li>
		<li>Andrew Smith</li>
		<li>Ben McKenzie</li>
		<li>Ben Sawyer</li>
		<li>Brendan Hennessy</li>
		<li>Caelyn Sandel</li>
		<li>Clive Henrick</li>
		<li>Dan Steward</li>
		<li>David Ball</li>
		<li>Emily Short</li>
		<li>Ian</li>
		<li>Illia</li>
		<li>January November</li>
		<li>Joe Nobody</li>
		<li>John Chapman</li>
		<li>John McDaid</li>
		<li>José Dias</li>
		<li>JRUndercover</li>
		<li>Konstanty Kalicki</li>
		<li>LDK</li>
		<li>max puliero</li>
		<li>Molly Jameson</li>
		<li>Robert Giacinto</li>
		<li>RSS</li>
		<li>Sarah Choukah</li>
		<li>Snophysh</li>
		<li>Soliriok</li>
		<li>Stuart Moulthrop</li>
		<li>Thandle2</li>
		<li>TheBuggiest</li>
		<li>Tielesti</li>
		<li>Travis</li>
		<li>Venceremos</li>
    </ul>
</div>

特定等级的赞助者可获得开发日志访问权限及其他奖励。若您使用 Chapbook，请考虑[在 Patreon 上支持本项目](https://patreon.com/klembot)。

## 浏览器支持｜Browser Support

Chapbook 支持由 [browserslist 项目](https://github.com/browserslist/browserslist)设定的`默认`网页浏览器集合。您可以在 [browserl.ist](https://browserl.ist/) 上查看其详细内容。

## 如何使用 Chapbook｜How to Use Chapbook

Chapbook 现已作为 Twine 2 编辑器的一部分捆绑提供，尽管 Twine 的发布有时会落后于 Chapbook。如果您希望单独使用它，或手动更新，请在顶部 **Twine** 工具栏选项卡下选择“**故事格式**”选项，然后点击顶部工具栏中的“**添加**”按钮。将[主页上的地址](https://klembot.github.io/chapbook/)粘贴到 Twine 显示的文本字段中。

完成此操作后，您必须将正在创作的故事设置为使用 Chapbook 发布。编辑您的任意一篇故事，然后从编辑器底部的故事菜单中选择"**更改故事格式**"。在此处选择 Chapbook。完成设置后，点击播放按钮或将故事发布为文件时都将采用 Chapbook 格式。

## 为何选择 Chapbook｜Why To Use Chapbook

在 Twine 2 故事格式的众多选择中，难免令人眼花缭乱。那么 Chapbook 具备哪些优势呢？

-   Chapbook 源代码易于阅读。它禁止某些编程实践，例如嵌套条件语句[^2]，同时强制推行其他规范（比如将所有变量声明集中置于段落固定位置），这些设计使得代码逻辑更易于追踪。

-   Chapbook 内置了常见创作场景的功能。从循环链接到延迟文本，许多你想在故事中实现的效果只需一行代码即可完成。

-   Chapbook 设有辅助测试的后台视图，允许你实时检查游戏状态、动态修改变量，并可在任意节点保存进度，从而快速定位故事特定环节的问题。

-   Chapbook 专为多设备适配设计，尤其优化移动端体验。它采用响应式布局技术，能根据屏幕尺寸自动调整页面排版，确保在任何设备上无需缩放或多余滚动即可舒适阅读。同时其代码结构轻量化——目前仅 120 KB，即使在蜂窝网络下也能在一秒内完成加载。

-   Chapbook 的外观可以在不了解 HTML 或 CSS 的情况下进行自定义，它内置的工具让你能够立即在故事中预览样式更改，因此无需学习浏览器开发者工具，你就能打造出理想的外观。

## 为什么不使用 Chapbook｜Why Not To Use Chapbook

-   Chapbook 还很年轻。这意味着除了本指南之外，相关资源非常稀缺，远不及那些历史悠久的格式（如 SugarCube 和 Harlowe）的众多教程。如果你遇到问题或疑问，能求助的人也会更少。

-   你已经投入了大量时间学习另一种故事格式。Chapbook 能做到的事情，其他格式也都能实现。根据你的喜好，用它写作可能更容易，但如果你已经花时间学习了另一种故事格式的写作方法，再投入时间可能就不值得了。

## 关于名称的题外话｜An Aside on Names

关于 Twine 产出的是游戏还是仅仅故事，一直存在一些争论：事实上，使用 Twine 既可以制作游戏，也可以创作互动故事，还能创造出那些难以确切归类的事物。秉承着困扰那些偏爱清晰界限的形式主义者的精神，本指南将你在 Chapbook 中创作的内容称为 _故事_，而与你分享这些故事的人则称为 _玩家_，但你不应从这个用法中推断出任何特定含义。请用 Twine 和 Chapbook 创造出奇妙的作品吧。


[^1]: 遗憾的是，Chapbook 无法与 Twine 1 版本兼容使用。
[^2]: 如果你有编程经验，这个想法可能会立即引起一些警觉——没有这个功能，怎么可能写出任何严肃的作品呢？[条件显示](state/conditional-display.md) 功能讨论了这个主题，但如果你直接跳过去看，可能会有点难以理解。

[mit-license]: https://en.wikipedia.org/wiki/MIT_License

<style>
.patreon-supporters {
		border: 1px solid var(--fg);
		border-radius: 2px;
    padding: 1em;
    margin-bottom: 1em;
}

.patreon-supporters ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
}

.patreon-supporters li {
    text-align: center;
}

</style>