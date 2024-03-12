import {Settable} from '../state';

/**
 * Returns whether a value can be safely and permanently set in state.
 */
export function isSettable(value: unknown): value is Settable {
	if (Array.isArray(value)) {
		return value.every(isSettable);
	}

	if (value === null) {
		return true;
	}

	if (typeof value === 'object') {
		if (Object.getPrototypeOf(value) !== Object.prototype) {
			return false;
		}

		return Object.values(value).every(isSettable);
	}

	// Special case infinity and NaN because they stringify to `null`.

	if (typeof value === 'number') {
		return isFinite(value) && !isNaN(value);
	}

	return ['boolean', 'string', 'undefined'].includes(typeof value);
}
