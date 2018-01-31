# The Vars Section
The primary way that Chapbook allows you to work with state is through _vars (short for variables) sections_. These sections always come at the beginning of the passage and are separated from normal text by two dashes (`--`).

To carry forward the example from the previous section, here's how a desperately stereotypical dungeon crawl story might begin:

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

When the player visits this passage, Chapbook will add six variables to the story's state: `strength`, `dexterity`, `constitution`, and so on, and sets them to the numbers listed. Vars sections never display anything to the player; this is so that, for example, you can set a variable named `doomedToDieInFiveMinutes` and the player will be none the wiser unless you wish it.

{% hint style='danger' %}
Remember that three dashes creates a visible section break in passage text. Use only two to create vars sections.
{% endhint %}

You may only have one vars section in each passage, but then there's really only ever need for one. The name of state variables must follow a few rules, too. They must start with a letter (upper or lowercase), underscore (`_`), or dollar sign (`$`); after the first character can come any combination of the preceding kinds of characters as well as digits.[^1]

Sadly, you can't use spaces in your variable names. Because of this, common practice called _camel casing_ (because of the camel-like humps in the resulting word) is to glue phrases together using capital letters, like the `doomedToDieInFiveMinutes` example above. Another school of thought prefers to use underscores instead; e.g. `doomed_to_die_in_five_minutes`. Either's perfectly fine. Use whichever feels most comfortable to you.

The only time variable names are shown to a player is if an error occurs in your story while they are playing it, so choose names that are easy to remember and descriptive. There's no need for a `clueF` variable when you can have `sawFootprintsInVault` instead.

## Variables Have Types
The example above assigned numbers to 

[^1]: You can use non-Latin characters in variable names, such as `sabiduría` or `мудрость`, but bear in mind that older web browsers that do not fully support the Unicode standard--in practice, old versions of Internet Explorer that have miniscule usage rates nowadays--may be deeply confused by them. 