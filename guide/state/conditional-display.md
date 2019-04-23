# Conditional Display

The other common use of variables in stories is to block off access to a branch, or conversely unlock a hidden part of a story. In order to do this with Chapbook, you'll need to combine a variable with a modifier.

For instance, let's say you have a passage where the protagonist finds a key hidden in the weeds:

```
hasKey: true
--
It's the strangest thing: there, in the weeds that surround the base of the tree, is a single rusted key.

After picking it up, you decide to [[move on]].
```

Then later in the story, when the protagonist encounters the door the key belongs to:

```
At the end of the hall, you find a featureless steel door.

[if hasKey]
You could try [[unlocking it]] with the key you found.

[continue]
You consider [[turning back]].
```

Only if the player had found the key earlier do they see "You could try unlocking it with the key you found," but in all cases they see "You consider turning back." The `if` modifier only displays the text below it if the expression in the modifier evaluates to true. You can enter anything that eventually evaluates to a boolean[^1]. Some more examples:
  - `[if stringVariable === 'red']`
  - `[if dollarsInPocket > 5]`
  - `[if 2 + 2 === 4]`

## Unless Conditions

In certain cases, it's more expressive to use an `unless` instead of an `if`.

```
[unless tookAntidote]
You've run out of time. Your breath catches in your throat; your body slips from the chair, and the world turns dark.
```

`unless` modifiers work exactly the same as `if` ones, only they display the text following them if their condition evaluates to false.

## Else Conditions

The wording of the first example in this section is a bit awkward. We could make it flow better using an `else` modifier:

```
[if hasKey]
You could try [[unlocking it]] with the the key you found, or just [[turn back]].

[else]
Nothing to do here but [[turn back]].
```

`else` modifiers display the text following them if the previous `if` did not display. They have no relationship with `unless` conditions. `else`s also only apply on a per-passage basis; if you use an `if` in one passage, you cannot place the matching `else` in a different passage. If you find yourself wanting to do something along these lines, instead repeat the same condition in the second passage and use an `unless` instead of an `if`.

## Modifiers (Including Conditional Ones) Cannot Be Nested

It is not possible to directly nest conditional modifiers in Chapbook. Meaning:

```
[if hasKey]
You could [[open the door]]...

[if monsterDistance < 2]
... and it might be your best chance for survival.
```

Would, if `hasKey` is false and `monsterDistance` is 1, only display:

```
... and it might be your best chance for survival.
```

This is because modifiers only affect the text directly following them. They do not affect modifiers before or after them in the text, or any other text. You should instead write:

```
[if hasKey]
You could [[open the door]]...

[if hasKey && monsterDistance < 2]
... and it might be your best chance for survival.
```
Let's take a more complicated example:

* The player must have first found a certain secret door by looking.
* Once found, the door can only be unlocked with a key they previously found.
* Once unlocked, the door remains open.

This might be written in the popular SugarCube story format as:

```
<<if $doorFound>>
<<if $doorUnlocked>>
The door stands open and unlocked, ready for you to [[enter it]].
<<else>>
You've found a door here, <<if $hasKey>>ready to be [[unlocked]]<<else>>but you haven't found a key yet that will open it.
<</if>>
<<else>>
There seems to be nothing of note here, but perhaps [[a search would turn up something]].
<</if>>
```

(This example omits, for brevity's sake, the other passages where `$doorFound` and `$hasKey` would be set.)

In Chapbook, you could instead use temporary variables to simplify some of the logic of the passage, and write:

```
_doorOpen: doorFound && doorUnlocked
_doorLocked: doorFound && !doorUnlocked
--
[if _doorOpen]
The door stands open and unlocked, ready for you to [[enter it]].

[if _doorLocked]
You've found a door here,

[if _doorLocked && hasKey; append]
ready to be [[unlocked]].

[if _doorLocked && !hasKey; append]
but you haven't found a key yet that will open it.

[if !doorFound]
There seems to be nothing of note here, but perhaps [[a search would turn up something]].
```

Remember that `doorFound`, `doorUnlocked`, and `hasKey` are set in other passages. And beware--you cannot use an `[else]` in front of `but you haven't found a key yet that will open it.` The `else` will display in all cases that the `[if]` does not, even when `doorFound` is `false`.

An alternate method is to move parts of your logic to a separate passage and [embed it][embed-passage]:

```
_doorOpen: doorFound && doorUnlocked
_doorLocked: doorFound && !doorUnlocked
--
[if doorFound && doorUnlocked]
The door stands open and unlocked, ready for you to [[enter it]].

[if doorFound && !doorUnlocked]
{embed passage: 'locked door logic'}

[if !doorFound]
There seems to be nothing of note here, but perhaps [[a search would turn up something]].
```

Which approach is best to take depends on the situation. It's not a good idea to embed passages more than one level deep.

## Disabling Conditions For Testing

It can be useful to override a conditional modifier so that it always or never displays, regardless of circumstances.

{% hint style='working' %}
Chapbook will eventually allow you to temporarily override a condition during testing, perhaps by changing [if] to [ifalways] or [ifnever], but the actual implementation of this idea may change.
{% endhint %}

[^1]: Truthfully, it is also possible to write `[if stringVariable]` or `[if 2 + 2]`. In these cases, any non-empty string (e.g. not `''`) is treated as true, and any non-zero number is treated as true. It's best to be explicit, however, and write `[if stringVariable !== '']` and `[if 2 + 2 !== 0]`.
[embed-passage]: ../text-and-links/embedding-passages.html