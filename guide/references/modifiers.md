# Modifiers

All of the below affect the text following them. See [Modifiers and Inserts][mods-inserts] for more information.

<dl>

<dt>
<code>[after <i>time</i>]</code>
</dt>

<dd>
Causes the text to appear after a certain amount of time has passed after the passage is first displayed.
</dd>

<dt>
<code>[align center]</code>, <code>[align left]</code>, <code>[align right]</code>
</dt>

<dd>
Causes the text to be aligned a particular way. Aligning left isn't needed under normal circumstances, but is included for compeleteness's sake--use <code>[continue]</code> instead.
</dd>

<dt>
<code>[append]</code>
</dt>

<dd>
Used in conjunction with another modifier to have text immediately follow the text preceding it, instead of appearing in a new paragraph.
</dd>

<dt>
<code>[continue]</code>, <code>[cont'd]</code>, <code>[cont]</code>
</dt>

<dd>
Clears all previously active modifiers.
</dd>

<dt>
<code>[else]</code>
</dt>

<dd>
Only dispalys the text if the previous <code>[if]</code> condition was not met. If no previous <code>[if]</code> appeared in the passage's source code, an error occurs.
</dd>

<dt>
<code>[if <i>expression</i>]</code>
</dt>

<dd>
Only displays the text if <i>expression</i> evaluates to true, or a truthy (<a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy">as defined by Javascript</a>) value.
</dd>

<dt>
<code>[note to self]</code>, <code>[note]</code>, <code>[todo]</code>, <code>[fixme]</code>
</dt>

<dd>
Causes the text to never be visible to the player. This is useful for leaving notes or other information for yourself.
</dd>

<dt>
<code>[unless <i>expression</i>]</code>
</dt>

<dd>
Only displays the text if <i>expression</i> evaluates to false, or a falsy (<a href="https://developer.mozilla.org/en-US/docs/Glossary">as defined by Javascript</a>) value.
</dd>

</dl>

[mods-inserts]: ../modifiers-and-inserts/index.md