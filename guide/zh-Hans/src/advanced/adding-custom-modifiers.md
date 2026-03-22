# 添加自定义修饰符｜Adding Custom Modifiers

Chapbook 也可以通过自定义修饰符进行扩展。以下代码添加了一个功能为将文本转换为大写的修饰符：

```
[JavaScript]
engine.extend('2.0.0', () => {
  engine.template.modifiers.add({
    match: /^uppercase$/i,
    process(output) {
      output.text = output.text.toUpperCase();
    }
  });
});
```

您也可以将类似代码放入 Twine 中故事的 JavaScript 部分——为清晰起见，这里使用了 `[JavaScript]` 修饰符。

<aside data-hint="danger">
你不能在同一个段落中定义并使用一个修饰符。
</aside>

关于 `engine.extend()`（引擎扩展）函数调用的解释，请参见[《添加自定义插入》](adding-custom-inserts.md)的第一部分。`match`（匹配）属性的工作原理与插入的 `match` 属性相同；Chapbook 会将可能的修饰符文本与 `match` 属性进行比较，直到找到匹配项。

`process()` 属性是修饰符执行其功能的地方。它接收的 `output`（输出）参数有三个属性。每一个都是 Markdown 源代码，*而非*最终渲染的 HTML。

- `text`，即修饰符所应用的文本。
- `startsNewParagraph`，一个布尔值，指示此文本块是否应开始新段落。（例如，[append 修饰符](./modifiers-and-inserts/delayed-text.md)将此值设为 `false`。）

修饰符还会接收一个参数，`options`，上述示例未展示此参数。`options` 是一个包含两个属性的对象：

- `state`（状态），一个私有状态对象，在单个段落中修饰符的多次调用间持续存在。
- `invocation`（调用），即修饰符中键入的确切文本，不包含其周围的方括号。

以下是一个示例，展示了如何利用 `state` 和 `invocation` 来逐步删除段落中的字母。

```
[JavaScript]
engine.extend('2.0.0', () => {
  engine.template.modifiers.add({
    match: /^(also\s)?remove\b/i,
    process(output, {invocation, state}) {
      const invokeLetters = invocation.replace(/^(also\s)?remove\s/, '').split('');

      state.letters = (state.letters ?? []).concat(invokeLetters);

      for (const letter of state.letters) {
        output.text = output.text.replace(new RegExp(letter, 'gi'), 'X');
      }
    }
  });
});
```

因此，以下段落（摘自 Kurt Vonnegut 的《第五号屠宰场》）……

```
[remove aeiou]
American planes, full of holes and wounded men and corpses took off backwards from an airfield in England. Over France a few German fighter planes flew at them backwards, sucked bullets and shell fragments from some of the planes and crewmen. They did the same for wrecked American bombers on the ground, and those planes flew up backwards to join the formation.

[also remove shrdlu]
The formation flew backwards over a German city that was in flames. The bombers opened their bomb bay doors, exerted a miraculous magnetism which shrunk the fires, gathered them into cylindrical steel containers, and lifted the containers into the bellies of the planes. The containers were stored neatly in racks. The Germans below had miraculous devices of their own, which were long steel tubes. They used them to suck more fragments from the crewmen and planes. But there were still a few wounded Americans, though, and some of the bombers were in bad repair. Over France, though, German fighters came up again, made everything and everybody as good as new.

[also remove t]
When the bombers got back to their base, the steel cylinders were taken from the racks and shipped back to the United States of America, where factories were operating night and day, dismantling the cylinders, separating the dangerous contents into minerals. Touchingly, it was mainly women who did this work. The minerals were then shipped to specialists in remote areas. It was their business to put them into the ground, to hide them cleverly, so they would never hurt anybody ever again.
```
……将显示为：

    XmXrXcXn plXnXs, fXll Xf hXlXs Xnd wXXndXd mXn Xnd cXrpsXs tXXk Xff bXckwXrds frXm Xn XXrfXXld Xn XnglXnd. XvXr FrXncX X fXw GXrmXn fXghtXr plXnXs flXw Xt thXm bXckwXrds, sXckXd bXllXts Xnd shXll frXgmXnts frXm sXmX Xf thX plXnXs Xnd crXwmXn. ThXy dXd thX sXmX fXr wrXckXd XmXrXcXn bXmbXrs Xn thX grXXnd, Xnd thXsX plXnXs flXw Xp bXckwXrds tX jXXn thX fXrmXtXXn.

    TXX fXXmXtXXn fXXw bXckwXXXX XvXX X GXXmXn cXty tXXt wXX Xn fXXmXX. TXX bXmbXXX XpXnXX tXXXX bXmb bXy XXXXX, XxXXtXX X mXXXcXXXXX mXgnXtXXm wXXcX XXXXnk tXX fXXXX, gXtXXXXX tXXm XntX cyXXnXXXcXX XtXXX cXntXXnXXX, XnX XXftXX tXX cXntXXnXXX XntX tXX bXXXXXX Xf tXX pXXnXX. TXX cXntXXnXXX wXXX XtXXXX nXXtXy Xn XXckX. TXX GXXmXnX bXXXw XXX mXXXcXXXXX XXvXcXX Xf tXXXX Xwn, wXXcX wXXX XXng XtXXX tXbXX. TXXy XXXX tXXm tX XXck mXXX fXXgmXntX fXXm tXX cXXwmXn XnX pXXnXX. BXt tXXXX wXXX XtXXX X fXw wXXnXXX XmXXXcXnX, tXXXgX, XnX XXmX Xf tXX bXmbXXX wXXX Xn bXX XXpXXX. XvXX FXXncX, tXXXgX, GXXmXn fXgXtXXX cXmX Xp XgXXn, mXXX XvXXytXXng XnX XvXXybXXy XX gXXX XX nXw.

    WXXn XXX bXmbXXX gXX bXck XX XXXXX bXXX, XXX XXXXX cyXXnXXXX wXXX XXkXn fXXm XXX XXckX XnX XXXppXX bXck XX XXX XnXXXX XXXXXX Xf XmXXXcX, wXXXX fXcXXXXXX wXXX XpXXXXXng nXgXX XnX XXy, XXXmXnXXXng XXX cyXXnXXXX, XXpXXXXXng XXX XXngXXXXX cXnXXnXX XnXX mXnXXXXX. XXXcXXngXy, XX wXX mXXnXy wXmXn wXX XXX XXXX wXXk. XXX mXnXXXXX wXXX XXXn XXXppXX XX XpXcXXXXXXX Xn XXmXXX XXXXX. XX wXX XXXXX bXXXnXXX XX pXX XXXm XnXX XXX gXXXnX, XX XXXX XXXm cXXvXXXy, XX XXXy wXXXX nXvXX XXXX XnybXXy XvXX XgXXn.

最后，在某些情况下，你可能希望修饰符能直接修改作者输入的原始文本，即在插入内容和链接被转换为 Markdown/HTML 的等效形式之前进行处理。为此，你可以编写一个 `processRaw()` 函数来替代 `process` 函数。它接收的参数与 `process()` 函数完全相同。