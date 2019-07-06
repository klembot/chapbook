# Contributing

This document covers general guidelines related to reporting bugs, requesting
features, and opening pull requests. Please read over this before doing any of
the above!

This project is governed by the [code of conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code. Please report unacceptable
behavior by emailing hello at chris klimas dot com.

## Reporting a Bug

Please remember that the issue tracker is for tracking defects and
enhancements with Chapbook. It is not a place to ask for help on how to do
something, or to troubleshoot why a story you have created with Chapbook isn't
working--unless you believe it is caused by a problem with Chapbook itself.
There are several online communities that can help with troubleshooting a
story-specific issue. Please take advantage of them.

Be as specific as you can about bugs, and attach a story file demonstrating them
if possible. If a bug can't be reproduced on another person's computer, it can't
be fixed.

## Requesting a Feature

Please take a look at [Chapbook's design goals](DESIGN_GOALS.md) before opening
an issue--this lays out the context in which feature requests will be evaluated.

## Opening a Pull Request

**Pull requests will begin being accepted once Chapbook's 1.0.0 release is finalized.**

Pull requests should be test-coverage neutral at worst. Ideally, they improve
coverage. You can check this by running `npm run test:coverage`.

PRs should always be against the develop branch, not master.

Please open an issue to discuss a new feature before putting in the work of
implementing it. It's much better to collaboratively come up with a solution
than to have to hash it out in a PR and have to rewrite a lot of code.