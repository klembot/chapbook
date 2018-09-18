# External Web Fonts

Creating a good font stack is difficult because there are very few typefaces you can count on a majority of your players having installed. Fortunately, you aren't limited to what your players happen to have installed--instead, you can use web fonts.

## Using Google Fonts

Google provides a wide variety of freely-usable fonts through their [Google Fonts](google-fonts) service. To use Google Fonts in your story, first find the embed code for the families you wish to use:

[screenshot]

Copy the embed code that Google Fonts offers you, i.e. `<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
`, and set the variable `config.style.googleFont` to it in your first passage. You can then use the font name anywhere in the rest of `config.style` as usual:

```
config.style.googleFont: '<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">'
config.style.page.font: 'Open Sans/sans-serif 18'
--
Welcome aboard the U.S.S. Hood.
```

Note that because `config.style.googleFont` is a string, you must put single quotes around its value. (It's much easier to type single quotes here, since the embed code has double quotes in it.)

## Using Typekit Fonts

TODO

## Adding Your Own Fonts

TODO

[google-fonts]: https://fonts.google.com