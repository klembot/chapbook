import {expect} from 'chai';
import {spy} from 'sinon';
import Vars from './vars';

describe('vars', () => {
	let vars;

	beforeEach(() => {
		vars = new Vars('test');

		if (typeof window.foo === 'object') {
			window.foo = undefined;
		}

		delete window.foo;
	});

	it('sets a value that can retrieved later', () => {
		vars.set('test', 1);
		expect(vars.get('test')).to.equal(1);
	});

	it('can set deep keys', () => {
		vars.set('foo.bar.baz', 1);
		expect(vars.get('foo.bar.baz')).to.equal(1);
	});

	it('preserves existing deep keys', () => {
		vars.set('foo.bar.baz', 1);
		vars.set('foo.bar.quux', 2);
		expect(vars.get('foo.bar.baz')).to.equal(1);
		expect(vars.get('foo.bar.quux')).to.equal(2);
	});

	it('allows default values', () => {
		vars.set('foo', 1);
		vars.default('foo', 2);
		expect(vars.get('foo')).to.equal(1);

		vars.set('foo', undefined);
		vars.default('foo', 2);
		expect(vars.get('foo')).to.equal(2);

		vars.set('foo', null);
		vars.default('foo', 2);
		expect(vars.get('foo')).to.equal(2);

		vars.set('foo', false);
		vars.default('foo', 2);
		expect(vars.get('foo')).to.equal(false);
	});

	it('preserves defaults even after a value has been set', () => {
		vars.default('foo', 2);
		vars.set('foo', 1);
		vars.set('foo', undefined);
		expect(vars.get('foo')).to.equal(2);
	});

	it('persists keys', () => {
		vars.set('foo', 1);
		vars.restore();
		expect(vars.get('foo')).to.equal(1);
	});

	it('proxies keys onto the window object', () => {
		vars.set('foo', 1);
		expect(window.foo).to.equal(1);
		window.foo = 2;
		expect(window.foo).to.equal(2);
		expect(vars.get('foo')).to.equal(2);
	});

	it('proxies deep keys onto the window object', () => {
		vars.set('foo.bar.baz', 1);
		expect(window.foo.bar.baz).to.equal(1);
		window.foo.bar.baz = 2;
		expect(window.foo.bar.baz).to.equal(2);
		expect(vars.get('foo.bar.baz')).to.equal(2);
	});

	it('allows listeners on a key', () => {
		let listener = spy();

		vars.addListener('foo', listener);
		vars.set('foo', 1);
		expect(listener.calledOnce);
		expect(listener.calledWith('foo', 1, undefined, vars));
	});

	it('reports previous values of a key to listeners', () => {
		let listener = spy();

		vars.set('foo', 1);
		vars.addListener('foo', listener);
		vars.set('foo', 2);
		expect(listener.calledOnce);
		expect(listener.calledWith('foo', 2, 1, vars));
	});

	it('notifies listeners of subproperties', () => {
		let listener = spy();

		vars.addListener('foo', listener);
		vars.set('foo.bar.baz', 1);
		expect(listener.calledWith('foo.bar.baz', 1, undefined, vars));
	});

	it('allows wildcard listeners', () => {
		let listener = spy();

		vars.addListener('*', listener);
		vars.set('foo', 1);
		vars.set('bar', 2);
		expect(listener.calledWith('foo', 1, undefined, vars));
		expect(listener.calledWith('bar', 2, undefined, vars));
	});

	it('deletes all state with forgetAll()', () => {
		vars.set('foo', 1);
		vars.forgetAll();
		expect(vars.get('foo')).to.equal(undefined);
	});
});