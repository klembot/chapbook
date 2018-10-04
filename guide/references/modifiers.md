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
`[align center]`, `[align left]`, `[align right]`
</dt>

<dd>
Causes the text to be aligned a particular way. Aligning left isn't needed under normal circumstances, but is included for compeleteness's sake--use `[continue]` instead.
</dd>

<dt>
`[append]`
</dt>

<dd>
Used in conjunction with another modifier to have text immediately follow the text preceding it, instead of appearing in a new paragraph.
</dd>

<dt>
`[continue]`, `[cont'd]`, `[cont]`
</dt>

<dd>
Clears all previously active modifiers.
</dd>

<dt>
`[else]`
</dt>

<dd>
Only dispalys the text if the previous `[if]` condition was not met. If no previous `[if]` appeared in the passage's source code, an error occurs.
</dd>

<dt>
<code>[if <i>expression</i>]</code>
</dt>

<dd>
Only displays the text if _expression_ evaluates to true, or a truthy ([as defined by Javascript][truthy]) value.
</dd>

<dt>
`[note to self]`, `[note]`, `[todo]`, `[fixme]`
</dt>

<dd>
Causes the text to never be visible to the player. This is useful for leaving notes or other information for yourself.
</dd>

<dt>
`[unless _expression_]`
</dt>

<dd>
Only displays the text if _expression_ evaluates to false, or a falsy ([as defined by Javascript][falsy]) value.
</dd>

</dl>

[mods-inserts]: ../modifiers-and-inserts/index.md
[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
[falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy