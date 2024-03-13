import {describe, expect, it} from 'vitest';
import {markdownRenderer} from '../markdown-renderer';

describe('Custom Markdown renderer', () => {
	it('wraps blockquotes in a div.fork', () =>
		expect(markdownRenderer.blockquote('text')).toBe(
			'<div class="fork">text</div>'
		));

	it('wraps struck text in a span.small-caps', () =>
		expect(markdownRenderer.del('text')).toBe(
			'<span class="small-caps">text</span>'
		));
});
