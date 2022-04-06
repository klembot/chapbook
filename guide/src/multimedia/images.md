# Images

## Embedding Your Own Images

To display an image in a passage, use the `{embed image}` insert:

```
For all you know, not a single person has entered this cave in a thousand years. The cave entrance is covered in moss and leaves.

{embed image: 'cave.jpeg', alt: 'Cave entrance'}
```

The `alt` property is explained below under "Alternate Text."

## Embedding Images from Flickr

[Flickr][flickr] is a venerable photography service that allows people to mark their uploaded photos as embeddable. If a photo can be embedded, you will see an icon that looks a bit like an arrow in the lower right of the photo. Selecting that option will display the embed code to use, which is rather lengthy. Make sure to use the code found in the Embed tab, not the Share or BBCode ones. Once you have the code, use the `{embed Flickr image}` insert as below.

```
The night sky is alive:

{embed Flickr image: '<a data-flickr-embed="true"  href="https://www.flickr.com/photos/kees-scherer/43929816675/in/photolist-29VVN1k-MxBBfR-Mxmaoa-2abPdAf-28uxzXE-MsR1ev-MqbA18-P2bWEY-29LvwHZ-P1DPQ7-2b3znq5-28jiA4E-2b4qGd6-29QQrVa-2a4C5X3-MhDEFV-2b3tVwa-MfPdhz-2aZTken-2aTGEx1-2aVbrLg-NLVUU7-289o89h-288U1wq-2aN6BuN-NH87Jm-2aQH3Ta-NDwgPd-NB3Mym-2aHjvXP-29jgSN2-29zFLg5-27TFbQw-Nw3iLs-2aD2Dfn-27SXWGo-29f84mZ-LRdL8r-2aVtHgk-2awe7hj-29ux7nq-LPVrYk-2avhxQJ-2azf7ct-2ayX3mM-2aygKz8-27Nwi91-27NmmvS-NqvSME-2axAzDV" title="The Andromeda Galaxy, Messier 31"><img src="https://farm2.staticflickr.com/1857/43929816675_07357e53b0_m.jpg" width="240" height="185" alt="The Andromeda Galaxy, Messier 31"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>', alt: 'the Andromeda galaxy'}
```

{% hint style='danger' %}
Just because Flickr allows you to embed an image does not mean you have the _right_ to use it in your story freely. Check the image's page for the license the photo's uploader is using. Some may not be allowed to be used in commercial projects, while others may not allow usage at all.
{% endhint %}

## Embedding Images from Unsplash

[Unsplash][unsplash] is a stock photography service that hosts photos that can embedded into a story royalty-free. To use an image from Unsplash, combine the `{embed Unsplash image}` insert with the image's URL on unsplash.com. No embed code is required.

```
{embed Unsplash image: 'https://unsplash.com/photos/Na0BbqKbfAo', alt: 'the moon'}

What a horrible night to have to study for exams.
```

{% hint style='working' %}
Other types of image embeds may come in a future version of Chapbook, as well as more flexibility in layout--e.g. having an image appear to the left or right of the text.
{% endhint %}

## Alternate Text

Regardless of where your image comes from, you must give it _alternate text_. This is so that players who have a visual disability are able to have an equivalent experience to those who don't. [WebAIM][webaim-alt-text] has an excellent in-depth treatment of alternative text, but the gist is that it should contain a brief description of what the image depicts, that would work well for someone reading your story out loud. Because, for players with a visual disability, they often in fact will have your story read out loud by screen reader software.

When writing alternate text, avoid phrases like "image of Abraham Lincoln" or "Boston Harbor photo"-- just write "Abraham Lincoln" or "Boston Harbor."

If your image is purely decorative--say, a fancy border--then it should have empty alternative text, so that screen readers will skip over it: This doesn't mean omitting `alt` entirely, but setting it to an empty string, as below.

```
{embed image: 'asterisk.jpeg', alt:''}
```

[^1]: Although several browsers, Safari most prominent among them, hide the full URL from you unless uo specifically ask for it.

[flickr]: https://flickr.com
[unsplash]: https://unsplash.com
[webaim-alt-text]: https://webaim.org/techniques/alttext/