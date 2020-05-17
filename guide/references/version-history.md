# Version History

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
