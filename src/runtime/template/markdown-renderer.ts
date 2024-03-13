import {Renderer} from 'marked';

/**
 * A custom renderer for Marked that:
 * -  Renders a `div#fork` instead of a blockquote character
 * -  Outputs small caps instead of strikethrough text
 */
export const markdownRenderer = new Renderer();

markdownRenderer.blockquote = (src: string) => `<div class="fork">${src}</div>`;
markdownRenderer.del = (src: string) =>
	`<span class="small-caps">${src}</span>`;
