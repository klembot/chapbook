const {expect} = require('chai');
const {spy} = require('sinon');
const Renderer = require('./renderer');

describe('template renderer', () => {
	class TestDirective {
		process(src, opts) {
			src.beforeText = '*test-start*';
			src.text = src.text.toUpperCase();
			src.afterText = '*test-end*';
			opts.addWarning('A test warning');
			opts.addError('A test error');
		}
	}

	const directiveInput = {
		blocks: [
			{type: 'directive', content: 'test'},
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

	it('sets props on the window object', () => {
		const input = {
			props: {foo: '"hello"'},
			blocks: []
		};

		renderer.render(input);
		expect(window.foo).to.exist;
	});

	it('evaluates prop values', () => {
		const input = {
			props: {foo: '2 + 2'},
			blocks: []
		};

		renderer.render(input);
		expect(window.foo).to.equal(4);
	});

	it('ignores a lack of props', () => {
		expect(renderer.render({blocks: []})).to.not.throw;
	});

	it('ignores a lack of blocks', () => {
		expect(renderer.render({props: {}})).to.not.throw;
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

	it('allows adding directives', () => {
		renderer.addDirective('test', /.*/, TestDirective);
		expect(renderer.directives.length).to.equal(1);
	});

	it('allows removing directives', () => {
		renderer.addDirective('test', /.*/, TestDirective);
		renderer.removeDirective('test');
		expect(renderer.directives.length).to.equal(0);
	});

	it('throws an error if a directive is added repeatedly', () => {
		renderer.addDirective('test', /.*/, TestDirective);
		expect(() => renderer.addDirective('test', /.*/, TestDirective)).to.throw;
	});

	it('throws an error if a nonexistent directive is requested to be removed', () => {
		expect(() => renderer.removeDirective('test')).to.throw;
	});

	it('warns about unknown directives', () => {
		const result = renderer.render(directiveInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.contain('No directives matched "[test]"');
	});

	it('warns about directive blocks that match more than one directive', () => {
		renderer.addDirective('test', /test/, TestDirective);
		renderer.addDirective('test2', /test/, TestDirective);

		const result = renderer.render(directiveInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.contain('More than one directive matched "[test]"');
	});

	it('passes text through a directive\'s process method', () => {
		let processSpy = spy();

		class SpyDirective {
			process(src) {
				processSpy(src);
			}
		}

		renderer.addDirective('test', /test/, SpyDirective);
		renderer.render(directiveInput);
		expect(processSpy.calledOnce);
		expect(processSpy.args[0][0].text).to.equal('Hello world');
	});

	it('persists changes made to the text by a directive', () => {
		renderer.addDirective('test', /test/, TestDirective);

		const result = renderer.render(directiveInput);

		expect(result.markdown).to.equal('*test-start*HELLO WORLD*test-end*');
	});

	it('allows directives to raise warnings', () => {
		renderer.addDirective('test', /test/, TestDirective);

		const result = renderer.render(directiveInput);

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.equal('A test warning');
	});

	it('allows directives to raise errors', () => {
		renderer.addDirective('test', /test/, TestDirective);

		const result = renderer.render(directiveInput);

		expect(result.errors.length).to.equal(1);
		expect(result.errors[0]).to.equal('A test error');
	});

	it('uses the same directive instance across multiple directive invocations', () => {
		let processCalls = [];

		class InstanceDirective {
			process() {
				processCalls.push(this);
			}
		}

		renderer.addDirective('test', /test/, InstanceDirective);
		renderer.render({
			blocks: [
				{type: 'directive', content: 'test'},
				{type: 'text', content: 'Hello world'},
				{type: 'directive', content: 'test'},
				{type: 'text', content: 'Hello world'}
			]
		});

		expect(processCalls.length).to.equal(2);
		expect(processCalls[0]).to.equal(processCalls[1]);
	});

	it('does not reuse a directive instance across multiple renderings', () => {
		let processCalls = [];

		class InstanceDirective {
			process() {
				processCalls.push(this);
			}
		}

		renderer.addDirective('test', /test/, InstanceDirective);
		renderer.render(directiveInput);
		renderer.render(directiveInput);

		expect(processCalls.length).to.equal(2);
		expect(processCalls[0]).to.not.equal(processCalls[1]);
	});

	it('resets directives after a text block', () => {
		let processSpy = spy();

		class SpyDirective {
			process(src) {
				processSpy(src);
			}
		}

		renderer.addDirective('test', /test/, SpyDirective);
		renderer.render({
			blocks: [
				{type: 'directive', content: 'test'},
				{type: 'text', content: 'Hello world'},
				{type: 'text', content: 'Hello world again'},
			]
		});
		expect(processSpy.calledOnce);
	});
});