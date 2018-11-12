# Objects and Lookup Variables

In addition to variables you create, Chapbook also maintains a number of built-in variables called _lookups_. Unlike regular variables, lookups cannot be changed by you. Instead, they correspond to properties in the environment--the current date and time when the player is interacting with your story, for example, or even the story itself.

## Introducing Objects

In order to leave as many variable names available to you as possible, Chapbook groups its built-in lookup variables together using _objects_. An objects are another type of variable--like a string, boolean, or number--that acts as a container for other variables. Unlike simple variable types like strings or numbers, objects don't have values unto themselves. They only contain other variables.

To access a variable inside an object container, enter the object's name, then a period (`.`), then the variable. For instance, `story.name` accesses the variable named `name` inside of `story`.

You can nest objects as much as you'd like, and you can also write something like this in the vars section of a passage:

```
my.favorite.variable: 'red'
```

Chapbook will create each object variable (e.g. `my` and `favorite`) for you if it doesn't already exist.

## Built-In Lookup Variables

Below is a list of lookups that Chapbook maintains for you:

| Variable Name | Description                                                                        | Example            |
| ------------- | ---------------------------------------------------------------------------------- | ------------------ |
| `now.day`     | The current day of the month, 1-31.                                                | 12                 |
| `now.hour`    | The hour of the time right now, where midnight is 0 and 11:00 PM is 23.            | 16                 |
| `now.minute`  | The minute of the time right now, 0-59.                                            | 15                 |
| `now.month`   | The current month, 1-12.                                                           | 3                  |
| `now.second`  | The second of the time right now, 0-59.                                            | 45                 |
| `now.weekday` | The current day of the week, where Sunday is 1, Wednesday is 4, and Saturday is 7. | 2                  |
| `now.year`    | The current four-digit year.                                                       | 2018               |
| `story.name`  | The name of the story as set in the Twine editor.                                  | `'Untitled Story'` |

Note that `now` lookup values reflect when they were last accessed, which is usually when a passage is navigated to.

{% hint style='working' %}
More lookups will be added to Chapbook.
{% endhint %}
