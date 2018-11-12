# Forks

It's a staple of interactive fiction to show a set of possible choices together, often at the end of a passage. The _Choose Your Own Adventure_ series of books would have text like this at the bottom of a page:

> If you decide to walk along the beach, turn to page 5.
>
> If you decide to climb the rocky hill, turn to page 6.

We don't need to specify page numbers when working in a digital format, of course, but it can still be nice to set off these choices from the rest of the text. Chapbook calls these bundles of links _forks_, and they are signalled by placing each link on separate line, with `>` at its beginning:

```
> [[Walk along the beach]]
> [[Climb the rocky hall]]
```

Forks display light lines between the links and horizontally center the text of the links. See [Fork Style][fork-style] to learn how to change this.


[fork-style]: ../customization/fork-style.md