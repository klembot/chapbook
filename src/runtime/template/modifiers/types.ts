/**
 * Interface for what a modifier's `process` or `processRaw` function must
 * return.
 */
export interface ModifierOutput {
	/**
	 * Should this block start with a new paragraph, or continue inline with the
	 * text preceding it?
	 */
	startsNewParagraph: boolean;
	/**
	 * The source text that this modifier is applied to. The modifier may (and
	 * usually will) change it. If called in a `process` function, then this has
	 * been transformed after inserts and links have been rendered to HTML. If
	 * called in `processRaw`, this is the text exactly as it was written by the
	 * author.
	 */
	text: string;
}

/**
 * Options passed to a modifier's `process` or `processRaw` function.
 */
export interface ModifierOptions {
	/**
	 * The exact text that was entered in the modifier, without the square
	 * brackets surrounding it.
	 */
	invocation: string;
	/**
	 * This is for the modifier's own use, and the same value is passed to all
	 * invocations of a modifier in a single passage. The first time a modifier is
	 * invoked, state will be `{}`. Modifiers *must* modify this object in-place
	 * by assigning properties to it. Reassigning this variable will not pass the
	 * new value to the next invocation.
	 */
	state: Record<string, unknown>;
}

/**
 * Interface for a modifier.
 */
export interface Modifier {
	/**
	 * Regular expression to match on a modifier to activate it. This must not
	 * conflict with any other existing modifier.
	 */
	match: RegExp;
	/**
	 * Processes text after inserts and links have been rendered to HTML in it.
	 * Markdown will still be present.
	 */
	process?: (output: ModifierOutput, options: ModifierOptions) => void;
	/**
	 * Process text as it was exactly written by the author, before any processing
	 * is applied to it.
	 */
	processRaw?: (output: ModifierOutput, options: ModifierOptions) => void;
}
