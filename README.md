# Chapbook, a story format for Twine 2

_by Chris Klimas_

Chapbook is a story format for Twine 2, which means that it plays stories
created in Twine in a web browser. This is technical documentation intended for
people interested in understanding it better, contributing to it, or extending
it. For information on how to use Chapbook to build stories in Twine, see [the guide].

## Installing

Run `npm install` to install most dependencies. [mdbook] is also required to
generate the guide.

## Development

`npm start` starts a dev server with the runtime engine and the demo Twee
source files under `demo`.

`npm run start:extensions` starts a dev server with a test harness for Twine
editor extensions, e.g. the CodeMirror syntax mode and reference parser.

`npm run start:website` starts a dev server version of the Chapbook web site,
including compiled format and examples.

## Testing and Linting

`npm test` runs unit tests.

`npm run e2e` and `npm run e2e:extensions` runs end-to-end tests using
Playwright. The `e2e:extensions` task tests Twine editor extensions.

`npm run lint` lints source code for problems.

## Building

`npm run build` will build the Chapbook web site and compiled format to `dist/`.
It uses the version set in `package.json` when building the format, but files
under `homepage/` need manual updates.

## Directory Structure

`demo/` contains Twee files used both for development work and for end-to-end
tests. Adding a `.twee` file here will cause it to be incorporated into the
story used for both.

`guide/` contains source files for the guide.

`homepage/` contains source files for the format home page.

`previous-versions/` contains all previous compiled versions of the format.
These are updated manually.

`scripts/` contains Node scripts used for build processes.

`src/runtime/` contains all code related to the format when bound to a story.

- `backstage/` handles the backstage panel that authors see when
  testing a story.
- `display/` handles display of passage content onscreen. It mostly
  reacts to changes to the `trail` state variable.
- `logger/` is a logging system which allows certain types of logging to be
  enabled or disabled during play. The `log()` function here is available to
  stories as `engine.log()`.
- `sound/` handles ambient sound and sound effects.
- `state/` handles story state. Functions here are available to stories as the
  `engine.state` object.
- `style/` handles parsing user styles.
- `template/` handles parsing passage source and transforming it to HTML to be
  displayed. Functions here are available to stories as the `engine.template`
  object.
- `util/` contains assorted utility functions.

`src/twine-extensions/` contains code related to Twine editor extensions.

[the guide]: https://klembot.github.io/chapbook/guide/
[mdbook]: https://rust-lang.github.io/mdBook/
