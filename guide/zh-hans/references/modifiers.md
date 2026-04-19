# 修饰符｜Modifiers

以下所有内容都会影响其后的文本。更多信息请参阅“[修饰符与插入][mods-inserts]”。

<dl>

<dt>
<code>[after <i>time</i>]</code>（延迟）
</dt>

<dd>
使文本在首次到达段落后经过一定时间才出现。
</dd>

<dt>
<code>[align center]</code>（居中）, <code>[align left]</code>（左对齐）, <code>[align right]</code>（右对齐）
</dt>

<dd>
使文本按特定方式对齐。在正常情况下，左对齐通常不需要特意指定，但为了完整性而包含——通常应使用 <code>[continue]</code> 替代。
</dd>

<dt>
<code>[append]</code>（追加）
</dt>

<dd>
与其他修饰符结合使用，使文本紧接在前一段文本之后追加显示，而不是另起一个自然段。
</dd>

<dt>
<code>[continue]</code>, <code>[cont'd]</code>, <code>[cont]</code>（这三个修饰符都是“继续”的意思，除了写法不一样以外，没有区别）
</dt>

<dd>
清除所有先前激活的修饰符。
</dd>

<dt>
<code>[CSS]</code>
</dt>

<dd>
作用类似于段落中的 <code>&lt;style&gt;</code> 标签；文本内容将被解释为 CSS 规则而非普通文本。
</dd>

<dt>
<code>[else]</code>（否则）
</dt>

<dd>
仅当先前的 <code>[if]</code> 条件未满足时显示文本。若段落源代码中未出现先前的 <code>[if]</code> 指令，则会产生错误。
</dd>

<dt>
<code>[if <i>表达式</i>]</code>（如果 表达式 为真）
</dt>

<dd>
仅当表达式计算结果为真值（<a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy">或 JavaScript 定义的 truthy 值</a>）时才显示文本。
</dd>

<dt>
<code>[ifalways <i>表达式</i>]</code>（不管表达式是真是假都会输出真的如果）
</dt>

<dd>
其作用类似于 <code>[if]</code> 修饰符，但无论条件如何，它都始终会给出真值以显示其影响的文本。这对于快速测试很有用。
</dd>

<dt>
<code>[ifnever <i>表达式</i>]</code>（不管表达式是真是假都会输出假的如果）
</dt>

<dd>
其作用类似于 <code>[if]</code> 修饰符，但无论条件如何，它都始终会给出假值以永远不显示其影响的文本。这对于快速测试很有用。
</dd>

<dt>
<code>[JavaScript]</code>
</dt>

<dd>
其作用类似于段落中的 <code>&lt;script&gt;</code> 标签；文本内容将被解释为 JavaScript 代码，而不是普通文本。若要在文本内部输出内容，请使用 `write()` 函数。
</dd>

<dt>
<code>[note to self]</code>, <code>[note]</code>, <code>[todo]</code>, <code>[fixme]</code>（给自己看的笔记、待办清单）
</dt>

<dd>
使文本对玩家永远不可见。这适用于为自己留下笔记或其他信息。
</dd>

<dt>
<code>[unless <i>表达式</i>]</code>（反如果，表达式假时输出真）
</dt>

<dd>
仅在表达式评估为假（<a href="https://developer.mozilla.org/en-US/docs/Glossary">或 JavaScript 定义的假值</a>）时显示文本。
</dd>

</dl>

[mods-inserts]: ./modifiers-and-inserts/index.md