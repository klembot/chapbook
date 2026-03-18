# 图像｜Images

## 嵌入您自己的图像｜Embedding Your Own Images

要在段落中显示图像，请使用 `{embed image}` 插入：

```
要知道，可能已经上千年没人踏足过这个洞穴了。洞口长满了青苔和落叶。

{embed image: '洞穴.jpeg', alt: '洞穴入口'}
```
（王洛木：当然，你也可以通过把网络图片链接的地址插入进去以引用。）

`alt` 属性的解释请参见下文“替代文本”部分。

## 嵌入来自 Flickr 的图片｜Embedding Images from Flickr

Flickr 是一个历史悠久的摄影服务平台，允许用户将上传的照片标记为可供嵌入。若某张照片支持嵌入功能，您会在照片右下角看到一个类似箭头的图标。选择该选项将显示用于嵌入的代码，这段代码通常较为冗长。请务必使用“嵌入”标签页中的代码，而非“分享”或 "BBCode" 标签页的代码。获取代码后，请按以下方式使用 `{embed Flickr image}` 插入功能。

(注：截止至本文翻译的 2026 年，Flickr 无法在中国大陆访问，请使用其它方案。)

```
生动的夜空：

{embed Flickr image: '<a data-flickr-embed="true"  href="https://www.flickr.com/photos/kees-scherer/43929816675/in/photolist-29VVN1k-MxBBfR-Mxmaoa-2abPdAf-28uxzXE-MsR1ev-MqbA18-P2bWEY-29LvwHZ-P1DPQ7-2b3znq5-28jiA4E-2b4qGd6-29QQrVa-2a4C5X3-MhDEFV-2b3tVwa-MfPdhz-2aZTken-2aTGEx1-2aVbrLg-NLVUU7-289o89h-288U1wq-2aN6BuN-NH87Jm-2aQH3Ta-NDwgPd-NB3Mym-2aHjvXP-29jgSN2-29zFLg5-27TFbQw-Nw3iLs-2aD2Dfn-27SXWGo-29f84mZ-LRdL8r-2aVtHgk-2awe7hj-29ux7nq-LPVrYk-2avhxQJ-2azf7ct-2ayX3mM-2aygKz8-27Nwi91-27NmmvS-NqvSME-2axAzDV" title="The Andromeda Galaxy, Messier 31"><img src="https://farm2.staticflickr.com/1857/43929816675_07357e53b0_m.jpg" width="240" height="185" alt="The Andromeda Galaxy, Messier 31"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>', alt: 'the Andromeda galaxy'}
```

<aside data-hint="danger">
Flickr 允许嵌入图片并不意味着您可以随意在作品中使用该图片。请务必查看图片页面中上传者标注的<em>许可协议</em>。部分图片可能禁止用于商业项目，而其他图片可能完全禁止使用。
</aside>

<aside data-hint="working">
其他类型的图像嵌入功能可能会在 Chapbook 的未来版本中出现，同时布局方面也会有更大的灵活性——例如，让图像显示在文本的左侧或右侧。
</aside>

## 替代文本｜Alternate Text

无论您的图像来自何处，都必须为其提供 _替代文本_。这是为了让有视觉障碍的玩家能够获得与无障碍玩家同等的体验。[WebAIM][webaim-alt-text] 对替代文本有非常详尽的阐述，但核心要点是：替代文本应包含对图像内容的简要描述，以便在朗读故事时能为听众提供良好的理解。因为对于有视觉障碍的玩家而言，他们通常确实会通过屏幕阅读软件来听取故事内容。

撰写替代文本时，请避免使用"亚伯拉罕·林肯的图像"或"波士顿港照片"这类表述——直接使用"亚伯拉罕·林肯"或"波士顿港"即可。

如果您的图像纯粹是装饰性的——例如，一个花哨的边框——那么它应该设置空的替代文本，以便屏幕阅读器可以跳过它：这并不意味着完全省略`alt`属性，而是将其设置为空字符串，如下所示。

```
{embed image: 'asterisk.jpeg', alt:''}
```

[^1]: Although several browsers, Safari most prominent among them, hide the full URL from you unless uo specifically ask for it.

[flickr]: https://flickr.com
[unsplash]: https://unsplash.com
[webaim-alt-text]: https://webaim.org/techniques/alttext/