import {beforeEach, describe, expect, it} from 'vitest';
import {add, all, remove, reset} from '..';

const testModifier = {match: /test/};

describe('add()', () => {
	beforeEach(reset);

	it('adds a modifier', () => {
		add(testModifier);
		expect(all().includes(testModifier)).toBe(true);
	});
});

describe('remove()', () => {
	beforeEach(reset);

	it('removes a modifier', () => {
		add(testModifier);
		remove(testModifier);
		expect(all().includes(testModifier)).toBe(false);
	});

	it("doesn't throw an error if the modifier wasn't added", () =>
		expect(() => remove(testModifier)).not.toThrow());
});
