# Font Scaling

By default, Chapbook scales the font size of text based on the width of the
_viewport_: the container in which the page is viewed. On a desktop computer,
the viewport is a browser window, which can be resized by the player as much as
they like. On a tablet or mobile device, the viewport is typically the entire
screen.

Chapbook will only ever increase the font size you set on text. It will never
make it smaller. The intention is to keep text at a comfortable size regardless
of the size of the viewport, and to prevent it from appearing in an unnaturally
narrow column in larger viewports.

You can customize Chapbook's font scaling or disable it entirely, so that text
is always exactly at the size you specify.

## Enabling or Disabling Scaling

To disable font scaling, set `config.style.fontScaling.enabled` to `false`. This
takes effect immediately. To re-enable font scaling, set this variable to
`true`.

Remember that players also have the ability to scale font sizes by changing
browser settings. You can't prevent this from occurring--nor should you want to,
since often players do this to make text easier to read.

## Controlling Scaling

Apart from `config.style.fontScaling.enabled`, there are two variables that must
be set for Chapbook to scale font sizes that control exactly how scaling occurs:

`config.style.fontScaling.baseViewportWidth` is the width, in pixels, of the
viewport when the font size as set in `config` variables is used exactly. In
other words, at any width wider than this, font sizes begin to increase. This
must be a number like `1280`, not `'1280px'`. By default, this is `1000`.

`config.style.fontScaling.addAtDoubleWidth` is the amount of pixels that is
added to font sizes when the viewport is exactly twice as wide as what is in
`config.style.fontScaling.baseViewportWidth`. Like `baseViewportWidth`, this
must be a number like `10`, not `'10px'`. You can't increase the font size by
any other unit but pixels. `addAtDoubleWidth` defines the ratio by which font
sizes increase. By default, this is set to `6`.

There's a third, optional variable: `config.style.fontScaling.maximumSize`. This
is the maximum size a font will be regardless of how wide the viewport becomes.
Unlike the other variables, this is a string. It should be a CSS length
measurement, including the unit, like `'36px'` or `'2rem'`. by default, this is
unset.

If you don't set a `maximumSize`, then fonts will be scaled at all viewport
widths.

<aside data-hint="info">
There is no <code>minimumSize</code> setting because Chapbook never scales fonts smaller than what is originally set. That is, if you set <code>config.style.page.font</code> to <code>'Helvetica 18'</code>, the smallest the body text will ever be is 18 pixels.
</aside>

If any of these variables are set to incorrect types, like
`config.style.fontScaling.baseViewportWidth` being set to `'blue'`, then
Chapbook will not perform any font scaling.

## An Example

These variables can be a little abstract. Let's work through an example. We'll
assume that the player's browser settings don't increase or decrease font sizes.

```
config.page.font: 'Helvetica 20'
config.style.fontScaling.baseViewportWidth: 1000
config.style.fontScaling.addAtDoubleWidth: 5
config.style.fontScaling.maximumSize: '30px'
```

| When the viewport width is... | The font size is...                                                               |
| ----------------------------- | --------------------------------------------------------------------------------- |
| 1000 pixels and narrower      | 20 pixels. The original size is used.                                             |
| 1000-2000 pixels              | Scaled linearly from 20 pixels to 25 pixels.                                      |
| 2000 pixels exactly           | 25 pixels: the original size plus the amount of pixels set in `addAtDoubleWidth`. |
| 2000-3000 pixels              | Scaled linearly from 25 pixels to 30 pixels.                                      |
| 3000 pixels and wider         | 30 pixels. It's clamped by `maximumSize`.                                         |

Below is a visual representation of this.

<div style="text-align: center; background: white">
<img src="font-scaling.svg" alt="" height="337" width="350">
</div>
