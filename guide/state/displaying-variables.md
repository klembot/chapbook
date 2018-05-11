# Displaying Variables

Of course, setting variables isn't very useful by itself. They need to affect the course of a story somehow. The simplest way they can do this is simply being shown to the player. You do this by enclosing the variable name in backticks (<code>`</code>).[^1]

The passage source below:

```
name: 'Chris'
--
"Hi, `name`," your guide greets you.
```

Will display as: `"Hi, Chris," your guide greets you.` This example is a little silly, since you could just as easily write `Chris` where <code>`name`</code> is. But the advantage of storing it in a variable is that you could keep using <code>`name`</code> later in your story. You could also use this, for example, to allow the player to choose a gender (or lack thereof) and then use the correct pronouns throughout the story.

{% hint style='info' %}
In this respect, Chapbook syntax diverges from standard Markdown, which uses backticks to display text in a monospaced font. If you'd like to do this with Chapbook, instead enclose the text in `<code>` and `</code>`, i.e. `<code>10 GOTO 30</code>`.
{% endhint %}

## Backticks Are Versatile

You can do quite a bit more with backticks. For example:

```
groceryCost: 54
tax: groceryCost * 0.05
--
You do some some quick mental math: it'll run $`groceryCost + tax`.
```

This displays as: `You do some quick mental math: it'll run $56.7.` 

TODO aside on formatting money

This is because backticks actually display expressions, so anything you would assign to a variable, you can instead display directly. You don't need to involve variables at all, in fact:

```
You recall that 2 + 2 = `2 + 2`. 
```

This variable-less usage may seem odd, but its uses will become evident in later sections.

[^1]: On United States keyboards, the backtick key is left of the number 1. On other countries' keyboards, it is often adjacent to one of the Shift keys.