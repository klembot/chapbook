# Dropdown Menus and Cycling Links

Instead of allowing any kind of input at all from a player, you may want to contrain them to a specific set of choices. Chapbook has two mechanisms for this that look different to the player, but behave identically behind the scenes: menus and cycling links.

In order to do this, we need to introduce a new type of variable, an _array_. An array is similar to an object[^1] in that it's a container for other variables. However, where objects contain named variables, arrays are simply an ordered list of values. This array lists the colors of the rainbow:

```
['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
```

Arrays are easy to spot: they simply put square brackets around a list of values separated by commas. An array can contain any type of value: `['red', 3, true]` is a valid array. Arrays can also be empty, though in practice you'll rarely encounter this. The way to express an empty array is by writing `[]`.

## Dropdown Menus

The `{dropdown menu}` insert displays a menu of choices to the player.

```
What meal do you enjoy most?

{dropdown menu for: 'meal', choices: ['Breakfast', 'Lunch', 'Dinner']}
```

As with text inputs, `{dropdown menu}` inserts save the selected value to a variable--in the example above, a variable named `meal`. If `meal` were previously set to a value in the menu, that value will be automatically preselected for the player. Otherwise, the menu shows the first option you list in the array of choices.

Unlike a text input, a dropdown menu does not block navigation to another passage, since it always has some value set.

## Cycling Links

The `{cycling link}` insert works exactly the same way as `{dropdown menu}`, only it shows a text link that the player selects to change. As the name implies, when the player reaches the last value in the `choices` array, the link starts over at the first element in the array.

```
I enjoy {cycling link for: 'meal', choices: ['Breakfast', 'Lunch', 'Dinner']} the most.
```

## Optional Parts

Just like text inputs, dropdown menus and cycling links don't require that their value be saved to a variable. To do this, omit the `for:` part of the insert. For example, `{cycling link, choices: ['Breakfast', 'Lunch', 'Dinner']}`.

[^1]: It is a peculiarity of JavaScript, the programming language of web browsers, that arrays are in fact implemented as objects, so in a sense arrays _are_ objects. However, it's best to think of them at this stage as a distinct concept.