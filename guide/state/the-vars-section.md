# The Vars Section

The primary way that Chapbook allows you to work with state is through _vars (short for variables) sections_. These sections always come at the beginning of a passage and are separated from normal text by two dashes (`--`).

To carry forward the example from the previous section, here's how a desperately stereotypical dungeon crawl's first passage might look:

```
strength: 18
dexterity: 7
constitution: 14
intelligence: 9
wisdom: 8
charisma: 11
--
After a lusty evening in the village tavern, you set off down the trail to
the nearest dungeon. It's a bright, sunny day, and you're happy to have a
clear destination in mind.
```

When the player visits this passage, Chapbook will add six variables to the story's state: `strength`, `dexterity`, `constitution`, and so on, and sets them to the numbers listed.

Vars sections never display anything to the player; this is so that, for example, you can set a variable named `doomedToDieInFiveMinutes` and the player will be none the wiser unless you wish it.

{% hint style='danger' %}
Remember that three dashes creates a visible section break in passage text. Use only two to create vars sections.
{% endhint %}

You may only have one vars section in each passage, but then there's really only ever need for one. The name of state variables must follow a few rules, too. They must start with a letter (upper or lowercase), underscore (`_`), or dollar sign (`$`); after the first character can come any combination of the preceding kinds of characters as well as digits.[^1]

Sadly, you can't use spaces in your variable names. Because of this, a common practice called _camel casing_ (because of the camel-like humps in the resulting word) glues phrases together using capital letters, like the `doomedToDieInFiveMinutes` example above. Another school of thought, _snake casing_, prefers to use underscores instead; e.g. `doomed_to_die_in_five_minutes`. Either's perfectly fine. Use whichever feels most comfortable to you.

{% hint style='info' %}
A variable name can contain periods (`.`), but they carry a special meaning. Until you've read TBD, it's best to leave them out of variable names.
{% endhint %}

TODO reserved variable names

The only time variable names are shown to a player is if an error occurs in your story while they are playing it, so choose names that are easy to remember and descriptive. There's no need for a `clueF` variable when you can have `sawFootprintsInVault` instead.

## Variables Have Types

The example at the start of this section assigned numbers to variables, but variables can hold other types of values.

### Strings

_Strings_ are collections of letters, numbers, spaces, and other symbols. Strings are surrounded by either apostrophes (`'`) or quotation marks (`"`) so that's it clear where they begin and end. You can use either punctuation mark to mark off a string's beginning and end, but just like Markdown italics and bold, you have to be consistent with each usage. If you need to use a delimiter character inside a string, type a backslash (`\`) in front of it, e.g. `'Don\'t, just don\'t.'`.

Strings are great for storing names for things. For example, if you want to allow the player to set the name of the main character at the start of a story, a string would be the best type of variable to use. You can also use strings to store fuzzy kinds of values. You could record the state of a relationship between two characters as `'friendly'`, `'neutral'`, `'wary'`, or `'hostile'`.

### Booleans

_Booleans_ simply record a true or false value. Like numbers, you don't need to put anything around a boolean to signal what it is; just type `true` or `false`. Booleans are good for recording whether something has occurred in a story; for example, whether the main character has found a clue.

### Summing Up

There are other, more complex types of values that will be discussed later, but numbers, strings, and booleans will get you quite far. To review, here's an example of a passage whose vars section contains all three types of variables.

```
dollarsInPocket: 12
openedPortalToAlternateDimension: true
name: 'James'
--
You've nearly reached the end of your adventure.
```

## Variables Can Be Calculated

You don't have to set variables to plain values--meaning, a vars section could look like this when the main character finds a dollar lying on the ground:

```
dollarsInPocket: dollarsInPocket + 1
```

These are called _expressions_. You can think of an expression as a formula or calculation. It's anything that can be transformed into a signle value via the _evaluation_ process. For example, you can use the basic mathematical operations--addition, subtraction, multiplication, and division--with numeric variables. You can use addition to connect two strings together--for instance, `fullName: first + ' ' + last`--but you cannot use any other mathematical operators with strings.

You can also compare two numbers or strings, yielding a boolean.

* `===`, "equal to"  
True if both side are the same number.

* `!==`, "not equal to"  
True if both sides aren't the same.

* `>`, "greater than," and `>=`, "greater than or equal to"  
True if the left side is larger than the right side. If you use `>=`, then this is also true when the two sides are equal.

* `<`, "less than," and `<=`, "less than or equal to"  
True if the left side is smaller than the right side. If you use `<=`, then this is also true when the two sides are equal.

Generally speaking, one string is considered larger than another if it would come after it in alphabetical order. For example, `'b' > 'a'`. But these comparisons can be confusing and unintuitive. Is `'+'` greater than `'&'`? It in fact is, but would you know at a glance? It might surprise you to learn than `'A' < 'a'`.[^2] So it is usually best not to use greater-than or less-than operators with strings.

Below is an example vars section that demonstrates how these can be used.

```
correct: guess === 3
nighttime: hour >= 18
--
The quizmaster leans back in his chair and grins.
```

Boolean variables have their own separate set of operators.

* `!`, "not"  
Changes a true value to false and vice versa.

* `&&`, "and"  
True only if both sides are true.

* <code>&#124;&#124;</code>, "or"  
True if one or both sides are true.

## Variables Do Not Change On Their Own

An important thing to remember about setting variables to calculated values is that the calculation only happens once, when you set the variable. Imagine this scenario:

1. In a passage, you set the variable `teethChattering` to `temperature < 0`.
2. In a later passage, the protagonist moves inside and sets `temperature: temperature + 20`.

The variables are now inconsistent: `teethChattering` is true but `temperature` is above 0. The best way to avoid this problem is to avoid making a variable completely derived from another. You don't need a separate variable named `teethChattering` if all it does is reflect whether `temperature` is greater than 0. A better use would be setting `hasACold: temperature < 0 && !wearingJacket`, to reflect that the protagonist caught a cold by being outside without a jacket. They may subsequently go inside or put on a jacket, but obviously neither change will affect the fact that the protagonist `hasACold`.

[^1]: You can use non-Latin characters in variable names, such as `sabiduría` or `мудрость`, but bear in mind that older web browsers that do not fully support the Unicode standard--in practice, old versions of Internet Explorer that have miniscule usage rates nowadays--may be deeply confused by them.
[^2]: The final authority on ordering characters in a string is the Unicode standard. Characters are compared by their Unicode code points; a higher numeric code point means that a character is greater than another.