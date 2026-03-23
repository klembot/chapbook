# Using CSS in Passages

Most of the time, the best way to customize the appearance of your story is to use [Chapbook's built-in functionality][customization] or the _Edit Stylesheet_ menu item in Twine. However, it is also possible to create passage-specific CSS using the `[CSS]` modifier.

```
[CSS]
.page article {
	color: green;
}

[continued]
This text will be in green.
```

The CSS in this modifier will be applied globally--hence why the `.page article` selector is needed.

[customization]: ../customization