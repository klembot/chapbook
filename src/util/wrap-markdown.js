/*
Sometimes you'd like to wrap a block of Markdown text in a <div> tag to apply
some effect to it... but doing so turns off Markdown paragraphing inside the tag
because Markdown leaves block tags alone. This module wraps each paragraph in
Markdown in a <span> for you.
*/

export default (markdown, attributes = {}) => {
	const tag = '<span' + Object.keys(attributes).reduce(
		(result, current) => result + ` ${current}="${attributes[current]}"`,
		''
	) + '>';

	return tag + markdown.replace(/[\r\n]{2,}/g, `</span>$&${tag}`) + '</span>';
};