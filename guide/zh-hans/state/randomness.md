# 随机性｜Randomness

随机性是创造互动体验的强大工具。它不仅能用于模拟——例如决定角色行动是否成功，就像桌面角色扮演游戏那样——还能用于美学目的，从改变文本措辞到创造完全随机的叙事。

在 Chapbook 中利用随机性的主要方式是通过 `random` 对象中的[查询变量][lookups]。例如：

```
[if random.coinFlip]
正面！

[else]
反面！
```

……在故事运行时，有一半的概率会显示“正面！”，另一半概率显示“反面！”。`random.coinFlip` 的值在每次使用时都可能发生变化。[^1]

如需更精细的随机性，可以使用查询变量，例如 `random.d100`，这是一个介于 1 到 100 之间的随机整数。完整列表如下：

查询            | 范围 
------------------|------
`random.fraction` | 0-1
`random.d4`       | 1-4
`random.d5`       | 1-5
`random.d6`       | 1-6
`random.d8`       | 1-8
`random.d10`      | 1-10
`random.d12`      | 1-12
`random.d20`      | 1-20
`random.d25`      | 1-25
`random.d50`      | 1-50
`random.d100`     | 1-100

上面列出的所有查询结果都是整数，只有 `random.fraction` 例外，它是介于 0 到 1 之间的小数。

使用这些查询变量时容易犯的一个错误是忘记它们的值每次被调用时都会改变。例如：

```
[if random.d4 === 1]
一。

[if random.d4 === 2]
二。

[if random.d4 === 3]
三。

[if random.d4 === 4]
四。
```

上面这段文字可能只显示一个段落，但也可能显示多个段落，甚至完全不显示任何内容。由于 `random.d4` 的值会变化，最终结果可能呈现如下形式：

```
[if 4 === 1]
一。

[if 2 === 2]
二。

[if 1 === 3]
三。

[if 4 === 4]
四。
```

…这将显示：


```
二。

四。
```

若想重复使用某个特定的随机值，最简单的方法就是将其赋值给变量，例如：[^2]

```
_chosen: random.d4
--
[if _chosen === 1]
一。

[if _chosen === 2]
二。

[if _chosen === 3]
三。

[if _chosen === 4]
四。

```

## Chapbook 是伪随机的｜Chapbook Is Pseudorandom

Chapbook 的随机性并非真正随机：实际上，它生成随机数的过程完全可预测。这听起来可能很荒谬，但几乎所有计算机生成的随机数都是如此运作的。Chapbook 使用的是所谓的伪随机数生成器，它基于一个种子值生成一串看似随机的数字。

伪随机数生成器在使用特定种子值时，总会生成相同的数值。除非另有说明，Chapbook 将采用基于游戏流程首次启动日期时间的种子值，因此每个会话将呈现不同的伪随机数值。Chapbook将此种子值存储在 `config.random.seed` 中，该变量支持读取与写入操作。

不过，你为何要更改伪随机种子呢？这有助于测试——例如，如果有人报告了你的故事存在问题，你可以将种子值设置为他们的，从而能够完全按照他们经历的方式重现事件。你还可以在提供给他人测试的故事版本中手动设置种子值，以确保每个人都有一致的体验。

[^1]: 也就是说，正如[《Rosencrantz 和 Guildenstern 已死》][rosencrantz]中所展示的那样，`random.coinFlip` 在被读取后仍可能保持相同的值。
[^2]: 此例在变量名中使用下划线来标识临时变量，但请记住这仅是一种约定。

[lookups]: objects-and-lookups.html
[rosencrantz]: https://en.wikipedia.org/wiki/Rosencrantz_and_Guildenstern_Are_Dead#Act_One