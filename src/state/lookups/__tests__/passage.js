import * as state from '../../index';
import initPassage from '../passage';

jest.mock('../../index');

let lookups;

const lookup = (name) => lookups[name]();

const setLookup = (name, callback) => {
	lookups[name] = callback;
};

beforeEach(() => {
	lookups = {};
});

afterEach(() => {
	state.get.mockReset();
});

describe('passage.name', () => {
	it('is the last item in `trail` (length 1)', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.name')).toBe('a');
	});

	it('is the last item in `trail` (length 2)', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.name')).toBe('b');
	});

	it('is the last item in `trail` (length 3)', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b', 'c']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.name')).toBe('c');
	});
});

describe('passage.visits', () => {
	it('is the number of occurrences (1) of `passage.name` in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'passage.name': 'a',
				'trail': ['a', 'b', 'c']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.visits')).toBe(1);
	});

	it('is the number of occurrences (2) of `passage.name` in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'passage.name': 'a',
				'trail': ['a', 'b', 'a']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.visits')).toBe(2);
	});

	it('is the number of occurrences (0) of `passage.name` in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'passage.name': 'a',
				'trail': ['c', 'b', 'c']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.visits')).toBe(0);
	});
});

describe('passage.previous.name', () => {
	it('is the next-to-last item in `trail` (length 2)', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.name')).toBe('a');
	});

	it('is the next-to-last item in `trail` (length 3)', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b', 'c']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.name')).toBe('b');
	});

	it('is undefined when there is only one item in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.name')).toBe(undefined);
	});
});

describe('passage.previous.visits', () => {
	it('is the number of occurrences (1) of the next-to-last item in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.visits')).toBe(1);
	});

	it('is the number of occurrences (2) of the next-to-last item in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a', 'b', 'a', 'c']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.visits')).toBe(2);
	});

	it('is zero when there is only one item in `trail`', () => {
		state.get.mockImplementation((property) => {
			return {
				'trail': ['a']
			}[property];
		});
		initPassage(setLookup);
		expect(lookup('passage.previous.visits')).toBe(0);
	});
});
