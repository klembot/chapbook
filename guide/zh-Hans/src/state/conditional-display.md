# 条件性显示｜Conditional Display

故事中变量的另一个常见用途是封锁对某个分支的访问，或者相反地解锁故事的隐藏部分。要在 Chapbook 中实现这一点，你需要将变量与修饰符结合使用。

例如，假设你有一个段落，描述主人公在杂草丛中发现一把钥匙：


```
hasKey: true
--
真是件怪事：就在树根周围的杂草丛中，躺着一把锈迹斑斑的钥匙。

捡起钥匙后，你决定[[继续前进]]。
```

随后在故事中，当主人公遇到这把钥匙对应的门时：

```
在大厅的尽头，你发现一扇毫无特色的钢门。

[if hasKey]
你可以尝试用找到的钥匙[[打开它]]。

[continue]
你思考了一下，只得[[转身回去]]。
```

只有当玩家早些时候找到了钥匙，他们才会看到“你可以试试用找到的钥匙打开它”，但在所有情况下他们都会看到“你思考了一下，只得转身回去”。`if` 修饰符仅在修饰符中的表达式评估为真时，才显示其下方的文本。你可以输入任何最终能评估为布尔值[^1]的内容。更多示例：

  - `[if stringVariable === 'red']`
  - `[if dollarsInPocket > 5]`
  - `[if 2 + 2 === 4]`

## 除非条件｜Unless Conditions

在某些情况下，使用 `unless` 比使用 `if` 更具表现力。

```
[unless tookAntidote]
时间已耗尽。你的呼吸在喉间停滞；身体从椅子上滑落，世界陷入黑暗。
```

`unless` 修饰符的工作方式与 `if` 完全相同，唯一的区别是，只有当它们的条件评估为假时，才会显示其后的文本。

## 否则条件｜Else Conditions

本节第一个示例的措辞有些生硬。我们可以使用 `else` 修饰符使其更流畅：

```
[if hasKey]
你可以试试用找到的钥匙[[打开它]]，或者直接[[转身离开]]。

[else]
除了[[转身离开]]以外，无事可做。
```

`else` 修饰符会在前一个 `if` 未显示文本时显示其后的文本。它们与 `unless` 条件无关。`else` 也仅适用于单个段落；如果你在一个段落中使用 `if`，则不能将匹配的 `else` 放在另一个段落中。如果你发现需要跨段落实现类似逻辑，请在第二个段落中使用 `unless` 来替代 `if`然后重复相同的判断条件。

## 修饰符（包括条件修饰符）不能嵌套｜Modifiers (Including Conditional Ones) Cannot Be Nested

在 Chapbook 中，无法直接嵌套条件修饰符。这意味着：

```
[if hasKey]
你可以[[打开门]]...

[if monsterDistance < 2]
……这或许是你生存的最佳机会。
```

如果 `hasKey` 为 false 且 `monsterDistance` 为 1，则只会显示：

Would, if `hasKey` is false and `monsterDistance` is 1, only display:

```
……这或许是你生存的最佳机会。
```

这是因为修饰符仅影响紧随其后的文本。它们不会影响文本中位于其前或后的其他修饰符，也不会影响任何其他文本。要解决这一问题，你应该这样写：

```
[if hasKey]
你可以[[打开门]]...

[if hasKey && monsterDistance < 2]
……这或许是你生存的最佳机会。
```

让我们来看一个更复杂的例子：

* 玩家必须首先通过观察找到某扇特定的秘密门。
* 一旦找到，这扇门只能用他们之前找到的钥匙来解锁。
* 一旦解锁，门将保持开启状态。

这可以用流行的SugarCube故事格式写成：

```
<<if $doorFound>>
<<if $doorUnlocked>>
门敞开着，没有上锁，随时欢迎你[[踏入其中]]。
<<else>>
你在这里发现了一扇门，<<if $hasKey>>随时可以[[解锁]]<<else>>但还没找到能打开它的钥匙。
<</if>>
<<else>>
这里似乎没什么值得注意的，但也许[[搜索一下会有所发现]]。
<</if>>
```

（为简洁起见，本例省略了设置 `$doorFound` 和 `$hasKey` 的其他代码段。）

在 Chapbook 中，您可以使用临时变量来简化段落的部分逻辑，并写成：
```
_doorOpen: doorFound && doorUnlocked
_doorLocked: doorFound && !doorUnlocked
--
[if _doorOpen]
门敞开着，没有上锁，随时欢迎你[[踏入其中]]。

[if _doorLocked]
你在这里发现了一扇门，

[if _doorLocked && hasKey; append]
准备好被[[解锁]]。

[if _doorLocked && !hasKey; append]
但你还没找到能打开它的钥匙。

[if !doorFound]
这里似乎没什么值得注意的，但也许[[搜索一下会有发现]]。
```

请记住，`doorFound`、`doorUnlocked` 和 `hasKey` 是在其他段落中设置的。请注意——您不能在“`但你还没找到能打开它的钥匙。`”前使用 [else]。该 else 会在所有 [if] 不成立的情况下显示，即使 `doorFound` 为 `false` 时也是如此。

另一种方法是将部分逻辑移至单独的段落并[嵌入](./modifiers-and-inserts/embedding-passages.html):


An alternate method is to move parts of your logic to a separate passage and [embed it](./modifiers-and-inserts/embedding-passages.html):

```
_doorOpen: doorFound && doorUnlocked
_doorLocked: doorFound && !doorUnlocked
--
[if doorFound && doorUnlocked]
门敞开着，未上锁，静候你[[踏入其中]]。

[if doorFound && !doorUnlocked]
{embed passage: 'locked door logic'}

[if !doorFound]
这里似乎没什么值得注意的，但也许[[搜索一下会有发现]]。
```

采用哪种方法最佳取决于具体情况。不建议将段落嵌入超过一个层级。

## 禁用测试条件｜Disabling Conditions For Testing

覆盖条件修饰符使其无论何种情况都始终显示或从不显示，这个功能有时会很有用。为此，只需将 [if] 改为 [ifalways] 或 [ifnever] 即可。

```
[ifnever 1 + 1 === 2]
这原本应该通过常规的[if]条件显示，但实际并未显示。
```
这将影响其后出现的任何[else]修饰符。

[^1]: 实际上，也可以写成 `[if stringVariable]` 或 `[if 2 + 2]`。在这些情况下，任何非空字符串（例如非 `''`）都被视为真，任何非零数字也被视为真。不过，最好还是明确地写成 `[if stringVariable !== '']` 和 `[if 2 + 2 !== 0]`。