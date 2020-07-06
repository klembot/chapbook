# Version History

## 1.2.0, 6 July 2020

**This introduces a change in how story progress is saved in players' browsers.
If you re-publish a story with this version of Chapbook that had been published
with an earlier one, players will lose their progress.**

- Adds a `passages()` function to `engine.story`, currently undocumented, for
  use by author scripts. This provides access to all passages in the story.
- Player progress is now saved using a combination of the story name and its
  IFID. This is prevent collisions, e.g. if authors ever named two different
  stories `Test`, saved progress would collide.
- Now, when a player navigates to a new passage, the browser will always return
  to the top. In the past, the scroll position on a sufficiently long passage
  would remain the same.
- Fixes a bug where changing style (via certain variables like
  `config.style.page.font`) would cause an error message when restarting a
  story.
- Fixes a bug where the copy-and-paste section of the Style tab of Backstage did
  not update when changes were made.
- Corrects documentation about styling the header and footer (thanks,
  [Gospodin](https://github.com/klembot/chapbook/pull/77)).

## 1.1.1, 17 May 2020

- Fixes a bug introduced in 1.1.0 where nested lookup variables (like
  `random.coinFlip`) did not work--which is to say, all of them.

## 1.1.0, 10 May 2020

- Adds a new insert, `{no ambient sound}`, which stops any existing ambient sound.
- Adds a link to this documentation in the story format's description in Twine.
- Updates browser support to [browserslist](https://github.com/browserslist/browserslist)'s default preset.
- Fixes a bug with using decimals in font sizes, e.g. `1.25rem`.
- Fixes a bug where clicking a cycling link too fast could cause the web browser tab
  to lock up.
- Fixes a bug with the `{reveal link}` insert where paragraph ordering was incorrect.
- Fixes a bug where setting `config.body.transition.name` to `none` caused paragraphs in passages to stack horizontally instead of vertically.
- Fixes several bugs with using objects as variables.
- Fixes some inaccurate parts of this guide.

## 1.0.0, 18 August 2019

Initial public release.

## 0.0.2, 19 October 2018

- Fixes a bug where hard restarts in stories deleted the entire local storage
  object, which could trash, among other things, the Twine story library if
  you're using the web version (yikes). Thanks to Brendan Hennessy for
  identifying this early.

## 0.0.1, 14 October 2018

Initial public prerelease.
