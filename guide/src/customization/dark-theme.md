# Dark Theme

Chapbook has two themes:

- A _light_ theme, with dark text on a light background
- A _dark_ theme, with light text on a dark background

It starts by using the theme that corresponds to the _system theme_. Most
operating systems now allow users to choose a light or dark appearance for the
user interface. In macOS, this is set in the Appearance system setting, for
example, while in recent Windows versions, this set in the Colors section of
Personalization options. If Chapbook is unable to determine what the system
theme is, or the browser the player is using doesn't make this information
available to web pages, then it will use the light theme.

Chapbook also shows a link labeled "Switch Theme" in the footer of the story
that allow players to swap between light and dark themes. This setting, like
other [state](../state/), is remembered across play sessions.

All of this behavior may be customized.

- You can customize both the light and dark theme.
- You can lock Chapbook so that it only uses a single theme: either the default,
  light theme, or a theme you've customized.
- You can place a link that switches the theme elsewhere in your story.

# Customizing Themes

All of the descriptions of how to customize appearance in this section have
applied to the default, light theme. So for example, setting
`config.style.page.font` [sets the font](fonts-and-colors.html) in the light
theme.

The dark theme uses nearly the same variable names as the light theme, but they
begin with `config.style.dark` instead of `config.style`. So
`config.style.dark.page.font` sets the font in the dark theme.

If a dark theme variable isn't defined, Chapbook falls back to whatever is set
in the light theme equivalent.

As an example, consider these variables:

```
config.style.backdrop: 'blue-3'
config.style.dark.backdrop: 'blue-6'
config.style.page.font: 'Courier 24'
```

Both the light and dark themes will use Courier 24 as their font, but the
backdrop color will be a dark blue in the dark theme, and a light blue in the
light theme.

# Using the Current Theme in Code

The [lookup](../state/objects-and-lookups.html) `browser.darkTheme` holds
whether the current theme is dark (`true`) or light (`false`). As with other
lookups, you can't change this directly. Instead, set
`config.style.page.theme.override` as described below.

There is also a `browser.darkSystemTheme` lookup that acts the same way as
`browser.darkTheme`, but doesn't take into account any overrides made in
Chapbook code. It reports back whether the system is using as dark theme, to the
best of its ability.

# Controlling Theme Switching

The [variable](../state/the-vars-section.html)
`config.style.page.theme.override` tracks which theme Chapbook is using.

| Value           | Effect                                          |
| --------------- | ----------------------------------------------- |
| `'light'`       | Uses the light theme regardless of system theme |
| `'dark'`        | Uses the dark theme regardless of system theme  |
| any other value | Uses the system theme                           |

The "Switch Theme" link that appears in the page footer changes this value. You
can also set this value directly as well.

You can use a `{theme switcher}`
[insert](../modifiers-and-inserts/link-inserts.html) to display a link that
switches theme. You can customize the label shown for each theme like so:

`{theme switcher, darkLabel: 'Use Light Theme', lightLabel: 'Use Dark Theme'}`

The names of the labels can be confusing. They refer to the current theme, not
the one that that will be switched to. So `darkLabel`, as in the example above, is the label shown when clicking the link will switch to the light theme.

If you'd like the same label to be shown regardless of the current theme, set
`darkLabel` and `lightLabel` to the same value.

# Disabling Theme Switching

If you'd like your story to use the same theme regardless of the system theme,
set the variable `config.style.page.theme.enableSwitching` to `false`. This will
cause Chapbook to only use the light theme regardless of both the system theme
and any value set in `config.style.page.theme.override`. It also will cause all
`{theme switcher}` inserts to be hidden.

Although this variable causes Chapbook to use the light theme (e.g. theme
defined under `config.style`, not `config.style.dark`), you can define this
theme to have whatever appearance you'd like. If you want your story to only
have light text on a dark background, you can define the light theme
accordingly.