# State Backstage

State can be very slippery to work with, as it's not normally directly visible in your story--you can only infer from its side effects. Chapbook provides tools to track and even change state as you test your story.

## The State Tab

Under the State tab, you'll find a Variables heading. This shows the current state of your story as you play. You can also select a value on the right side of the variables table and enter a new one--press the Return or Enter key when you're done to set the variable. You may only enter values in the variables table, not expressions.

If the Show Defaults checkbox is ticked, Chapbook will show various built-in variables--mainly related to Chapbook's configuration. See [Customization][customization] for more details.

## State Snaphots

Beneath the variables table is the Snapshots heading. Snapshots allow you to quickly save and restore the state of your story at any point. For example, if you'd like to skip the prologue or test a specific scene, play through your story as usual. When you've reached the point you'd like to skip to, use the Add Snapshot button. After giving your snapshot a name, it will appear under the Snapshots heading as a button. Using this button will immediately set the state of your story, including the passage you were viewing, to what it was.

Use the &times; button at the end of a snapshot button to remove it. Snapshots are saved to your web browser only.

{% hint style='working' %}
Exporting snapshots for use by other people working on your story may be possible in the future.
{% endhint %}

## State in History

The History tab also shows changes to state as you navigate through a story. If a passage changes a variable, you'll see a separate row in the history table showing that change. This is informational only--you cannot change variables from the History tab.

[customization]: ../customization/index.md