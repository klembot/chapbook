import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {
	get,
	reset,
	restoreFromObject,
	restoreFromStorage,
	saveToObject,
	saveToStorage,
	set,
	setDefault,
	setLookup,
	varNames
} from '../state';
import {mute, unmute} from '../../logger';

// Turn off logging messages.

beforeAll(() => mute('state'));
afterAll(() => unmute('state'));

// These tests pollute the window variable, and in general require some care
// because they run in parallel. They use different state variable names so that
// they don't interfere with each other.

afterEach(() => {
	reset();
	/* eslint-disable @typescript-eslint/no-explicit-any */
	delete (window as any).lookup;
	delete (window as any).state;
	delete (window as any).nestedLookup;
	delete (window as any).nestedState;
	/* eslint-enable @typescript-eslint/no-explicit-any */
});

describe('get', () => {
	beforeEach(reset);

	it('returns a previously-set value', () => {
		set('setVariable', true);
		expect(get('setVariable')).toBe(true);
	});

	it('returns the default value if no value was previously set', () => {
		setDefault('defaultVariable', true);
		expect(get('defaultVariable')).toBe(true);
	});

	it('ignores the default if a value has been set', () => {
		set('conflictingVariable', true);
		setDefault('conflictingVariable', false);
		expect(get('conflictingVariable')).toBe(true);
	});

	it('merges together set values and defaults in objects', () => {
		set('mergedVariable', {foo: true});
		setDefault('mergedVariable', {bar: true});
		expect(get('mergedVariable')).toEqual({bar: true, foo: true});
	});

	it("doesn't merge together set values and defaults in arrays", () => {
		set('mergedArray', [1, 2, 3]);
		setDefault('mergedArray', [4, 5, 6]);
		expect(get('mergedArray')).toEqual([1, 2, 3]);
	});
});

describe('reset', () => {
	it('resets variables', () => {
		set('foo', true);
		set('bar', [1, 2, 3]);
		reset();
		expect(get('foo')).toBe(undefined);
		expect(get('bar')).toBe(undefined);
	});

	it("doesn't reset defaults", () => {
		setDefault('foo', 'pass');
		set('foo', 'fail');
		reset();
		expect(get('foo')).toBe('pass');
	});
});

describe('saveToObject', () => {
	it('returns an object that restoreFromObject() will restore', () => {
		set('color', 'blue');

		const saved = saveToObject();

		reset();
		restoreFromObject(saved);
		expect(get('color')).toBe('blue');
	});

	it("doesn't persist lookups", () => {
		setLookup('test', () => 'test passed');
		expect(saveToObject().test).toBe(undefined);
	});

	it('saves to separate objects each time', () => {
		set('color', 'blue');

		const saved1 = saveToObject();
		const saved2 = saveToObject();

		expect(saved1 === saved2).toBe(false);
	});
});

describe('saveToStorage', () => {
	it('saves values in local storage that restoreFromStorage() will restore', () => {
		set('color', 'purple');
		saveToStorage();
		reset();
		restoreFromStorage();
		expect(get('color')).toBe('purple');
	});
});

describe('set', () => {
	it('sets variables', () => {
		set('state', 'red');
		expect(get('state')).toBe('red');
	});

	it('allows nested variables', () => {
		set('nestedState.foo.one', 'red');
		set('nestedState.foo.two', 'green');
		expect(get('nestedState.foo.one')).toBe('red');
		expect(get('nestedState.foo.two')).toBe('green');
		expect(get('nestedState.foo')).toEqual({one: 'red', two: 'green'});
	});

	it('adds global proxies for variables', () => {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		expect((window as any).state).toBeUndefined();
		set('state', 'red');
		expect((window as any).state).toBe('red');
		(window as any).state = 'green';
		expect(get('state')).toBe('green');
		/* eslint-enable @typescript-eslint/no-explicit-any */
	});

	it('sets nested global proxies for variables', () => {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		expect((window as any).nestedState).toBeUndefined();
		set('nestedState.foo', 'red');
		expect((window as any).nestedState.foo).toBe('red');
		expect((window as any).nestedState).toEqual({foo: 'red'});
		/* eslint-enable @typescript-eslint/no-explicit-any */
	});

	it('dispatches a state-change event on the window', () => {
		const listener = vi.fn();
		const name = 'a' + Math.round(Math.random() * 1000);

		window.addEventListener('state-change', listener);
		expect(listener).not.toBeCalled();
		set(name, 'blue');
		set(name, 'green');
		expect(listener).toHaveBeenCalledTimes(2);
		expect(listener.mock.calls[0][0].detail).toEqual({name, value: 'blue'});
		expect(listener.mock.calls[1][0].detail).toEqual({
			name,
			previous: 'blue',
			value: 'green'
		});
	});
});

describe('setDefault', () => {
	it('defaults variables', () => {
		expect(get('color')).toBe(undefined);
		setDefault('color', 'red');
		expect(get('color')).toBe('red');
	});

	it('dispatches a state-change event on the window', () => {
		const listener = vi.fn();
		const name = 'a' + Math.round(Math.random() * 1000);

		window.addEventListener('state-change', listener);
		expect(listener).not.toBeCalled();
		setDefault(name, 'blue');
		expect(listener).toHaveBeenCalledTimes(1);
		expect(listener.mock.calls[0][0].detail).toEqual({name, value: 'blue'});
	});
});

describe('setLookup', () => {
	it('adds lookup variables', () => {
		setLookup('lookup', () => 'red');
		expect(get('lookup')).toBe('red');
	});

	it('sets global proxies for lookup variables', () => {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		expect((window as any).lookup).toBeUndefined();
		expect((window as any).nestedLookup).toBeUndefined();
		setLookup('lookup', () => 'green');
		setLookup('nestedLookup.foo', () => 'blue');
		expect((window as any).lookup).toBe('green');
		expect((window as any).nestedLookup.foo).toBe('blue');
		/* eslint-enable @typescript-eslint/no-explicit-any */
	});
});

describe('varNames', () => {
	it('returns all variables in alphabetical order', () => {
		set('state', true);
		set('color', 'red');
		expect(varNames()).toEqual(['color', 'state']);
	});

	it('omits defaults', () => {
		set('state', true);
		setDefault('color', 'red');
		expect(varNames()).toEqual(['state']);
	});
});
