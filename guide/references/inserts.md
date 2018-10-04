# Inserts

All of the below cause text or other types of content to appear in your passage. See [Modifiers and Inserts][mods-inserts] for more information.

<dl>

<dt>
{back link<i>, label: 'Back'</i>}
</dt>

<dd>
Renders a link to the previous passage. `label` can be omitted; Chapbook will default to using 'Back'.
</dd>

<dt>
{cycling link<i> for 'variable name'</i>, choices: ['one', 'two', 'three', ]}
</td>

<dd>
Renders a cycling link that runs through the options listed in `choices`, saving the option the player selected to the variable named. `for 'variable name'` can be omitted; Chapbook will not save the selected value anywhere.
</dd>

<dt>
{dropdown menu<i> for 'variable name'</i>, choices: ['one', 'two', 'three', ]}
</td>

<dd>
Renders a dropdown menu that runs through the options listed in `choices`, saving the option the player selected to the variable named. `for 'variable name'` can be omitted; Chapbook will not save the selected value anywhere.
</dd>

<dt>
{embed Flickr image: 'embed code', <i>alt: 'alternate text'</i>}
<br>
abbreviated: {embed Flickr: 'embed code', <i>alt: 'alternate text'</i>}
</dt>

<dd>
Renders an image hosted on Flickr with alt text specified by `alt`.
</dd>

<dt>
{embed image: 'url', <i>alt: 'alternate text'</i>}
</dt>

<dd>
Renders an image at a particular URL with alt text specified by `alt`.
</dd>

<dt>
{embed passage named: 'passage name'}
<br>
abbreviated: {embed passage: 'passage name'}
</dt>

<dd>
Renders the passage named in the insert. This executes any vars section in that passage.
</dd>

<dt>
<dt>
{embed Unsplash image: 'URL', <i>alt: 'alternate text'</i>}
<br>
abbreviated: {embed Unsplash: 'URL', <i>alt: 'alternate text'</i>}
</dt>

<dd>
Renders an image hosted on Unsplash with alt text specified by `alt`.
</dd>

<dt>
{embed YouTube video: 'URL'}
<br>
abbreviated: {embed YouTube: 'URL'}
</dt>

<dd>
Renders a video player for a video hosted on YouTube.
</dd>

<dt>
{link to: 'passage name or URL'<i>, label: 'label'</i>}
</dt>

<dd>
Renders a link to a passage name or address. `label` may be omitted; Chapbook will use the passage name or URL as label instead.
</dd>

<dt>
{restart link<i>, label: 'label'</i>}
</dt>

<dd>
Renders a link that restarts the story. `label` may be omitted; Chapbook will use 'Restart' in that instance.
</dd>

<dt>
{text input<i> for 'variable name'</i>, <i>required: false</i>}
</td>

<dd>
Renders a text field, saving the text entered to the variable named. `for 'variable name'` can be omitted; Chapbook will not save the selected value anywhere. `required` can also be omitted; Chapbook will make the field required unless you specify otherwise.
</dd>

</dl>