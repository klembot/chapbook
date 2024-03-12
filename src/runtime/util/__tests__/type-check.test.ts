import {describe, expect, it} from 'vitest';
import {isSettable} from '../type-check';

describe('isSettable', () => {
	it.each([
		[true, undefined],
		[true, null],
		[true, 'a'],
		[true, ''],
		[true, 1],
		[true, true],
		[true, {a: 'a', b: true, c: null}],
		[true, [true, 'pass']],
		[false, Infinity],
		[false, NaN],
		[false, new Date()],
		[false, new Map()],
		[false, new Set()],
		[false, Symbol()],
		[false, {test: new Date()}],
		[false, [true, new Date()]]
	])('returns %s for %s', (result, input) =>
		expect(isSettable(input)).toBe(result)
	);
});
