# What is State?

You can create a compelling story with just the techniques outlined in the previous section. The [_Choose Your Own Adventure_ book series][cyoa] that has been part of Western pop culture since it exploded in popularity in the 1980s did just that. Turning to a particular page in the book is the equivalent of following a link in a digital medium, of course.

But in the wake of _CYOA_'s popularity came another wave of interactive books written by people familiar with tabletop role-playing games like _Dungeons & Dragons_.[^1] They thought the format could be adapted to provide similar experiences to a live RPG session, but without the trouble of having to round up three or four other people to play with. They began to incorporate the trappings of RPGs--in particular, the character sheet.

If you've never seen a character sheet, they resemble a spreadsheet, but instead of a household budget or a corporate profit and loss statement, they describe a character numerically. A very smart D&D character has an intelligence of 17, but an average strength of 7. A character might start with 20 hit points, but after taking a nasty fall into a mountain crevasse only have 8 left.

With character sheets came the concept of _state_: that is, two readers could reach the same page of a gamebook, but one could be doing very well for themselves, but the other on death's door. The essential quality of state is that it varies between sessions; hence, it contains _variables_. Variables may be independent (strength and intelligence) or dependent (a weakened character, for example, may be able to carry less weight than usual).

The other popular use of state has been to record whether an event has happened and enable or disable links based on that. The [_Sherlock Holmes Solo Mysteries_][sherlock] series, for example, asks the reader to check Clue A or Clue Q on their character sheet after making a discovery, and then later only allow the protagonist to solve the mystery if they had uncovered all the necessary clues along the way.

Later, the Storyspace hypertext system would incorporate the concept of state with its guard fields. Similar to checking off clues, stories created with Storyspace can choose to show certain links only to players who satisfy the conditions of their guard fields.

The Choice of Games series uses a system well-suited to long narratives that its designers named fairmath. Fairmath averages variable changes so that each time a variable increases or decreases, it does so at a diminishing rate. The effect is similar to the experience-point system of _D&D_	, where it takes increasingly longer for a skill to improve as a character becomes better at it--although fairmath allows a variable to both increase and decrease, _D&D_ players almost always simply accumulate experience points.

Although state in hypertext may have its roots in the number crunching of RPGs, there's no reason it needs to be so clinical or reductionist.[^2] Tom McHenry's [_Horse Master_][horse-master] shows a player numerous variables about their horse, including Uncanny and Realness, but it never explains their purpose directly. Porpentine's [_Begscape_][begscape] uses precious few variables--most apparent to the player are coins and health--but uses them cruelly.

## Is State Separate From The Player's Path?

From a certain point of view, though, isn't state simply a side effect of the choices the player makes? That is--do we really need to record anything but what links the player followed? If the outcome of a story hinges on whether the player found Clue M, then surely all we really need to track is what passages they visited. There's no need for this extra bookkeeping.

There are two reasons to record state separately: first, for convenience's sake. It's tedious to type out the code equivalent of "if the player has visited this passage but not this other one" or "if the player has visited any one of these four passages" repeatedly. Secondly, a story might incorporate elements of randomness, such that multiple playthroughs following the same links may yield different results.[^3]

[^1]: [_You Are The Hero_][yath], a retrospective of the _Fighting Fantasy_ book series, offers an intriguing peek into the history of one of these RPG-influenced gamebook series. And if you've never tried the genre, [Project Aon][aon] hosts nearly all of the works of Joe Dever, who was perhaps the most prolific RPG gamebook author, in a format that can be played in a web browser for free.

[^2]: To pick apart just one thing in the _D&D_ paradigm: there are many different types of intelligence, and the concept of assigning numeric scores to intelligence in people has a [dark history](https://www.theatlantic.com/national/archive/2013/05/why-people-keep-misunderstanding-the-connection-between-race-and-iq/275876/).

[^3]: For more on incorporating randomness into your story, see [Randomness](randomness.md).

[cyoa]: https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure
[sherlock]: https://gamebooks.org/Series/389
[horse-master]: https://tommchenry.itch.io/horse-master
[begscape]: http://slimedaughter.com/games/twine/begscape/
[yath]: https://www.librarything.com/work/15900828
[aon]: https://www.projectaon.org/
