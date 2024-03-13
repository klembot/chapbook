# Adding Custom Modifiers

Chapbook can also be extended with custom modifiers. Below is code that adds a
modifier that turns its text uppercase:

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

You can also place code like this into your story's JavaScript in Twine--this
uses the `[JavaScript]` modifier for clarity.

<aside data-hint="danger">
You cannot define a modifier in the same passage that you use it in.
</aside>

See [the first part of Adding Custom Inserts](adding-custom-inserts.md) for an
explanation of the `engine.extend()` function call. The `match` property works
the same way as the `match` property for an insert; Chapbook compares possible
modifier text with `match` properties until it finds a match.

The `process()` property is where the work of a modifier occurs. The `output`
argument it is passed has three properties. Each one is Markdown source code,
_not_ HTML as it will be finally rendered.

- `text`, the text that the modifier is being applied to.
- `startsNewParagraph`, a Boolean value indicating whether this block of text
  should begin a new paragraph. (The [append
  modifier](../modifiers-and-inserts/delayed-text.md), for example, sets this to
  `false`.)

Modifiers also receive two other arguments which the example above didn't show:

- `state`, a private state object that is carried over invocations of a modifier
  in a single passage
- `invocation`, the exact text that was typed in the modifier, without the
  square brackets surrounding it

Below is an example showing how `state` and `invocation` can be used to remove
more and more letters from a passage.

```
[JavaScript]
engine.extend('2.0.0', () => {
	engine.template.modifiers.add({
		match: /^(also\b)?remove\b/i,
		process(output, state, invocation) {
			const invokeLetters = invocation.replace(/^(also\b)?remove/, '').split('');

			state.letters = (state.letters || []).concat(invokeLetter);
			state.letters.forEach(letter => {
				output.text = output.text.replace(new RegExp(letter, 'gi'), 'X');
			});
		}
	});
});
```

So that the following passage (from Kurt Vonnegut's _Slaughterhouse Five_)...

```
[remove aeiou]
American planes, full of holes and wounded men and corpses took off backwards from an airfield in England. Over France a few German fighter planes flew at them backwards, sucked bullets and shell fragments from some of the planes and crewmen. They did the same for wrecked American bombers on the ground, and those planes flew up backwards to join the formation.

[also remove shrdlu]
The formation flew backwards over a German city that was in flames. The bombers opened their bomb bay doors, exerted a miraculous magnetism which shrunk the fires, gathered them into cylindrical steel containers, and lifted the containers into the bellies of the planes. The containers were stored neatly in racks. The Germans below had miraculous devices of their own, which were long steel tubes. They used them to suck more fragments from the crewmen and planes. But there were still a few wounded Americans, though, and some of the bombers were in bad repair. Over France, though, German fighters came up again, made everything and everybody as good as new.

[also remove t]
When the bombers got back to their base, the steel cylinders were taken from the racks and shipped back to the United States of America, where factories were operating night and day, dismantling the cylinders, separating the dangerous contents into minerals. Touchingly, it was mainly women who did this work. The minerals were then shipped to specialists in remote areas. It was their business to put them into the ground, to hide them cleverly, so they would never hurt anybody ever again.
```

... Would display as:

    XmXrXcXn plXnXs, fXll Xf hXlXs Xnd wXXndXd mXn Xnd cXrpsXs tXXk Xff bXckwXrds frXm Xn XXrfXXld Xn XnglXnd. XvXr FrXncX X fXw GXrmXn fXghtXr plXnXs flXw Xt thXm bXckwXrds, sXckXd bXllXts Xnd shXll frXgmXnts frXm sXmX Xf thX plXnXs Xnd crXwmXn. ThXy dXd thX sXmX fXr wrXckXd XmXrXcXn bXmbXrs Xn thX grXXnd, Xnd thXsX plXnXs flXw Xp bXckwXrds tX jXXn thX fXrmXtXXn.

    TXX fXXmXtXXn fXXw bXckwXXXX XvXX X GXXmXn cXty tXXt wXX Xn fXXmXX. TXX bXmbXXX XpXnXX tXXXX bXmb bXy XXXXX, XxXXtXX X mXXXcXXXXX mXgnXtXXm wXXcX XXXXnk tXX fXXXX, gXtXXXXX tXXm XntX cyXXnXXXcXX XtXXX cXntXXnXXX, XnX XXftXX tXX cXntXXnXXX XntX tXX bXXXXXX Xf tXX pXXnXX. TXX cXntXXnXXX wXXX XtXXXX nXXtXy Xn XXckX. TXX GXXmXnX bXXXw XXX mXXXcXXXXX XXvXcXX Xf tXXXX Xwn, wXXcX wXXX XXng XtXXX tXbXX. TXXy XXXX tXXm tX XXck mXXX fXXgmXntX fXXm tXX cXXwmXn XnX pXXnXX. BXt tXXXX wXXX XtXXX X fXw wXXnXXX XmXXXcXnX, tXXXgX, XnX XXmX Xf tXX bXmbXXX wXXX Xn bXX XXpXXX. XvXX FXXncX, tXXXgX, GXXmXn fXgXtXXX cXmX Xp XgXXn, mXXX XvXXytXXng XnX XvXXybXXy XX gXXX XX nXw.

    WXXn XXX bXmbXXX gXX bXck XX XXXXX bXXX, XXX XXXXX cyXXnXXXX wXXX XXkXn fXXm XXX XXckX XnX XXXppXX bXck XX XXX XnXXXX XXXXXX Xf XmXXXcX, wXXXX fXcXXXXXX wXXX XpXXXXXng nXgXX XnX XXy, XXXmXnXXXng XXX cyXXnXXXX, XXpXXXXXng XXX XXngXXXXX cXnXXnXX XnXX mXnXXXXX. XXXcXXngXy, XX wXX mXXnXy wXmXn wXX XXX XXXX wXXk. XXX mXnXXXXX wXXX XXXn XXXppXX XX XpXcXXXXXXX Xn XXmXXX XXXXX. XX wXX XXXXX bXXXnXXX XX pXX XXXm XnXX XXX gXXXnX, XX XXXX XXXm cXXvXXXy, XX XXXy wXXXX nXvXX XXXX XnybXXy XvXX XgXXn.

Finally, in some cases, you may want a modifier to modify the source text as it
was exactly entered by the author, before inserts and links are transformed into
Markdown/HTML equivalents. To do this, write a `processRaw()` function instead
of `process`. It takes the same exact arguments that `process()` does.
