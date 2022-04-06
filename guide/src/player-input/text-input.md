# Text Input

Sometimes selecting a link isn't expressive enough to capture player intent. One common scenario is allowing the player to name a character--often, the protagonist. To do this, use the `{text input}` insert.

```
What would you like to name your loyal canine companion?

{text input for: 'dogName'}

[[Continue]]
```

This displays a text field after the first paragraph that, once the player moves to another passage, saves its contents to the variable named `dogName`. Take careful note of the quotation marks around `'dogName'` in the insert. These are needed so that the variable name is passed as-is to the insert, instead of being evaluated. Consider this contrived passage:

```
petType: 'cat'
--
What would you like to name your loyal {petType} companion?

{text input for: petType}

[[Continue]]
```

This would save what the player entered to a variable named `cat`, not `petType`, because the variable `petType` is evaluated by the insert.

If the variable that the text input is saving to already has a value, the text input will start with that value already filled in. For example:

```
dogName: 'Lassie'
--
What would you like to name your loyal canine companion?

{text input for: 'dogName'}

[[Continue]]
```

Will suggest a default name of 'Lassie' for the player's dog.

Unless you specify otherwise, players must enter some text into a text input before moving onto another passage. If navigation is blocked, the player's web browser will show a message highlighting the text input that's empty. The exact appearance of this message varies from browser to browser, and can't be customized.

## Optional Parts

To allow the player to skip entering anything into a text input, set the insert's `required` property to `false`.

```
What's your darkest secret? You don't have to tell me now if you don't want to.

{text input for: 'secret', required: false}
```

Note that as above, the variable name should be quoted, but `false` should not.

{% hint style='info' %}
The restriction on navigation only applies to player-initiated navigation. A required text input will not block navigation initiated by the story itself, or the player choosing to restart the story.
{% endhint %}

You also do not have to save a text input's value to a variable, if for some reason you won't need the value later. To do this, write `{text input}` or `{text input, required: true}`. 