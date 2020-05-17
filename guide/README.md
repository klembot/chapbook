<div class="intro intro-path">
    <h1>Introduction</h1>
</div>

This is a guide to the Chapbook story format for Twine 2.[^1] Story formats control how a story created with the Twine editor plays in a Web browser; once you select the **Play** button in Twine or publish your story to a file, whatever story format you have selected takes over.

Chapbook is designed to be easy to work with as an author and generate output that is a pleasure to read by players. It provides sensible default behaviors for your story that can be customized to fit your particular needs.

This guide does not assume you have any programming knowledge; however, it doesn't hurt to know CSS or JavaScript, as it uses both technologies heavily. It's split into several chapters that will gently guide you through the process of story creation.

This guide does assume, however, that you're familiar with the Twine 2 editor itself. If you're new to Twine, the [Twine 2 guide](http://twinery.org/wiki/twine2:guide) is an excellent place to start. There are also numerous tutorials on the web that can be helpful.

## Licensing

Chapbook is released under the [MIT license](mit-license). Broadly speaking, it can be used to create free and commercial works alike without royalty payment of any kind. Mentioning Chapbook and Twine in the credits of your work isn't required, but it is appreciated.

Because Chapbook is open source, its ongoing development and maintenance is supported by [Patreon supporters](https://patreon.com/klembot) like:

<div class="patreon-supporters">
    <ul>
		<li>Keith Alt</li>
		<li>Ben</li>
		<li>Eli Berg-Maas</li>
        <li>John Bruce</li>
        <li>Kendall Buchanan</li>
		<li>Matt Campbell</li>
        <li>Michael Chumak</li>
		<li>CJ</li>
		<li>Chris D'lorio</li>
		<li>Christian</li>
		<li>Dene Grigar</li>
		<li>Kyle Haas</li>
		<li>Matthew Hall</li>
		<li>Jakob</li>
		<li>Molly Jameson</li>
        <li>José Dias</li>
        <li><a href="http://bphennessy.com/">Brendan Hennessy</a></li>
		<li>Chris Martens</li>
        <li>Marisa Parham</li>
        <li><a href="https://danq.me/">Dan Q</a></li>
		<li><a href="https://anastasiasalter.net">Anastasia Salter</a></li>
        <li>Caelyn Sandel</li>
        <li>Steven Schutz</li>
		<li>Jason Swisher</li>
		<li>Emily Short</li>
    </ul>
</div>

Supporters at particular tiers receive access to devlogs and other rewards. If you use Chapbook, please consider [supporting the project on Patreon](https://patreon.com/klembot).

## Browser Support

Chapbook supports the `defaults` set of web browsers set by [the browserslist project](https://github.com/browserslist/browserslist). You can view what that entails in detail [on browserl.ist](https://browserl.ist/).

## How to Use Chapbook

Chapbook is bundled as part of the Twine 2 editor now, though releases of Twine sometimes lag behind Chapbook. If you would like to use it separately, or update by hand, choose the **Formats** button from the story list page you see when you first start up Twine, then the **Add a New Format** tab at the top of the dialog that appears. Paste the following address into the field and select the **Go** button:

```
https://klembot.github.io/chapbook/use/1.1.1/format.js
```

Once you do that, you must set the story you're working with to publish using Chapbook. Edit one of your stories, then choose **Change Story Format** from the story menu at the bottom of the editor. Choose Chapbook here. Once you do, selecting the **Play** button or publishing your story to a file will use Chapbook format.

To use the micro version of Chapbook, which removes all debugging-related code, add this address instead:

```
https://klembot.github.io/chapbook/use/1.1.1-micro/format.js
```

## Why To Use Chapbook

There is a relative embarassment of riches when it comes to selecting a Twine 2 story format. What are Chapbook's advantages?

-   Chapbook source code is easy to read. It disallows certain practices, such
    as nesting conditional statements[^2], and enforces others, like placing all
    variable declarations in one place in a passage, that lead to
    easier-to-follow code.

-   Chapbook has built-in functionality for common authoring scenarios. From
    cycling links to delayed text, many things you'll want to do with your
    stories will only require a single line of code.

-   Chapbook has a backstage view that aids in testing; it allows you to inspect
    the state of play, change variables on the fly, and save state anywhere so
    that you can quickly debug a particular part of your story.

-   Chapbook is designed to be used on a variety of devices, especially mobile
    ones. It uses responsive design to adapt its page layout so that it's
    readable on any type of device without having to zoom in or scroll
    unnecessarily. It also is lightweight-- it currently contains 120K of code,
    which takes less than a second to load on cellular networks.

-   Chapbook's appearance can be customized without knowing HTML or CSS, and has
    built-in tools that allow you to preview style changes in your story
    immediately, so you can craft the appearance you're looking for without
    having to learn browser developer tools.

## Why Not To Use Chapbook

-   Chapbook is young. This means that resources apart from this guide are
    scarce compared to the many tutorials you'll find related to the venerable
    formats SugarCube and Harlowe. And there will be fewer people to turn to if
    you have a question or encounter a problem.

-   You've invested significant time already in learning another story format.
    There's nothing that Chapbook can do that other formats can't. It may be
    easier to write with, depending on your point of view, but if you've already
    spent the time to learn how to write for another story format, it may not be
    worth the time investment.

## An Aside on Names

There's been some debate as to whether Twine produces games or merely stories: the truth is, with Twine you can make games, you can make interactive stories, and you can also make things that nobody can quite pin down. Keeping in the spirit of vexing formalists who prefer clear boundaries, this guide calls the things you'll create with Chapbook _stories_ and the people who you share them with _players_, but you shouldn't infer anything from this usage. Please make strange things with Twine and Chapbook.

[^1]: Chapbook, sadly, cannot be used with Twine 1.
[^2]: If you have programming experience, this idea may immediately cause some alarm--how can you possibly write anything serious without this functionality? [Conditional Display](state/conditional-display.md) discusses this subject, but it may be a bit hard to follow if you skip ahead immediately.

[mit-license]: https://en.wikipedia.org/wiki/MIT_License

<style>
.patreon-supporters {
    background: #f7f7f7;
    padding: 1em;
    margin-bottom: 1em;
}

.patreon-supporters ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
}

.patreon-supporters li {
    text-align: center;
}

</style>