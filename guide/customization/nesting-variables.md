# Nesting Variables

Variables can be connected together by placing them inside a container variable. This container is called an _object_. Unlike simple variable types like strings or numbers, objects don't have values unto itself. It only contains other variables. Chapbook stores its built-in functionality in objects so that it leaves as many variable names available to you as is possible, a practice sometimes called _namespacing_. For instance, all of Chapbook's configuration settings are in an object called `config`.

To access a variable inside a container, enter the container's name, then a period (`.`), then the variable. For instance, `config.style` accesses the variable named `style` inside of `config`.

`config.style` is in fact an object unto itself, containing all of the settings related to your story's appearance. You can nest objects as much as you'd like, and you can also write something like this in the vars section of a passage:

```
my.favorite.variable: 'red'
```

Chapbook will create each container variable for you if it doesn't already exist.

There are other uses for objects that are covered in *TBD*, but for now, this is all you need to know in order to customize Chapbook.