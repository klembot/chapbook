import test from 'ava';
import renderer from './markdown-renderer';

test.beforeEach(() => {
	delete window.foo;
});

test.afterEach(() => {
	delete window.foo;
});

test('evaluates code inside backtick fences silently', t => {
	const result = renderer.code("\nwindow.foo = 'red';\n");

	t.is(result, '');
	t.is(window.foo, 'red');
});

test('interpolates JavaScript values inside backticks', t => {
	t.is(renderer.codespan('2 + 2'), '4');
});
