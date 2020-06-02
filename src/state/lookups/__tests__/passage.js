import * as state from '../../index';
import event from '../../../event';
import initPassage from '../passage';

/*
These tests pollute the window variable, and in general require some care
because they run in parallel.
*/

beforeAll(() => {
	initPassage(state.setLookup);
});

afterEach(() => {
	state.reset();
	delete window.lookup;
	delete window.state;
	delete window.nestedLookup;
	delete window.nestedState;
	event.removeAllListeners('state-change');
});

describe('passage.name', () => {
	it('is the last item in `trail`', () => {
		state.set('trail', ['First', 'Second', 'Third']);
		expect(state.get('passage.name')).toBe('Third');
	});
});

describe('passage.visits', () => {
	it('is the number of occurrences of `passage.name` in `trail`', () => {
		state.set('trail', ['First', 'Second', 'Third']);
		expect(state.get('passage.visits')).toBe(1);
	});
});

describe('passage.previous', () => {
	it('is the next-to-last item in `trail`', () => {
		state.set('trail', ['First', 'Second', 'Third']);
		expect(state.get('passage.previous')).toBe('Second');
	});
	it('is undefined when `trail` length is less than 2', () => {
		state.set('trail', ['First']);
		expect(state.get('passage.previous')).toBe(undefined);
	});
});
