/**
 * Interface for an insert.
 */
export interface Insert<
	T extends Record<string, unknown> = Record<string, never>
> {
	/**
	 * Regular expression that matches invocations of this insert.
	 */
	match: RegExp;
	/**
	 * Renders the insert as HTML.
	 */
	render: (
		firstArgument: string | null,
		props: T,
		invocation: string
	) => string | undefined;
}
