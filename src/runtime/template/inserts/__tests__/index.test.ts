import {beforeEach, describe, expect, it} from 'vitest';
import {add, all, remove, reset} from '..';

const testInsert = {match: /test/, render: () => ''};

describe('add()', () => {
	beforeEach(reset);

	it('adds an insert', () => {
		add(testInsert);
		expect(all().includes(testInsert)).toBe(true);
	});
});

describe('remove()', () => {
	beforeEach(reset);

	it('removes an insert', () => {
		add(testInsert);
		remove(testInsert);
		expect(all().includes(testInsert)).toBe(false);
	});

	it("doesn't throw an error if the insert wasn't added", () =>
		expect(() => remove(testInsert)).not.toThrow());
});
