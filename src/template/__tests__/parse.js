import parse from '../parse';

describe('parse()', () => {
	test('returns an object with vars and blocks properties', () => {
		const result = parse('hello');

		expect(typeof result).toBe('object');
		expect(typeof result.vars).toBe('object');
	});

	test('creates functions for vars', () => {
		const result = parse("foo: 2\nbar: 'red'\nbaz: true\n--\n");

		expect(typeof result.vars.foo).toBe('function');
		expect(typeof result.vars.bar).toBe('function');
		expect(typeof result.vars.baz).toBe('function');
	});

	test('ignores empty lines in the vars section', () => {
		const result = parse('foo: 2\n  \n\t\nbar: 3\n--\n');

		expect(typeof result.vars.foo).toBe('function');
		expect(typeof result.vars.bar).toBe('function');
	});

	test.skip('warns about repeated vars', () => {
		const result = parse('foo: 2\n foo: 3\n--\n');

		expect(result.warnings.length).toBe(1);
		expect(result.warnings[0]).toMatch(/defined more than once/);
		expect(result.vars.foo).toBe('3');
	});

	test.skip('warns about malformed lines in vars', () => {
		const result = parse('hello there\n--\n');

		expect(result.warnings.length).toBe(1);
		expect(result.warnings[0]).toMatch(/missing a colon/);
	});

	test('parses a bare text block correctly', () => {
		const result = parse('Hello world');

		expect(result.blocks).toEqual([{type: 'text', content: 'Hello world'}]);
	});

	test('preserves newlines in text blocks', () => {
		const src = 'Hello world\nThis is a new line\rAnd a second line';
		const result = parse(src);

		expect(result.blocks).toEqual([{type: 'text', content: src}]);
	});

	test('trims whitespace before and after text blocks', () => {
		const result = parse('\n \n \rHello world   \n ');

		expect(result.blocks).toEqual([{type: 'text', content: 'Hello world'}]);
	});

	test('parses a modifier correctly', () => {
		const result = parse('[hello world]');

		expect(result.blocks).toEqual([
			{type: 'modifier', content: 'hello world'}
		]);
	});

	test('ignores bracketed phrases inside text blocks', () => {
		const src =
			'Hello [world]\n[This is a left bracket but not a right one\n[this]: is a Markdown link\n';
		const result = parse(src);

		expect(result.blocks).toEqual([{type: 'text', content: src.trim()}]);
	});

	test('ignores [[bracketed links]] on a line by themselves', () => {
		const src = '[[This is a link not a modifier]]\n';
		const result = parse(src);

		expect(result.blocks).toEqual([{type: 'text', content: src.trim()}]);
	});

	test('parses mixtures of text blocks and modifiers correctly', () => {
		const result = parse(
			'This is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally...'
		);

		expect(result.blocks).toEqual([
			{type: 'text', content: 'This is a text block.'},
			{type: 'modifier', content: 'hello'},
			{type: 'text', content: 'And another block.'},
			{type: 'modifier', content: 'hello again'},
			{type: 'text', content: 'Finally...'}
		]);
	});

	test('parses mixtures of vars, text blocks, and modifiers correctly', () => {
		const result = parse(
			"foo: 1\nbar: 'red'\n--\nThis is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally..."
		);

		expect(typeof result.vars.foo).toBe('function');
		expect(typeof result.vars.bar).toBe('function');
		expect(result.blocks).toEqual([
			{type: 'text', content: 'This is a text block.'},
			{type: 'modifier', content: 'hello'},
			{type: 'text', content: 'And another block.'},
			{type: 'modifier', content: 'hello again'},
			{type: 'text', content: 'Finally...'}
		]);
	});

	test('allows multiple modifiers to be joined with a semicolon', () => {
		const result = parse(
			'This is a text block.\n[hello; hello]\nAnd another block.'
		);

		expect(result.blocks).toEqual([
			{type: 'text', content: 'This is a text block.'},
			{type: 'modifier', content: 'hello'},
			{type: 'modifier', content: 'hello'},
			{type: 'text', content: 'And another block.'}
		]);
	});

	test('ignores semicolons inside quoted phrases inside a modifier', () => {
		const result = parse(
			'This is a text block.\n[hello "I wonder;"; hello]\nAnd another block.'
		);

		expect(result.blocks).toEqual([
			{type: 'text', content: 'This is a text block.'},
			{type: 'modifier', content: 'hello "I wonder;"'},
			{type: 'modifier', content: 'hello'},
			{type: 'text', content: 'And another block.'}
		]);
	});

	test('handles escaped quotation marks inside compound modifiers correctly', () => {
		const result = parse(
			'This is a text block.\n[hello "I \\"wonder\\";"; hello]\nAnd another block.'
		);

		expect(result.blocks).toEqual([
			{type: 'text', content: 'This is a text block.'},
			{type: 'modifier', content: 'hello "I \\"wonder\\";"'},
			{type: 'modifier', content: 'hello'},
			{type: 'text', content: 'And another block.'}
		]);
	});

	// TODO: allows modifying the varsSep property
	// TODO: allows modifying the modifierPattern property
});
