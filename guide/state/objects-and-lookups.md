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

| Variable Name     | Description                                                                                                                                                           | Example              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `browser.height`  | The height of the browser window in pixels.                                                                                                                           | `768`                |
| `browser.online`  | Whether the browser currently has a network connection.                                                                                                               | `true`               |
| `browser.width`   | The width of the browser window in pixels.                                                                                                                            | `1024`               |
| `engine.version`  | The version of Chapbook currently running, as a string.                                                                                                               | `'1.0.0'`            |
| `now.datestamp`   | A short human-readable description of the date right now.                                                                                                             | `'2/15/2011'`        |
| `now.day`         | The current day of the month, 1-31.                                                                                                                                   | `15`                 |
| `now.hour`        | The hour of the time right now, where midnight is 0 and 11:00 PM is 23.                                                                                               | `18`                 |
| `now.minute`      | The minute of the time right now, 0-59.                                                                                                                               | `15`                 |
| `now.month`       | The current month, 1-12.                                                                                                                                              | `2`                  |
| `now.monthName`   | The name of the current month.                                                                                                                                        | `'February'`         |
| `now.second`      | The second of the time right now, 0-59.                                                                                                                               | `45`                 |
| `now.timestamp`   | A short human-readable description of the time right now.                                                                                                             | `'6:18:15 PM'`       |
| `now.weekday`     | The current day of the week, where Sunday is 1, Wednesday is 4, and Saturday is 7.                                                                                    | `3`                  |
| `now.weekdayName` | The name of the current day of the week.                                                                                                                              | `'Tuesday'`          |
| `now.year`        | The current four-digit year.                                                                                                                                          | `2011`               |
| `passage.name`    | The name of the current passage as set in the Twine editor.                                                                                                           | `'Untitled Passage'` |
| `passage.previous`| The name of the previous passage as set in the Twine editor, if at least two passages have been visited.                                                              | `'Untitled Passage'` |
| `passage.visits`  | The number of times the player has seen the current passage, including the current time. That is, the first time the player sees a passage, this lookup's value is 1. | 1                    |
| `story.name`      | The name of the story as set in the Twine editor.                                                                                                                     | `'Untitled Story'`   |

Note that `now` lookup values reflect when they were last accessed, which is usually when a passage is navigated to. String values like `now.monthName` will vary by the language the player has set as default in their browser-- a French person will see `Août` where an American sees `August`, for example, and similarly the French will see `now.datestamp` as `'15/2/2011'` where Americans see it as `'2/15/2011'`.
