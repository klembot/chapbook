/**
 * A simple settable type. Use `Settable` instead.
 */
export type SettablePrimitive = string | boolean | number | null | undefined;

/**
 * An aggregate settable type. Use `Settable` instead.
 */
export type SettablePrimitiveOrArray = SettablePrimitive | SettablePrimitive[];

// Needs to extend in order to avoid a circular declaration error
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettableObject
	extends Record<string, SettablePrimitiveOrArray | SettableObject> {}

/**
 * A value that can be set in state.
 */
export type Settable = SettablePrimitiveOrArray | SettableObject;

/**
 * Function signature used for configuring read-only values.
 */
export type Lookup = (
	get: (name: string) => unknown,
	set: (name: string, value: Settable) => void
) => unknown;
