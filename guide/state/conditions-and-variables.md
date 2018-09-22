# Conditions and Variables

You cannot use inserts or modifiers in the vars section of a passage, so you cannot write something like:

```
[if cousins > 10]
largeFamily: true
--
You sit back in your chair and consider everyone you'll need to invite to the reunion.
```

Instead, there are two ways you can assign a variable a value based on a condition. First, you can assign a variable to the result of a comparison, either true or false:

```
largeFamily: cousins > 10
--
You sit back in your chair and consider everyone you'll need to invite to the reunion.
```

This passage sets the variable `largeFamily` to either `true` or `false`, depending on what value the variable `cousins` has. However, you may want to set variables to other types of values besides booleans. You can use a _ternary operator_ to set a variable based on a condition. A ternary operator sounds complex, but its format is simple:

```
transportation: kilometers > 300 ? 'airplane' : 'car' 
--
You'll need to take a {transportation} to get there.
```

The syntax a ternary operator uses is:

<p class="ternary-example">
	<span class="condition">condition</span>
	<span class="punc">?</span>
	<span class="true">value when condition is true</span>
	<span class="punc">:</span>
  <span class="false">value when condition is false</span>
</p>

It is possible, though quickly confusing, to nest ternary operators:

```
transportation: kilometers > 300 ? 'airplane' : kilometers > 5 ? 'car' : 'walk'
--
You'll need to take a {transportation} to get there.
```

{% hint style='working' %}
A more graceful way of setting variables to more than two values conditionally is being considered.
{% endhint %}

[^1]: Truthfully, it is also possible to write `[if stringVariable]` or `[if 2 + 2]`. In these cases, any non-empty string (e.g. not `''`) is treated as true, and any non-zero number is treated as true. It's best to be explicit, however, and write `[if stringVariable !== '']` and `[if 2 + 2 !== 0]`.
[embed-passage]: ../text-and-links/embedding-passages.html

<style>
.ternary-example {
	font-size: 120%;
	text-align: center;
	display: flex;
	justify-content: center;
}

.ternary-example span {
	display: flex;
}

.ternary-example .punc {
	padding: 0 0.2em;
	color: #868e96; /* gray-6 */
	background-color: #f1f3f5; /* gray-1 */
}

.ternary-example .condition {
	padding: 0 0.2em;
	background-color: #d0ebff; /* blue-1 */
}

.ternary-example .true {
	padding: 0 0.2em;
	background-color: #d3f9d8; /* green-1 */
}

.ternary-example .false {
	padding: 0 0.2em;
	background-color: #ffe3e3; /* red-1 */
}
</style>