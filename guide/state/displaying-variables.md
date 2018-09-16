# Displaying Variables

Of course, setting variables isn't very useful by itself. They need to affect the course of a story somehow. The simplest way they can do this is simply being inserted into the story. You can display the contents of a variable using an insert.

The passage source below:

```
name: 'Chris'
--
"Hi, {name}," your guide greets you.
```

Will display as: `"Hi, Chris," your guide greets you.` This example is a little silly, since you could just as easily write `Chris` where <code>`name`</code> is. But the advantage of storing it in a variable is that you could keep using <code>`name`</code> later in your story. You could also use this, for example, to allow the player to choose a gender (or lack thereof) and then use the correct pronouns throughout the story.

Variable inserts do not allow any parameters, as introduced in [Link Inserts](link-inserts); the name of the variable acts as the insert name.[^1]

## You Cannot Put Expressions In An Insert

The following will not display as you might expect:

```
cash: 3
--
"Sorry, but I decided that I want {cash + 2} dollars for it," the salesman replies.
```

Expressions like this are not allowed in variable inserts-- you may only enter the name of a variable. It's simple enough to accomplish this with a temporary variable:

```
cash: 3
_unreasonablePrice: cash + 3
--
"Sorry, but I decided that I want {_unreasonablePrice} for it," the salesman replies.
```

[^1]: You can always distinguish a variable insert from another type of insert by looking for spaces inside it. `{back link}` could never be a variable insert because `back link` contains spaces, and thus could never be the name of a variable.

[link-inserts]: ../text-and-links/link-inserts.html