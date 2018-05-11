/* An author function to render arbitrary code to HTML. */

function createFactory(parser, renderer) {
	return code => renderer.render(parser.parse(code)).html;
}

export {createFactory};
