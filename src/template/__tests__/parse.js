import parse from '../parse';

describe('parse()', () => {
	let warnSpy;

	beforeEach(() => {
		warnSpy = jest.spyOn(global.console, 'warn');
		warnSpy.mockImplementation(() => {});
	});

	afterEach(() => warnSpy.mockRestore());

	test('returns an object with vars and blocks properties', () => {
		const result = parse('hello');

		expect(typeof result).toBe('object');
		expect(typeof result.vars).toBe('object');
	});

	test('parses var names', () => {
		const result = parse("foo: 2\nbar: 'red'\nBAZ: true\n--\n");

		expect(result.vars[0].name).toEqual('foo');
		expect(result.vars[1].name).toEqual('bar');
		expect(result.vars[2].name).toEqual('BAZ');
	});

	test('allows setting the same variable multiple times', () => {
		const result = parse("foo: 2\nfoo: 'red'\n--\n");

		expect(result.vars[0].name).toEqual('foo');
		expect(result.vars[1].name).toEqual('foo');
	});

	test('creates functions for vars', () => {
		const result = parse("foo: 2\nbar: 'red'\nbaz: true\n--\n");

		expect(result.vars.length).toBe(3);

		result.vars.forEach(v => {
			expect(typeof v.value).toBe('function');
		});
	});

	test('parses var conditions', () => {
		const result = parse(
			"foo: 2\nbar(true): 'red'\nbaz (1 + 1 === 2 && 'a' < 'b') : true\n--\n"
		);

		expect(result.vars[0].name).toBe('foo');
		expect(result.vars[0].condition).toBe(undefined);
		expect(result.vars[1].name).toBe('bar');
		expect(typeof result.vars[1].condition).toBe('function');
		expect(result.vars[2].name).toBe('baz');
		expect(typeof result.vars[2].condition).toBe('function');
	});

	test('ignores empty lines in the vars section', () => {
		const result = parse('foo: 2\n  \n\t\nbar: 3\n--\n');

		expect(result.vars.length).toBe(2);
	});

	test('warns about malformed lines in vars', () => {
		parse('hello there\n--\n');

		expect(warnSpy.mock.calls.length).toBe(1);
		expect(warnSpy.mock.calls[0][0]).toMatch(/missing a colon/);
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

		expect(result.blocks).toEqual([{type: 'modifier', content: 'hello world'}]);
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

		expect(result.vars[0].name).toBe('foo');
		expect(typeof result.vars[0].value).toBe('function');
		expect(result.vars[1].name).toBe('bar');
		expect(typeof result.vars[1].value).toBe('function');
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
