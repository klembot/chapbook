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

Only if the player had found the key earlier do they see "You could try unlocking it with the key you found." There are two new modifiers here:

- _if_, which only displays the content below it if the expression in the modifier is true
- _continue_, which resets all active modifiers

TODO discussion of whether to make conditional display explicit to players