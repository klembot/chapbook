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

Only if the player had found the key earlier do they see "You could try unlocking it with the key you found," but in all cases they see "You consider turning back." There are two new modifiers here:

- _if_, which only displays the text below it if the expression in the modifier evaluates to true. As with backticks, you can enter anything that eventually evaluates to a boolean[^1]. Some more examples:
  - `[if stringVariable === 'red']`
  - `[if dollarsInPocket > 5]`
  - `[if 2 + 2 === 4]`
- _continue_, which clears all active modifiers. This in fact applies to all active modifiers, but it's most often used with _if_ and its cousins. You can abbreviate _continue_ as _cont'd_, _cont_, or elongate it as _continued_. Regardless of which one you choose, it has the same effect.

## Unless Conditions

In certain cases, it's more expressive to use an _unless_ instead of an _if_.

```
[unless tookAntidote]
You've run out of time. Your breath catches in your throat; your body slips from the chair, and the world turns dark.
```

_unless_ modifiers work exactly the same as _if_ ones, only they display the text following them if their condition evaluates to false.

## Else Conditions

The wording of the previous example is a bit awkward. We could make it flow better using an _else_ condition:

```
[if hasKey]
You could try [[unlocking it]] with the the key you found, or just [[turn back]].

[else]
Nothing to do here but [[turn back]].
```

_else_ modifiers display the text following them if the previous _if_ did not display. It has no relationship with _unless_ conditions.

## Modifiers (Including Conditional Ones) Cannot Be Nested

It is not possible to directly nest conditional modifiers in Chapbook. Meaning:

```
[if hasKey]
You could [[open the door]]...


```

## Disabling Conditions For Testing

It can be useful to temporarily force a conditional modifier to always 

TODO discussion of whether to make conditional display explicit to players

[^1]: Truthfully, it is also possible to write `[if stringVariable]` or `[if 2 + 2]`. In these cases, any non-empty string (e.g. not `''`) is treated as true, and any non-zero number is treated as true. It's best to be explicit, however, and write `[if stringVariable !== '']` and `[if 2 + 2 !== 0]`.