# Design Goals

This documents the design goals that underlie Chapbook. No one story format can
be everything to everyone, and by setting out the tradeoffs Chapbook has made,

The word _author_ means anyone who creates something using Chapbook, and
_player_ means anyone who experiences a Chapbook story in playable format.

## Accessible by Default

Every Chapbook feature should be accessible to as many authors and players as
possible, with as little effort as possible required on the part of authors.
This means adhering to [WCAG accessibility standards], of course, but also means
that all features must be equally accessible to players regardless of platform.
It is OK to have small differences between platforms that don't have an
appreciable effect on the player experience. For example, Chapbook applies hover
styling to links by default that players on touch-oriented devices will probably
never see.

## Beginners First

Chapbook is intended to be as easy as possible for authors who have never used
Twine, or done any computer programming, before. This doesn't mean that it can't
be used by expert users or that sophisticated things can't be done with it,
however.

## Allows Experts to Bypass It

Chapbook gets out of the way of expert authors where possible. For instance, the
`[JavaScript]` modifier allows entering JavaScript code directly into passages,
and state variables can be set to any JavaScript expression.

## State-Oriented

Functionality is Chapbook is oriented around state, not functions. This means,
for example, that there is a `random.d10` lookup variable instead of a
hypothetical `random(1, 10)` function. This is for two reasons:

1. It's easy to save and restore the state of play; we don't have to account for
   side effects caused by function calls.
2. Authors learning Chapbook don't have to learn what a function is, or how to
   use one.

## Readable Source Code

Source code is meant to be read by authors and computers equally. Chapbook
author code should be as readable as possible, ideally such that its intention
would be clear to even people who aren't familiar with Chapbook. Syntax that is
used often by authors should be as short as reasonable, but also allow for
longer, easier-to-remember formulations. Hence, Chapbook allows authors to write
`[continued]`, `[cont'd]`, or `[cont]`.

## Forgiving of Mistakes

Authors, regardless of their experience level, rarely write code correctly the
first time. Chapbook is forgiving of author mistakes, and where possible offers
error and warning messages that point to solutions.

## Lightweight

Base Chapbook should load over a slow 3G cellular network (approximately 1 Mbps)
in fewer than 2 seconds. This sounds very fast, but remember that author content
needs to be downloaded as well. In practice, this equates to a minified,
packaged `format.js` file that is less than 250 KB in size. Ideally, it is even
smaller and faster.

Adding any external dependency must be carefully considered. For example, it
uses the [Marked] Markdown processor is used instead of more fully-featured ones
like [markdown-it]. [Bundlephobia] is a good tool for assessing the total impact
of a new dependency.

[wcag accessibility standards]: https://www.w3.org/TR/WCAG20/
[marked]: https://marked.js.org/#/README.md#README.md
[markdown-it]: https://github.com/markdown-it/markdown-it
[bundlephobia]: https://bundlephobia.com/
