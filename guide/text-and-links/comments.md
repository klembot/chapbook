# Comments

You may want to enter text in your story as a note to yourself as you work--for example, to note that a passage needs some revision, clarify how players could reach a passage, or just remind yourself where to pick up in your next editing session.

To do this, enclose text in `<!--` and `-->` as below.

```
It was a dark and stormy night. <!-- TODO: come up with a more original beginning -->
```

When Chapbook displays the passage, it will only show `It was a dark and stormy night.` If you'd like to write a longer note, feel free to put the comment start and end on separate lines.

```
It was a dark and stormy night.
<!--
Perhaps I want to set this in daytime instead. It doesn't really make sense for the protagonist to be up late like this...
-->
```

Placing markers like `TODO` or `FIXME` in comments are tricks of the programmer trade: it's easy to do a search in the Twine editor on these terms to make sure you've addressed everything before a release.

{% hint style="danger" %}
Comments are still visible to anyone who knows how to use their web browser's development tools. If you are familiar with HTML, you'll recognize the examples above as HTML comments, which do not display but remain in the displayed page's source code. Don't put anything you need to keep secret in a comment.
{% endhint %}
