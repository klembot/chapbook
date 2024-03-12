export interface ContentBlock {
	/**
	 * Content whose purpose is determined by `type`.
	 */
	content: string;
	/**
	 * If modifier, content is a modifier to evaluate. If `text`, content is text
	 * to render.
	 */
	type: 'modifier' | 'text';
}

export interface VarDeclaration {
	/**
	 * Condition on the variable; if it evaluates to false, this should be
	 * ignored.
	 */
	condition?: () => unknown;
	/**
	 * Name of the variable to set.
	 */
	name: string;
	/**
	 * Evaluates to the value to set. This should be of type Settable, but because
	 * it's author-defined, we don't know for sure.
	 */
	value: () => unknown;
}

export interface ParseResult {
	blocks: ContentBlock[];
	vars: VarDeclaration[];
}
