# 音频｜Audio

Chapbook 支持两种类型的音频：*环境音*和*音效*。环境音是持续播放的音频，例如音乐或背景噪音，播放完毕后会自动循环。音效是一次性的声音，比如开门声或爆炸声。

音效与环境音之间还有另外两个区别：

- 通常情况下，同一时间只能播放一种环境音。
- 音效会在故事开始时预加载。这样当你在故事中要求播放某个音效时，就能最大程度减少播放前的延迟。但这也意味着你需要注意所用音效的文件大小。预加载过程会在玩家与故事互动时于后台进行，因此大型音效文件不会延迟故事的开始。但加载大文件仍然会造成资源浪费。

你还需要确保所有音频均为 MP3 格式。虽然存在 Ogg Vorbis 或 WAV 等其他音频格式，但不同浏览器对这些格式的支持程度各异。MP3 是兼容性最广的通用格式。包括开源软件 [Audacity] 在内的许多应用程序都能帮你将音频文件转换为 MP3 格式。

## 音效｜Sound Effects

在播放音效前，你必须在故事状态中先定义它。以下是如何定义音效的示例：

```
sound.effect.爆炸.url: '爆炸.mp3'
sound.effect.爆炸.description: '一场大爆炸'
--
计时器显示为 0:00…
```

`explosion` 关键字定义了环境音的名称，你稍后会用到它。`url` 属性定义了加载声音的地址，`description` 则提供了声音内容的文字描述。这样，听力有困难的玩家或已将故事静音的玩家就能获得声音的替代版本。

定义好音效后，你可以使用 `{sound effect}` 插入在段落中播放它。

```
sound.effect.爆炸.url: '爆炸.mp3'
sound.effect.爆炸.description: '一场大爆炸'
--
计时器显示为 0:00…

{sound effect: '爆炸'}
```

插入的确切位置很重要。如果玩家禁用了声音，或无法听到你的声音，他们将在你插入的地方看到 `description` 属性的文本。

如果你在同一段落中插入多个不同的音效，它们会同时播放。如果某个音效仍在播放时，玩家进入了另一个插入了该音效的段落，则第二次插入不会产生效果。（王洛木：也就是说，正在播放音效不会因为被另一段落中重复触发而重播或打断。）

如果你需要重复播放一个音效，请多次定义它。你可以通过赋值整个对象来节省时间。例如：

```
sound.effect.爆炸.url: '爆炸.mp3'
sound.effect.爆炸.description: '一场大爆炸'
sound.effect.爆炸2: sound.effect.爆炸
--
计时器显示为 0:00…

{sound effect: '爆炸'}

[[哦呼。]]
```

（请注意，在设置 `sound.effect.爆炸2` 的那一行中，`sound.effect.爆炸` 没有使用引号。）

将 `sound.effect.爆炸2` [对象][object]整体赋值，而不是逐属性设置，可以让它成为 `sound.effect.爆炸` 的一个副本。如果你之后更改了 `sound.effect.爆炸` 的某个属性，`sound.effect.爆炸2` 也会随之改变。

接着，在名为`哦呼。`的段落中，你会写道：

```
这还不算太糟。等等……

{sound effect: '爆炸2'}
```

## 环境音效｜Ambient Sound

定义环境音效的过程与定义音效非常相似。

```
sound.ambient.森林.url: '森林.mp3'
sound.ambient.森林.description: '中午的森林氛围声'
--
完美的一天。
```

同样地，你可以通过插入 `{ambient sound}` 来开始播放环境音效。

```
sound.ambient.森林.url: '森林.mp3'
sound.ambient.森林.description: '中午的森林氛围声'
--
{ambient sound: '森林'}

完美的一天。

```

唯一的区别在于，音效会淡入播放，如果已有环境音正在播放，两者会交叉淡出过渡。淡入淡出的具体时长由状态变量 `sound.transitionDuration` 决定。该变量为字符串格式，与 [after 修饰符][after modifier]接受的格式相同。

若要停止播放所有环境音，请写入 `{no ambient sound}`。

## 控制音效音量｜Controlling Sound Volume

要设置故事的主音量，可将状态变量 `sound.volume` 更改为 0 到 1 之间的小数。0 表示静音，1 表示最大音量。您也可以通过将 `sound.mute`（注意末尾没有字母 D）设为 `true` 来临时静音所有音效。使用 `sound.mute` 的优势在于，它允许您在静音状态与先前设置的音量之间切换。

```
{sound effect: '爆炸', volume: 0.5}
{ambient sound: '森林', volume: 0.5}
```

## 浏览器自动播放问题｜Browser Autoplay Problems

Chapbook 会尽力在游戏会话之间恢复音频播放，这样如果你开始播放环境音效，每当玩家返回你的故事时，音效都会自动继续。然而，这种做法与大多数浏览器对网页加载时立即播放声音的严格限制相冲突。部分浏览器会全面禁止此类行为，而另一些则会考虑玩家在托管你故事的网站上的行为记录——如果玩家之前在该网站有过频繁互动，浏览器可能会允许播放，但具体的允许标准往往并不明确。

但是玩家在故事中点击或轻触链接后播放声音，无论浏览器的自动播放政策如何，这个操作都会终有效。

## 手动控制声音｜Manually Controlling Sound

您也可以通过将音效或环境音的 `playing` 属性设置为 `true` 来手动播放声音。音效播放完毕后，该属性会自动变为 `false`，但环境音的播放属性除非您使用 `{ambient sound}` 插入或再次将其播放属性设为 `false`，否则不会改变。

所以您可以将此用于更复杂的效果，例如叠加环境音；但必须*确保*为无法听到音频的人提供适当的描述。为此，请将描述内容置于`<audio>` 和 `</audio>` 标签之间，如下所示：

```
sound.ambient.森林.playing: true
sound.ambient.下雨.playing: true
--
你走到室外了了。

<audio>雨林的背景音</audio>
```

其中的文本通常不会显示。

[Audacity]: https://www.audacityteam.org/
[object]: ./state/objects-and-lookups.md
[after modifier]: ./modifiers-and-inserts/delayed-text.md