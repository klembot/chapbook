import {expect} from 'chai';
import {spy} from 'sinon';
import Renderer from './renderer';

describe('template renderer', () => {
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

	const cleanup = () => {
		if (window.foo) {
			delete window.foo;
		}
	};

	let renderer;

	beforeEach(() => {
		renderer = new Renderer();
		cleanup();
	});
	afterEach(cleanup);

	it('sets vars on the window object', () => {
		const input = {
			vars: {foo: '"hello"'},
			blocks: []
		};

		renderer.render(input);
		expect(window.foo).to.exist;
	});

	it('evaluates prop values', () => {
		const input = {
			vars: {foo: '2 + 2'},
			blocks: []
		};

		renderer.render(input);
		expect(window.foo).to.equal(4);
	});

	it('handles prop values with dots', () => {
		const input = {
			vars: {'foo.bar.baz': 1}
		};

		renderer.render(input);
		expect(window.foo.bar.baz).to.equal(1);
	})

	it('ignores a lack of vars', () => {
		expect(renderer.render({blocks: []})).to.not.throw;
	});

	it('ignores a lack of blocks', () => {
		expect(renderer.render({vars: {}})).to.not.throw;
	});

	it('renders text blocks to HTML', () => {
		const result = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello world.\n\nThis is me.'}
			]
		});

		expect(result.html).to.equal('<p>Hello world.</p>\n<p>This is me.</p>\n');
	});

	it('renders consecutive text blocks to HTML', () => {
		const result = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello world.'},
				{type: 'text', content: 'This is me.'}
			]
		});

		expect(result.html).to.equal('<p>Hello world.</p>\n<p>This is me.</p>\n');
	});

	it('allows adding modifiers', () => {
		renderer.addModifier('test', TestModifier);
		expect(renderer.modifiers.length).to.equal(1);
	});

	it('allows removing modifiers', () => {
		renderer.addModifier('test', TestModifier);
		renderer.removeModifier('test');
		expect(renderer.modifiers.length).to.equal(0);
	});

	it('throws an error if a modifier is added repeatedly', () => {
		renderer.addModifier('test', TestModifier);
		expect(() => renderer.addModifier('test', TestModifier)).to.throw;
	});

	it('throws an error if a nonexistent modifier is requested to be removed', () => {
		expect(() => renderer.removeModifier('test')).to.throw;
	});

	it('warns about unknown modifiers', () => {
		const result = renderer.render(modifierInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.contain('No modifiers matched "[test]"');
	});

	it('warns about modifier blocks that match more than one modifier', () => {
		renderer.addModifier('test', TestModifier);
		renderer.addModifier('test2', TestModifier);

		const result = renderer.render(modifierInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.contain('More than one modifier matched "[test]"');
	});

	it('passes text through a modifier\'s process method', () => {
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
		expect(processSpy.calledOnce);
		expect(processSpy.args[0][0].text).to.equal('Hello world');
	});

	it('persists changes made to the text by a modifier', () => {
		renderer.addModifier('test', TestModifier);

		const result = renderer.render(modifierInput);

		expect(result.markdown).to.equal('*test-start*HELLO WORLD*test-end*');
	});

	it('allows modifiers to raise warnings', () => {
		renderer.addModifier('test', TestModifier);

		const result = renderer.render(modifierInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.equal('A test warning');
	});

	it('allows modifiers to raise errors', () => {
		renderer.addModifier('test', TestModifier);

		const result = renderer.render(modifierInput);

		expect(result.errors.length).to.equal(1);
		expect(result.errors[0]).to.equal('A test error');
	});

	it('uses the same modifier instance across multiple modifier invocations', () => {
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

		expect(processCalls.length).to.equal(2);
		expect(processCalls[0]).to.equal(processCalls[1]);
	});

	it('does not reuse a modifier instance across multiple renderings', () => {
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

		expect(processCalls.length).to.equal(2);
		expect(processCalls[0]).to.not.equal(processCalls[1]);
	});

	it('resets modifiers after a text block', () => {
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
				{type: 'text', content: 'Hello world again'},
			]
		});
		expect(processSpy.calledOnce);
	});
});