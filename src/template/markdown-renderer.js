/*
A custom renderer for Marked that:
-	Renders a div#fork instead of a blockquote character
-	Outputs small caps instead of strikethrough text
*/

import marked from 'marked';

let renderer = new marked.Renderer();

Object.assign(renderer, {
	blockquote(src) {
		return `<div class="fork">${src}</div>`;
	},
	del(src) {
		/*
		Use ~~tildes~~ to denote small caps instead of strikethroughs.
		*/

		return `<span class="small-caps">${src}</span>`;
	},
});

export default renderer;
