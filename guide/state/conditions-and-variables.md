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

This passage sets the variable `largeFamily` to either `true` or `false`, depending on what value the variable `cousins` has. However, you may want to set variables to other types of values besides booleans. To do this, add a condition to the assignment:

```
transportation: 'car'
transportation (kilometers > 1000): 'plane' 
--
You'll need to take a {transportation} to get there.
```

This example demonstrates two new things about vars sections:

- You may change a variable more than once in a single vars section. Chapbook changes the variables in the order they are written, top to bottom.
- If you write an expression inside parentheses before the colon (`:`) that tells Chapbook what value to set, that particular line will only take effect if the expression evaluates to `true`.

So first `transportation` is set to `'car'`, and then, if `kilometers` is greater than `1000`, the value of `transportation` is immediately changed to `'plane'`. Chapbook runs through each variable assignment in sequence, doing nothing else in between, so the two assignments effectively work as one.

Here's a more complex example showing how multiple assignments and conditions go hand in hand.

```
language: 'an unknown language'
language (country === 'Brazil'): 'Portuguese' 
language (country === 'China'): 'Mandarin' 
language (country === 'Ethiopia'): 'Amharic'
language (country === 'Russia'): 'Russian'
language (country === 'Australia' || country === 'United States'): 'English'
--
The official language of {country} is {language}.
```

Although Chapbook sets variables in the order you write them, often times it won't matter much, as you'll usually want to write conditions that are mutually exclusive of each other--that is, only one line ever takes effect.

[^1]: Truthfully, it is also possible to write `[if stringVariable]` or `[if 2 + 2]`. In these cases, any non-empty string (e.g. not `''`) is treated as true, and any non-zero number is treated as true. It's best to be explicit, however, and write `[if stringVariable !== '']` and `[if 2 + 2 !== 0]`.
[embed-passage]: ../text-and-links/embedding-passages.html