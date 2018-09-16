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

| Variable Name | Description                                      | Example            |
| ------------- | ------------------------------------------------ | ------------------ |
| `story.name`  | The name of the story as set in the Twine editor | `'Untitled Story'` |
