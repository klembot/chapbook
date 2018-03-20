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

Sadly, you can't use spaces in your variable names. Because of this, common practice called _camel casing_ (because of the camel-like humps in the resulting word) is to glue phrases together using capital letters, like the `doomedToDieInFiveMinutes` example above. Another school of thought prefers to use underscores instead; e.g. `doomed_to_die_in_five_minutes`. Either's perfectly fine. Use whichever feels most comfortable to you.

The only time variable names are shown to a player is if an error occurs in your story while they are playing it, so choose names that are easy to remember and descriptive. There's no need for a `clueF` variable when you can have `sawFootprintsInVault` instead.

## Variables Have Types

The example at the start of this section assigned numbers to variables, but variables can hold other types of values.

_Strings_ are collections of letters, numbers, or other symbols. Strings are surrounded by either apostrophes (`'`) or quotation marks (`"`). You can use either one to mark off a string's beginning and end, but just like Markdown italics and bold, you have to be consistent with each usage. If you need to use a delimiter character inside a string, type a backslash (`\\`) in front of it.

Strings are great for storing names for things. For example, if you want to allow the player to set the name of the main character at the start of a story, a string would be the best type of variable to use. You can also use strings to store fuzzy kinds of values. You could record the state of a relationship between two characters as `'friendly'`, `'neutral'`, `'wary'`, or `'hostile'`.

_Booleans_ simply record a true or false value. Like numbers, you don't need to put anything around a boolean to signal what it is; just type `true` or `false`. Booleans are good for recording whether something has occurred in a story; for example, whether the main character has found a clue.

There are other, more complex types of values that will be discussed later. To sum up, here is a sample vars section that shows all the basic types in action:

```
dollarsInPocket: 12
openedPortalToAlternateDimension: true
name: 'James'
--
You've nearly reached the end of your adventure.
```

[^1]: You can use non-Latin characters in variable names, such as `sabiduría` or `мудрость`, but bear in mind that older web browsers that do not fully support the Unicode standard--in practice, old versions of Internet Explorer that have miniscule usage rates nowadays--may be deeply confused by them.
