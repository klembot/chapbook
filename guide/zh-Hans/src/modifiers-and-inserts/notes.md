# Notes

You may want to enter text in your story as a note to yourself as you work--for example, to note that a passage needs some revision, clarify how players could reach a passage, or just remind yourself where to pick up in your next editing session.

To do this, use the `[note]` modifier.

```
It was a dark and stormy night.

[note]
I really need a better beginning.
```

When Chapbook displays the passage, it will only show `It was a dark and stormy night.` You can write `[note to myself]` or `[n.b.]`[^1] instead of `[note]`. You can also write `[fixme]` and `[todo]`, which come from the programming world. They work identically to `[note]`, but you can easily do a search in the Twine editor for these terms to make sure you've addressed everything before a release. `[todo]` is useful for noting things yet to be implemented, while `[fixme]` is useful for problems you've noticed, but haven't yet had time to fix.

You can, of course, use more than one note in a passage, and mix them with regular text:

```
It was a dark and stormy night.

[note]
I really need a better beginning.

[todo]
Maybe have the screen flash?

[continue]
And you felt quite depressed.
```

These notes are stored separately from what is entered in the [Notes backstage tab](../text-and-links/backstage.md), unfortunately.

<aside data-hint="danger">
Unlike backstage comments, notes are still visible to anyone who knows how to use their web browser's development tools. Don't put anything you need to keep secret in a note.
</aside>

[^1]: Short for _nota bene_, which is a fancy way to write _pay attention to this_.