# Embedding Passages

A common need in branching narrative is for divergent paths to merge together. The easiest way to make this happen is for the two passages to link to the same one, but you can also create a less obvious stitch in your story by embedding one passage inside another.

For example, imagine that the main character takes either a plane or train on the way to a passage named "L.A.":

```
You spend a few hours watching the clouds drift below the wings of the plane before arriving in [[L.A.]]
```

```
The cross-country train ride leaves plenty of space for contemplation on the way to [[L.A.]]
```

You could instead merge the passages directly, using the `{embed passage}` insert:

```
You spend a few hours watching the clouds drift below the wings of the plane.

{embed passage: 'L.A.'}
```

```
The cross-country train ride leaves plenty of space for contemplation.

{embed passage: 'L.A.'}
```

The two passages will show the contents of the "L.A." passage below their text. Apart from the passage name, the `embed passage` insert does not accept any other parameters.

Remember that like any insert, `{embed passage}` can be placed at any point in the text of a passage. It can be sandwiched between text in a passage, or even repeatedly used.