import {afterModifier} from './after';
import {alignModifier} from './align';
import {appendModifier} from './append';
import {conditionalModifier} from './conditionals';
import {continueModifier} from './continue';
import {cssModifier} from './css';
import {javascriptModifier} from './javascript';
import {noteModifier} from './note';
import {Modifier} from './types';

export * from './types';

const builtins = [
	afterModifier,
	alignModifier,
	appendModifier,
	conditionalModifier,
	continueModifier,
	cssModifier,
	javascriptModifier,
	noteModifier
];

export let modifiers = [...builtins];

/**
 * Returns an array of active modifiers. Please treat the value returned as
 * read-only. Use `add` or `remove` to make changes instead.
 */
export function all() {
	return modifiers;
}

/**
 * Adds a modifier.
 */
export function add(modifier: Modifier) {
	modifiers = [...modifiers, modifier];
}

/**
 * Removes a modifier. The modifier passed must be the exact object passed to
 * the `add()` function. If the passed modifier hasn't been added, this does
 * nothing.
 */
export function remove(modifier: Modifier) {
	modifiers = modifiers.filter(mod => mod !== modifier);
}

/**
 * Resets modifiers to the original set built into Chapbook.
 */
export function reset() {
	modifiers = [...builtins];
}