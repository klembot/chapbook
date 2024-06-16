# Inserts

All of the below cause text or other types of content to appear in your passage. See [Modifiers and Inserts][mods-inserts] for more information.

<dl>

<dt>
<code>{ambient sound: 'sound name'<i>, volume: 0.5</i>}</code>
</dt>

<dd>
Begins playing a <a href="../multimedia/audio.html">previously-defined ambient sound</a>. <code>volume</code> can be omitted; by default, the ambient sound is played at full volume.
</dd>

<dt>
<code>{back link<i>, label: 'Back'</i>}</code>
</dt>

<dd>
Renders a link to the previous passage. <code>label</code> can be omitted; Chapbook will default to using 'Back'.
</dd>

<dt>
<code>{cycling link<i> for 'variableName'</i>, choices: ['one', 'two', 'three']}</code>
</td>

<dd>
Renders a cycling link that runs through the options listed in <code>choices</code>, saving the option the player selected to the variable named. <code>for 'variable name'</code> can be omitted; Chapbook will not save the selected value anywhere.
</dd>

<dt>
<code>{dropdown menu<i> for 'variableName'</i>, choices: ['one', 'two', 'three']}</code>
</td>

<dd>
Renders a dropdown menu that runs through the options listed in <code>choices</code>, saving the option the player selected to the variable named. <code>for 'variable name'</code> can be omitted; Chapbook will not save the selected value anywhere.
</dd>

<dt>
<code>{embed Flickr image: 'embed code', alt: 'alternate text'}</code>
<br>
abbreviated: <code>{embed Flickr: 'embed code', alt: 'alternate text'}</code>
</dt>

<dd>
Renders an image hosted on Flickr with alt text specified by <code>alt</code>.
</dd>

<dt>
<code>{embed image: 'url', alt: 'alternate text'}</code>
</dt>

<dd>
Renders an image at a particular URL with alt text specified by <code>alt</code>.
</dd>

<dt>
<code>{embed passage named: 'passage name'}</code>
<br>
abbreviated: <code>{embed passage: 'passage name'}</code>
</dt>

<dd>
Renders the passage named in the insert. This executes any vars section in that passage.
</dd>

<dt>
<dt>
<code>{embed Unsplash image: 'URL', alt: 'alternate text'}</code>
<br>
abbreviated: <code>{embed Unsplash: 'URL', alt: 'alternate text'}</code>
</dt>

<dd>
Renders an image hosted on Unsplash with alt text specified by <code>alt</code>.
</dd>

<dt>
<code>{embed YouTube video: 'URL'}</code>
<br>
abbreviated: <code>{embed YouTube: 'URL'}</code>
</dt>

<dd>
Renders a video player for a video hosted on YouTube.
</dd>

<dt>
<code>{link to: 'passage name or URL'<i>, label: 'label'</i>}</code>
</dt>

<dd>
Renders a link to a passage name or address. <code>label</code> may be omitted; Chapbook will use the passage name or URL as label instead.
</dd>

<dt>
<code>{restart link<i>, label: 'label'</i>}</code>
</dt>

<dd>
Renders a link that restarts the story. <code>label</code> may be omitted; Chapbook will use 'Restart' in that instance.
</dd>

<dt>
<code>{reveal link: 'label', text: 'revealed text'}</code>
</dt>

<dd>
Renders a link that expands to show the <code>text</code> property when clicked or tapped.
</dd>

<dt>
<code>{reveal link: 'label', passage: 'passage name'}</code>
</dt>

<dd>
Renders a link that expands to show the contents of the passage that has the name specified by the <code>passage</code> property when clicked or tapped.
</dd>

<dt>
<code>{sound effect: 'sound name'<i>, volume: 0.5</i>}</code>
</dt>

<dd>
Begins playing a [previously-defined sound effect][sound]. <code>volume</code> can be omitted; by default, the ambient sound is played at full volume.
</dd>

<dt>
<code>{text input<i> for: 'variable name'</i>, <i>required: false</i>}</code>
</td>

<dd>
Renders a text field, saving the text entered to the variable named. <code>for 'variable name'</code> can be omitted; Chapbook will not save the selected value anywhere. <code>required</code> can also be omitted; Chapbook will make the field required unless you specify otherwise.
</dd>

<dt>
<code>{theme switcher<i>, darkLabel: 'label'</i>, <i>lightLabel: 'label'</i>}</code>
</td>

<dd>
Renders a link that switches between light and dark themes. <code>darkLabel</code> and <code>lightLabel</code> set the label shown when the theme is currently dark or light.
</dd>

</dl>

[sound]: ../multimedia/audio.md
[mods-inserts]: ../modifiers-and-inserts/