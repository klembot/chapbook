# Live Inputs

Whenever a player interacts with a live input, the state of your story is changed immediately. However, the passage the player is viewing does not update on its own unless you indicate it should. For example:

```
What pronouns do you prefer? {cycling link for: 'pronoun', choices: ['he/him', 'she/her', 'they/them', 'other']}

[if pronoun === 'other']
What should we use? {text input for: 'pronoun'}
```

Assuming `pronoun` isn't set to 'other' before the passage is displayed, the second part, where the player can type in pronouns, will never be visible. In order for this to work, you must specify that the cycling link is _live_.

{% hint style="working" %}
Live inputs haven't been implemented yet in Chapbook, but they will be.
{% endhint %}