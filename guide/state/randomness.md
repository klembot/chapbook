# Randomness

Randomness is a powerful tool for creating interactive experiences. It can assist with simulation--to decide whether actions of a character succeed, as in tabletop role-playing games--but it can also be used for aesthetic purposes, from altering phrasings in text to creating an entirely randomized narrative.

The main way to make use of randomness with Chapbook is through [lookup variables][lookup variables] in the `random` object. For instance:

```
[if random.coinFlip]
Heads!

[else]
Tails!
```

... will display "Heads!" half of the time the story is played and "Tails!" the other half. The value of `random.coinFlip` potentially changes every time its value is used.[^1]

For more fine-grained randomness, you can use lookup variables such as `random.d100`, which is a random whole number between 1 to 100. The full list is:

Lookup            | Range 
------------------|------
`random.fraction` | 0-1
`random.d4`       | 1-4
`random.d5`       | 1-5
`random.d6`       | 1-6
`random.d8`       | 1-8
`random.d10`      | 1-10
`random.d12`      | 1-12
`random.d20`      | 1-20
`random.d25`      | 1-25
`random.d50`      | 1-50
`random.d100`     | 1-100

All of the lookups listed above are always whole numbers, except `random.fraction`, which is a decimal between 0 and 1.

One easy mistake that can be made with these lookup variables is to forget that their values change every time they are used. For instance:

```
[if random.d4 === 1]
One.

[if random.d4 === 2]
Two.

[if random.d4 === 3]
Three.

[if random.d4 === 4]
Four.
```

The passage above may show just one paragraph, but it's also possible for it to show more than one, or even none at all. Because `random.d4` changes value, the end result could look like this:

```
[if 4 === 1]
One.

[if 2 === 2]
Two.

[if 1 === 3]
Three.

[if 4 === 4]
Four.
```

... which would display:

```
Two.

Four.
```

If you'd like to re-use a specific random value, the easiest thing to do is to assign it to a variable like so:[^2]

```
_chosen: random.d4
--
[if _chosen === 1]
One.

[if _chosen === 2]
Two.

[if _chosen === 3]
Three.

[if _chosen === 4]
Four.

```

## Chapbook Is Pseudorandom

Chapbook's randomness is not truly random: in fact, the process by which it generates random numbers is entirely predictable. This may sound ludicrous, but this is how almost all computer-generated random numbers work. Chapbook uses what is called a pseudorandom number generator, which generates a stream of apparently random numbers based on a seed value.

The pseudorandom number generator will always generate the same values when using a particular seed value. Unless otherwise specified, Chapbook will use a seed value based on the date and time that a playthrough first begins, so each session will see different pseudorandom values. Chapbook stores this seed value in `config.random.seed`. This variable can be both read and written to.

Why would you want to change the pseudorandom seed, though? It can help with testing--for example, if someone reports a problem with your story, you can set your seed value to theirs and be able to replay things exactly as they experienced them. You can also set a seed value manually in a version of your story you give to others to test, so that you can ensure everyone has a consistent experience.

[^1]: Which is to say it is possible, as demonstrated in _[Rosencrantz and Guildenstern Are Dead][rosencrantz]_, that `random.coinFlip` holds the same value after it is read. 
[^2]: This example uses an underscore in its variable name to signal a temporary variable, but remember that this is merely a convention.

[lookups]: objects-and-lookups.html
[rosencrantz]: https://en.wikipedia.org/wiki/Rosencrantz_and_Guildenstern_Are_Dead#Act_One