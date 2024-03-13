/**
 * Sometimes you'd like to wrap a block of Markdown text in a `<div>` tag to
 * apply some effect to it, but doing so turns off Markdown paragraphing inside
 * the tag because Markdown leaves block tags alone. This function wraps each
 * paragraph in Markdown in a tag. This tag should be set to display inline in
 * CSS.
 */
export function wrapMarkdown(
	markdown: string,
	tagName: string,
	attributes: Record<string, string> = {}
) {
	const tag =
		`<${tagName}` +
		Object.keys(attributes).reduce(
			(result, current) => `${result} ${current}="${attributes[current]}"`,
			''
		) +
		'>';

	let output =
		tag +
		markdown.replace(/[\r\n]{2,}/g, `</${tagName}>$&${tag}`) +
		`</${tagName}>`;

	// Move <span>s after any setext-style headers.

	output = output.replace(/(<span.*?>)\s*(#+)/gi, '$2 $1');
	return output;
}
