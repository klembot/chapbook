# 插入｜Inserts

以下所有内容都会导致文本或其他类型的内容出现在您的段落中。更多信息请参阅[修饰符和插入][mods-inserts]。

<dl>

<dt>
<code>{ambient sound: 'sound name'<i>, volume: 0.5</i>}</code>
</dt>

<dd>
开始播放<a href="./multimedia/audio.html">预先定义的环境音效</a>。可以省略 <code>volume</code>（音量）参数；默认情况下，环境音效将以最大音量播放。
</dd>

<dt>
<code>{back link<i>, label: 'Back'</i>}</code>
</dt>

<dd>
渲染指向先前段落的链接。可以省略 <code>label</code>（标签）参数；Chapbook 将默认使用 'Back' 作为标签。
</dd>

<dt>
<code>{cycling link<i> for '变量名'</i>, choices: ['一', '二', '三']}</code>
</td>

<dd>
渲染一个循环链接，遍历选项列表中列出的 <code>choices</code>，将玩家选择的选项保存到指定变量名中。若省略 <code>for '变量名'</code>，Chapbook 将不会保存所选值。
</dd>

<dt>
<code>{dropdown menu<i> for '变量名'</i>, choices: ['一', '二', '三']}</code>
</td>

<dd>
渲染一个下拉菜单，遍历选项列表中列出的 <code>choices</code>，将玩家选择的选项保存到指定变量名中。若省略 <code>for '变量名'</code>，Chapbook 将不会保存所选值。
</dd>

<dt>
<code>{embed Flickr image: '从 Flicker 得到的嵌入代码', alt: '替换文本'}</code>
<br>
缩写形式：<code>{embed Flickr: '从 Flicker 得到的嵌入代码', alt: '替换文本'}</code>
</dt>

<dd>
渲染一张托管在 Flickr 上的图片，并使用 <code>alt</code> 指定的替代文本。
</dd>

<dt>
<code>{embed image: 'URL 地址', alt: '替换文本'}</code>
</dt>

<dd>
渲染指定 URL 地址的图片，并使用 <code>alt</code> 指定的替代文本。
</dd>

<dt>
<code>{embed passage named: '段落名称'}</code>
<br>
简写形式：<code>{embed passage: '段落名称'}</code>
</dt>

<dd>
渲染指定插入段落的文本。这会执行该段落中的任何变量部分。
</dd>

<dt>
<dt>
<code>{embed Unsplash image: 'URL 地址', alt: '替换文本'}</code>
<br>
简写形式：<code>{embed Unsplash: 'URL 地址', alt: '替换文本'}</code>
</dt>

<dd>
渲染一张托管在 Unsplash 上的图片，并使用 <code>alt</code> 指定的替代文本。
</dd>

<dt>
<code>{embed YouTube video: 'URL 地址'}</code>
<br>
简写形式：<code>{embed YouTube: 'URL 地址'}</code>
</dt>

<dd>
渲染托管在 YouTube 上的视频播放器。
</dd>

<dt>
<code>{link to: '段落名称或 URL 地址'<i>, label: '标签'</i>}</code>
</dt>

<dd>
渲染指向段落名称或地址的链接。<code>label</code> 可以省略；Chapbook 将使用段落名称或 URL 地址作为标签。
</dd>

<dt>
<code>{restart link<i>, label: '标签'</i>}</code>
</dt>

<dd>
渲染一个可重新开始故事的链接。<code>label</code> 可以省略；在这种情况下，Chapbook 将使用 'Restart'。
</dd>

<dt>
<code>{reveal link: '标签', text: '揭露文本'}</code>
</dt>

<dd>
渲染一个链接，点击或轻触时会展开显示 <code>text</code> 的属性内容。
</dd>

<dt>
<code>{reveal link: '标签', passage: '段落名称'}</code>
</dt>

<dd>
渲染一个链接，点击或轻触时会展开显示由 <code>passage</code> 属性指定的段落名称的内容。
</dd>

<dt>
<code>{sound effect: 'sound name'<i>, volume: 0.5</i>}</code>
</dt>

<dd>
开始播放一个[预先定义好的音效][sound]。<code>volume</code> 可以省略；默认情况下，环境音效将以最大音量播放。
</dd>

<dt>
<code>{text input<i> for: '变量名'</i>, <i>required: false</i>}</code>
</td>

<dd>
渲染一个文本字段，将输入的文本保存到指定变量名中。<code>for '变量名'</code> 可省略；此时 Chapbook 不会将所选值保存到任何地方。<code>required</code> 也可省略；除非另行指定，否则 Chapbook 将使该字段成为必填项。
</dd>

<dt>
<code>{theme switcher<i>, darkLabel: '标签'</i>, <i>lightLabel: '标签'</i>}</code>
</td>

<dd>
渲染一个在浅色和深色主题之间切换的链接。<code>darkLabel</code> 和 <code>lightLabel</code> 分别设置当前主题为深色或浅色时显示的标签。
</dd>

</dl>

[sound]: ./multimedia/audio.md
[mods-inserts]: ./modifiers-and-inserts/