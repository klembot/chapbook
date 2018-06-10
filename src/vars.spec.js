import test from 'ava';
import {spy} from 'sinon';
import Vars from './vars';

let vars;

test.beforeEach(t => {
	vars = new Vars('test');

	if (typeof window.foo === 'object') {
		window.foo = undefined;
	}

	delete window.foo;
});

test('sets a value that can retrieved later', t => {
	vars.set('test', 1);
	t.is(vars.get('test'), 1);
});

test('can set deep keys', t => {
	vars.set('foo.bar.baz', 1);
	t.is(vars.get('foo.bar.baz'), 1);
});

test('preserves existing deep keys', t => {
	vars.set('foo.bar.baz', 1);
	vars.set('foo.bar.quux', 2);
	t.is(vars.get('foo.bar.baz'), 1);
	t.is(vars.get('foo.bar.quux'), 2);
});

test('allows default values', t => {
	vars.set('foo', 1);
	vars.default('foo', 2);
	t.is(vars.get('foo'), 1);

	vars.set('foo', undefined);
	vars.default('foo', 2);
	t.is(vars.get('foo'), 2);

	vars.set('foo', null);
	vars.default('foo', 2);
	t.is(vars.get('foo'), 2);

	vars.set('foo', false);
	vars.default('foo', 2);
	t.is(vars.get('foo'), false);
});

test('preserves defaults even after a value has been set', t => {
	vars.default('foo', 2);
	vars.set('foo', 1);
	vars.set('foo', undefined);
	t.is(vars.get('foo'), 2);
});

test('persists keys', t => {
	vars.set('foo', 1);
	vars.restore();
	t.is(vars.get('foo'), 1);
});

test('proxies keys onto the window object', t => {
	vars.set('foo', 1);
	t.is(window.foo, 1);
	window.foo = 2;
	t.is(window.foo, 2);
	t.is(vars.get('foo'), 2);
});

test('proxies deep keys onto the window object', t => {
	vars.set('foo.bar.baz', 1);
	t.is(window.foo.bar.baz, 1);
	window.foo.bar.baz = 2;
	t.is(window.foo.bar.baz, 2);
	t.is(vars.get('foo.bar.baz'), 2);
});

test('allows listeners on a key', t => {
	let listener = spy();

	vars.addListener('foo', listener);
	vars.set('foo', 1);
	t.true(listener.calledOnce);
	t.true(listener.calledWith('foo', 1, undefined, vars));
});

test('reports previous values of a key to listeners', t => {
	let listener = spy();

	vars.set('foo', 1);
	vars.addListener('foo', listener);
	vars.set('foo', 2);
	t.true(listener.calledOnce);
	t.true(listener.calledWith('foo', 2, 1, vars));
});

test('notifies listeners of subproperties', t => {
	let listener = spy();

	vars.addListener('foo', listener);
	vars.set('foo.bar.baz', 1);
	t.true(listener.calledWith('foo.bar.baz', 1, undefined, vars));
});

test('allows wildcard listeners', t => {
	let listener = spy();

	vars.addListener('*', listener);
	vars.set('foo', 1);
	vars.set('bar', 2);
	t.true(listener.calledWith('foo', 1, undefined, vars));
	t.true(listener.calledWith('bar', 2, undefined, vars));
});

test('deletes all state with forgetAll()', t => {
	vars.set('foo', 1);
	vars.forgetAll();
	t.is(vars.get('foo'), undefined);
});
