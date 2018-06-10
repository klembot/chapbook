import test from 'ava';
import {spy} from 'sinon';
import Renderer from './renderer';

class TestModifier {
	setup() {}
	process(src, opts) {
		src.beforeText = '*test-start*';
		src.text = src.text.toUpperCase();
		src.afterText = '*test-end*';
		opts.addWarning('A test warning');
		opts.addError('A test error');
	}
}

TestModifier.regexps = [/^test/i];

const modifierInput = {
	blocks: [
		{type: 'modifier', content: 'test'},
		{type: 'text', content: 'Hello world'}
	]
};

let renderer;

test.beforeEach(() => {
	renderer = new Renderer();
	renderer.alarm = {update: () => {}};
});

test('sets vars', t => {
	let setSpy = spy();
	const input = {
		vars: {foo: '"hello"'},
		blocks: []
	};

	renderer.vars = {set: setSpy};
	renderer.render(input);
	t.true(setSpy.calledOnce);
	t.true(setSpy.calledWith('foo', 'hello'));
});

test('evaluates var values', t => {
	let setSpy = spy();
	const input = {
		vars: {foo: '2 + 2'},
		blocks: []
	};

	renderer.vars = {set: setSpy};
	renderer.render(input);
	t.true(setSpy.calledWith('foo', 4));
});

test('handles var names with dots', t => {
	let setSpy = spy();
	const input = {
		vars: {'foo.bar.baz': 1}
	};

	renderer.vars = {set: setSpy};
	renderer.render(input);
	t.true(setSpy.calledWith('foo.bar.baz', 1));
});

test('ignores a lack of vars', t => {
	t.notThrows(() => renderer.render({blocks: []}));
});

test('ignores a lack of blocks', t => {
	t.notThrows(() => renderer.render({vars: {}}));
});

test('renders text blocks to HTML', t => {
	const result = renderer.render({
		blocks: [{type: 'text', content: 'Hello world.\n\nThis is me.'}]
	});

	t.is(result.html, '<p>Hello world.</p>\n<p>This is me.</p>\n');
});

test('renders consecutive text blocks to HTML', t => {
	const result = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello world.'},
			{type: 'text', content: 'This is me.'}
		]
	});

	t.is(result.html, '<p>Hello world.</p>\n<p>This is me.</p>\n');
});

test('allows adding modifiers', t => {
	renderer.addModifier('test', TestModifier);
	t.is(renderer.modifiers.length, 1);
});

test('allows removing modifiers', t => {
	renderer.addModifier('test', TestModifier);
	renderer.removeModifier('test');
	t.is(renderer.modifiers.length, 0);
});

test('throws an error if a modifier is added repeatedly', t => {
	renderer.addModifier('test', TestModifier);
	t.throws(() => renderer.addModifier('test', TestModifier));
});

test('throws an error if a nonexistent modifier is requested to be removed', t => {
	t.throws(() => renderer.removeModifier('test'));
});

test('warns about unknown modifiers', t => {
	const result = renderer.render(modifierInput);

	t.is(result.warnings.length, 1);
	t.regex(result.warnings[0], /No modifiers matched "\[test\]"/);
});

test('warns about modifier blocks that match more than one modifier', t => {
	renderer.addModifier('test', TestModifier);
	renderer.addModifier('test2', TestModifier);

	const result = renderer.render(modifierInput);

	t.is(result.warnings.length, 1);
	t.regex(result.warnings[0], /More than one modifier matched "\[test\]"/);
});

test("passes text through a modifier's process method", t => {
	let processSpy = spy();

	class SpyModifier {
		setup() {}
		process(src) {
			processSpy(src);
		}
	}

	SpyModifier.regexps = [/^test/];

	renderer.addModifier('test', SpyModifier);
	renderer.render(modifierInput);
	t.true(processSpy.calledOnce);
	t.is(processSpy.args[0][0].text, 'Hello world');
});

test('persists changes made to the text by a modifier', t => {
	renderer.addModifier('test', TestModifier);

	const result = renderer.render(modifierInput);

	t.is(result.markdown, '*test-start*HELLO WORLD*test-end*');
});

test('allows modifiers to raise warnings', t => {
	renderer.addModifier('test', TestModifier);

	const result = renderer.render(modifierInput);

	t.is(result.warnings.length, 1);
	t.is(result.warnings[0], 'A test warning');
});

test('allows modifiers to raise errors', t => {
	renderer.addModifier('test', TestModifier);

	const result = renderer.render(modifierInput);

	t.is(result.errors.length, 1);
	t.is(result.errors[0], 'A test error');
});

test('uses the same modifier instance across multiple modifier invocations', t => {
	let processCalls = [];

	class InstanceModifier {
		setup() {}
		process() {
			processCalls.push(this);
		}
	}

	InstanceModifier.regexps = [/test/];

	renderer.addModifier('test', InstanceModifier);
	renderer.render({
		blocks: [
			{type: 'modifier', content: 'test'},
			{type: 'text', content: 'Hello world'},
			{type: 'modifier', content: 'test'},
			{type: 'text', content: 'Hello world'}
		]
	});

	t.is(processCalls.length, 2);
	t.is(processCalls[0], processCalls[1]);
});

test('does not reuse a modifier instance across multiple renderings', t => {
	let processCalls = [];

	class InstanceModifier {
		setup() {}
		process() {
			processCalls.push(this);
		}
	}

	InstanceModifier.regexps = [/test/];

	renderer.addModifier('test', InstanceModifier);
	renderer.render(modifierInput);
	renderer.render(modifierInput);

	t.is(processCalls.length, 2);
	t.not(processCalls[0], processCalls[1]);
});

test('resets modifiers after a text block', t => {
	let processSpy = spy();

	class SpyModifier {
		setup() {}
		process(src) {
			processSpy(src);
		}
	}

	SpyModifier.regexps = [/test/];

	renderer.addModifier('test', SpyModifier);
	renderer.render({
		blocks: [
			{type: 'modifier', content: 'test'},
			{type: 'text', content: 'Hello world'},
			{type: 'text', content: 'Hello world again'}
		]
	});
	t.true(processSpy.calledOnce);
});
