# Continuity Between Sessions

Chapbook is designed so that players don't need to manually save their progress, as is often typical in digital games. Instead, it silently saves the state of play every time the player navigates to a new passage.

This is partly by necessity and partly by design. It's necessary to continually save progress because browsers, especially those on mobile devices, are extremely stingy with resources. If a player begins your story but decides to check social media in another browser tab and then gets lost in a series of adorable cat pictures, the browser may decide to put your story's tab into the equivalent of hibernation. When the player returns to your story, the browser essentially reloads the story[^1], which causes any unsaved progress to be lost. Thus, progress needs to be continually saved.

It also discourages a habit in players that is nicknamed _[save scumming]_, where players constantly save and reload their progress in an effort to find what they believe is the most optimal outcome. 

Chapbook saves state by using a feature of web browsers called _local storage_. If you are familiar with browser cookies, local storage works similarly to them, though local storage allows for storing much more data than a cookie. You don't need to know what either technology is to use Chapbook successfully, but it is important to understand two things:

1. A player's state is saved only to their device, and to the browser they are using. If a player starts out using Microsoft Edge but changes halfway to Mozilla Firefox, they'll start from the very beginning of your story in Firefox. Their progress in Edge isn't lost, of course. Likewise if they begin on their phone and switch to a laptop halfway through, they will start from the beginning.

2. If a player clears their browsing history, they'll lose their progress in your story.

Because state is retained across sessions, you _must_ use the [`{restart link}` insert][restart-insert] in order to start the story fresh once you begin using state in your stories. If you only link back to the first passage, variables will remain in the state they were at the end of play--which is likely to produce weird results.

{% hint style='working' %}
Additional functionality related to saving progress, such as being able to share saved states between browsers or devices, or allowing players on a device the ability to have more than one save, may come in a future version of Chapbook.
{% endhint %}

[^1]: In fact, you'll often see a loading indicator briefly when this occurs, instead of the page reappearing instantly.
[save scumming]: http://tvtropes.org/pmwiki/pmwiki.php/Main/SaveScumming
[restart-insert]: ../text-and-links/link-inserts.html#restarting-the-story