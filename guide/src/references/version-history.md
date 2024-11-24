# Version History

## 2.3.0, 24 November 24

`https://klembot.github.io.chapbook/use/2.3.0/format.js`

- Passage transitions now use the View Transition API where available. This will
  result in smoother transitions, with less possibility for content to jump
  around. If the browser doesn't support this API (as of this writing, Chrome
  and Safari do but Firefox does not yet), Chapbook automatically uses the
  `none` transition, e.g. changing content instantaneously. 
- It's now no longer possible to configure header and footer transitions
  separately from the main body content. These configuration variables are no
  longer used.
- The spacing between paragraphs and other content has been corrected. (Earlier
  2.x versions used too much space.)
- When restoring state at the start of a session, style changes in
  `config.style` are handled properly.
- Passage links are now properly keyboard-focusable.
- Borders on header and footer content are now styled properly.
- Using `{` inside of a quoted part of an insert, like `{restart link, label:
  '{Start over'}`, is handled correctly.
- The "Reveal Link" toolbar button in Twine now inserts the correct code.
- Passages referenced via the `{link to}` insert now show as references in Twine.

_Changes people extending Chapbook should be aware of_

- The `body-content` and `marginal-content` custom elements that previous 2.x
  versions are no longer present, and the HTML structure of the page has changed
  to more closely resemble what it looked like in version 1.
- There's now a `<page-transition>` element enclosing the page that allows for
  changing content with the the configured transition. To do this, use JavaScript like this:

```
document.querySelector('page-transition').startTransition(() => {
    // Code that changes content here
  }, {preserveWindowScroll: true});
```

## 2.2.0, 28 July 2024

`https://klembot.github.io/chapbook/use/2.2.0/format.js`

- Navigating to a new passage resets the window scroll position to the top, as
  it had under Chapbook 1.
- Added a new lookup `passage.fromText`, which records the text of the last link
  used to navigate to another passage. Like `passage.from`, this can be used for
  setter-style links.

## 2.1.0, 16 June 2024

`https://klembot.github.io/chapbook/use/2.1.0/format.js`

- Chapbook now uses [Reasonable Colors](https://www.reasonable.work/colors/) as
  its built-in palette. More hues are available, but there are fewer shades than
  with the previous palette. This palette is designed to make choosing
  accessible color schemes (i.e. with sufficient color contrast) easy. The
  previous palette can still be used by adding `oc-` in front of a color name,
  like `oc-red-5`. But this palette will be removed entirely in a future
  release.
- Chapbook now supports switching between a light and dark theme. These themes
  can be customized, and theme switching can be disabled.
- Chapbook also supports fluid font sizing, where font size is proportional to
  the the browser width. This feature can be customized or disabled.
- The header and footer borders can now be customized using state variables
  instead of CSS.
- A new lookup, `passage.from`, records the name of the passage that the player
  last visited before the current passage. It can be used to implement basic
  setter links as popularized in other story formats, though it doesn't handle
  all ways that setter links work there.
- A bug where `[JavaScript]` and `[CSS]` modifiers weren't processing their code
  properly has been fixed.
- A bug where story JavaScript and style wasn't loaded has been fixed.
- A bug where multiple consecutive italicized paragraphs weren't displayed
  properly has been fixed.

## 2.0.0, 12 March 2024

`https://klembot.github.io/chapbook/use/2.0.0/format.js`

This version contains breaking changes from the 1.x series, but the majority of
authors won't need to make any changes to their stories to start using this
version. The 2.0 version is mostly a behind-the-scenes update.

_Changes authors should be aware of_

- Chapbook 2 now relies heavily on CSS variables and custom elements in the
  browser. Both these features have been available in mainstream web browsers
  since 2018 (six years ago at time of writing), but this means that old
  browsers will not play Chapbook 2.0 stories.
- The micro version of Chapbook, which removed backstage code, is no longer
  available. This is because thanks to refactoring the code, the full version of
  Chapbook 2.0 is now smaller than the micro version of 1.x was, and also
  because very few people used the micro version.
- The way to add custom inserts and modifiers has changed. Instead of modifying
  state variables, call
  [`engine.template.inserts.add()`](../advanced/adding-custom-inserts.html) or
  [`engine.template.modifiers.add()`](../advanced/adding-custom-modifiers.html).
  This change was made so that all of Chapbook's state can be serialized to
  JSON. In the 1.x versions, non-serializable things like functions were allowed
  to be added to state, but they wouldn't be saved permanently. This led to
  unpredictable behavior.
- Setting fonts to use `small caps` now uses native CSS (specifically, the
  [`font-variant-caps`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps)
  property) instead of trying to imitate small caps styling.
- In the unlikely event that the `trail` variable has become malformed, the
  lookup `passage.visits` will have the value `0` instead of `undefined`.

_Changes people extending Chapbook should be aware of_

- The DOM structure of the page has changed considerably. Chapbook now uses
  custom elements instead of `data-cb-` attributes for behavior. \
  
  One popular `data-cb-` attribute that extensions used was `data-cb-go`, which
caused navigation to a passage when an element was clicked. Here is JavaScript
code that can be added to a story that will carry over this behavior if an extension
you use depends on it:

```
window.addEventListener('click', ({target}) => {  
  const goable = target.closest('[data-cb-go]');
  
  if (goable) {
    window.go(goable.dataset.cbGo);
  }
});
```

- Instead of managing its own event bus, Chapbook now dispatches custom events
  on `window`. The names of these events have changed. See [the API
  documentation](../../api/) for more details.

- The `engine.render()` function has been moved to `engine.template.render()`.

- Chapbook's backstage components now use the prefix `chapbookbackstage-` for
  storing notes and state snapshots in browser local storage instead of `cb-`.
  This better parallels the local storage keys used by the rest of Chapbook
  code, which uses `chapbook-`.


## 1.2.3, 26 February 2023

`https://klembot.github.io/chapbook/use/1.2.3/format.js`

- The `{cycling link}` and `{dropdown menu}` inserts now handle numeric choices
  correctly.
- Fixed a bug where the watch icon that appears when using the `[after
  timespan]` modifier would not appear correctly in Firefox.
- Fixed the reveal link and text input Twine editor toolbar buttons.

## 1.2.2, 5 April 2022

`https://klembot.github.io/chapbook/use/1.2.2/format.js`

- Added Twine editor extensions.

## 1.2.1, 17 January 2021

`https://klembot.github.io/chapbook/use/1.2.1/format.js`

- If a variable is set to an array, it can now be dereferenced using an insert,
  e.g. `{myArray[1]}`.
- Mixing conditional modifiers with forks now behaves correctly.
- Updated the Markdown renderer library used, Marked, to version 1.2.7.
- Fixed typos in the guide.

## 1.2.0, 6 July 2020

`https://klembot.github.io/chapbook/use/1.2.0/format.js`

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

`https://klembot.github.io/chapbook/use/1.1.1/format.js`

- Fixes a bug introduced in 1.1.0 where nested lookup variables (like
  `random.coinFlip`) did not work--which is to say, all of them.

## 1.1.0, 10 May 2020

`https://klembot.github.io/chapbook/use/1.1.0/format.js`

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

`https://klembot.github.io/chapbook/use/1.0.0/format.js`

Initial public release.

## 0.0.2, 19 October 2018

- Fixes a bug where hard restarts in stories deleted the entire local storage
  object, which could trash, among other things, the Twine story library if
  you're using the web version (yikes). Thanks to Brendan Hennessy for
  identifying this early.

## 0.0.1, 14 October 2018

Initial public prerelease.
