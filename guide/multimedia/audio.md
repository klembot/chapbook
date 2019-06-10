# Audio

Chapbook supports two types of audio: _ambient sound_ and _sound effects_. Ambient sounds are long-running audio, such as music or background noise, that automatically loop when playback completes. Sound effects are one-off sounds, like the sound of a door opening or an explosion.

There are two other differences between sound effects and ambient audio:

- There can only be one ambient sound playing at a time under normal circumstances.
- Sound effects are preloaded when your story begins. This is so that when you ask for an effect to be played in your story, there will be as little delay as possible before it begins playback. However, this means that you should be careful about the file size of the sound effects you use. The preloading process takes place in the background as players interact with your story, so large sound effects will not delay the start of your story. But it's still wasteful to load large files.

You should also make sure that all your sounds are in MP3 format. There are other types of audio formats, such as Ogg Theora or WAV, but browser support varies for each of these. MP3 is as universal a format as possible. There are many applications, including the open-source [Audacity], that can convert audio files into MP3 format for you.

## Sound Effects

Before playing a sound effect, you must first define it in your story state. Below is an example of how you would define a sound effect:

```
sound.effect.explosion.url: 'boom.mp3'
sound.effect.explosion.description: 'a large explosion'
--
The timer reads 0:00...
```

The `explosion` keyword defines the name of the ambient sound, which you'll use later. The `url` property defines the address to load the sound from, and the `description` provides a textual description of the contents of the sound. This is so that players who have difficulty hearing, or who have muted your story, can receive an alternate version of the sound.

Once you've defined your sound effect, you can play it in a passage using the `{sound effect}` insert.

```
sound.effect.explosion.url: 'boom.mp3'
sound.effect.explosion.description: 'a large explosion'
--
The timer reads 0:00...

{sound effect: 'explosion'}
```

The exact place you put the insert matters. If a player has disabled sound, or is unable to hear your sound, they will see the text of the `description` property instead where you enter the insert.

If you insert multiple different sound effects in a single passage, they will play simultaneously. If you insert a sound effect in another passage the player reaches while the effect is stil playing, the second insert will have no effect.

If you need to play a sound effect repeatedly, define it multiple times. You can assign the entire object to save time. For example:

```
sound.effect.explosion.url: 'boom.mp3'
sound.effect.explosion.description: 'a large explosion'
sound.effect.explosion2: sound.effect.explosion
--
The timer reads 0:00...

{sound effect: 'explosion'}

[[Oof.]]
```

(Note the lack of quotation marks around `sound.effect.explosion` in the line that sets `sound.effect.explosion2`.)

Assigning the `sound.effect.explosion2` [object] wholesale, instead of setting it property-by-property, causes it to be a copy of `sound.effect.explosion`. If you ever change a property of `sound.effect.explosion`, `sound.effect.explosion2` will change too.

And then, in the passage named `Oof.`, you'd write:

```
That wasn't so bad. Wait...

{sound effect: 'explosion2'}
```

## Ambient Sound

The process of defining an ambient sound is very similar to defining a sound effect.

```
sound.ambient.forest.url: 'forest.mp3'
sound.ambient.forest.description: 'midday forest sounds'
--
It's a beautiful day.
```

Similarly, you begin playing an ambient sound with an insert:

```
sound.ambient.forest.url: 'forest.mp3'
sound.ambient.forest.description: 'midday forest sounds'
--
{ambient sound: 'forest'}

It's a beautiful day.

```

The only difference here is that the sound will fade in, and if there was already an ambient sound playing, the two will crossfade. The exact length of the fade is determined by the state variable `sound.transitionDuration`. It is a string in the same format that the [after modifier] accepts.

## Controlling Sound Volume

To set the master sound volume for your story, change the state variable `sound.volume` to a decimal between 0 and 1. 0 is muted, and 1 is full volume. You can also temporarily mute all sound by setting `sound.mute` (note the lack of a D at the end) to `true`. The advantage of using `sound.mute` is that it allows you to toggle between no sound and a previously-set volume.

You can also set a sound's volume when playing it using an insert. Both of the inserts below begin playing a sound at half normal volume.

```
{sound effect: 'explosion', volume: 0.5}
{ambient sound: 'forest', volume: 0.5}
```

## Browser Autoplay Problems

Chapbook makes every effort to resume sound playback between play sessions, so that if you begin playing an ambient sound, it resumes whenever the player comes back to your story. However, this runs afoul of strict restrictions most browsers have regarding sound that immediately plays when a web page is loaded. Some browsers have a blanket ban on this, while others take into account a player's behavior on the web site hosting your story--if a player has previously interacted a lot with the site, it may allow it, but the exact criteria for allowing it is often unclear.

Playing sound after a player has followed a link or otherwise clicked or tapped a link in your story should always work, whatever a browser's autoplay policy is.

## Manually Controlling Sound

You may also manually play sounds, either sound effects or ambient sound, by setting their `playing` property to `true`. This property automatically becomes `false` once an effect finishes playing, but will never change for ambient sound unless you use an `{ambient sound}` insert or set its `playing` property to `false` again.

You can use this for more complex effects, such as layering ambient sounds; however, you *must* make sure to include appropriate descriptions for people who are unable to hear your audio. To do this, enclose the description inside `<audio>` and `</audio>` like so:

```
sound.ambient.forest.playing: true
sound.ambient.rain.playing: true
--
You walk outside.

<audio>Rainy forest background sound</audio>
```

The text inside the will not be displayed ordinarily.

[Audacity]: https://www.audacityteam.org/
[object]: ../state/objects-and-lookups.md
[after modifier]: ../modifiers-and-inserts/delayed-text.md