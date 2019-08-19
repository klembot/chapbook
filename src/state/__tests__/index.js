import * as state from '../index';
import event from '../../event';

afterEach(() => {
	state.reset();
	delete window.color;
	event.removeAllListeners('state-change');
});

describe('state', () => {
	it('sets variables', () => {
		state.set('color', 'red');
		expect(state.get('color')).toBe('red');
	});

	it('allows nested variables', () => {
		state.set('foo.bar.one', 'red');
		state.set('foo.bar.two', 'green');
		expect(state.get('foo.bar.one')).toBe('red');
		expect(state.get('foo.bar.two')).toBe('green');
		expect(state.get('foo.bar')).toEqual({one: 'red', two: 'green'});
	});

	// FIXME
	// Not clear why it isn't working in Jest, but it does work in a browser.

	it.skip('adds global proxies for variables', () => {
		state.set('color', 'red');
		expect(window.color).toBe('red');
		window.color = 'green';
		expect(state.get('color')).toBe('green');
	});

	it('tests variable names with sameObject()', () => {
		expect(state.sameObject('foo', 'foo')).toBe(true);
		expect(state.sameObject('foo', 'oo')).toBe(false);
		expect(state.sameObject('foo.bar', 'foo')).toBe(true);
		expect(state.sameObject('foo.bar', 'bar')).toBe(false);
		expect(state.sameObject('foo.bar', 'o.bar')).toBe(false);
		expect(state.sameObject('foo.bar', '.bar')).toBe(false);
		expect(state.sameObject('foo.bar', 'foo.bar')).toBe(true);
		expect(state.sameObject('foo.bar.baz', 'bar')).toBe(false);
		expect(state.sameObject('foo.bar.baz', 'foo.bar')).toBe(true);
		expect(state.sameObject('foo.bar.baz', 'bar.baz')).toBe(false);
		expect(state.sameObject('foo.bar.baz', 'foo.bar.baz')).toBe(true);
	});

	it('defaults variables', () => {
		expect(state.get('color')).toBe(undefined);
		state.setDefault('color', 'red');
		expect(state.get('color')).toBe('red');
	});

	it('adds lookup variables', () => {
		state.setLookup('test', () => {
			return 'test passed';
		});

		expect(state.get('test')).toBe('test passed');
	});

	it('generates state-change events when setting a variable', () => {
		const spy = jest.fn();
		const name = 'a' + Math.round(Math.random() * 1000);

		event.on('state-change', spy);
		state.set(name, 'blue');

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({name, value: 'blue'});
	});

	it('generates state-change events when defaulting a variable', () => {
		const spy = jest.fn();
		const name = 'a' + Math.round(Math.random() * 1000);

		event.on('state-change', spy);
		state.setDefault(name, 'blue');

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({name, value: 'blue'});
	});

	it('resets variables but not defaults when resetting', () => {
		state.set('foo', true);
		state.setDefault('bar', 'a');
		state.set('bar', 'b');
		state.set('baz', [1, 2, 3]);
		state.reset();
		expect(state.get('foo')).toBe(undefined);
		expect(state.get('bar')).toBe('a');
		expect(state.get('baz')).toBe(undefined);
	});

	it('saves and restores to objects', () => {
		state.set('color', 'blue');

		const saved = state.saveToObject();

		state.reset();
		state.restoreFromObject(saved);
		expect(state.get('color')).toBe('blue');
	});

	it('saves to separate objects each time', () => {
		state.set('color', 'blue');

		const saved1 = state.saveToObject();
		const saved2 = state.saveToObject();

		expect(saved1 === saved2).toBe(false);
	});

	it('saves and restores to local storage', () => {
		state.set('color', 'purple');
		state.saveToStorage();
		state.restoreFromStorage();
		expect(state.get('color')).toBe('purple');
	});

	it('does not persist lookup variables', () => {
		state.setLookup('test', () => 'test passed');
		expect(state.saveToObject().test).toBe(undefined);
	});
});
