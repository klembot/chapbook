import test from 'ava';
import Parser from './parser';

let parser;

test.beforeEach(() => {
	parser = new Parser();
});

test('returns an object with vars, blocks, and warnings properties', t => {
	const result = parser.parse('hello');

	t.is(typeof result, 'object');
	t.is(typeof result.vars, 'object');
	t.true(Array.isArray(result.blocks));
	t.true(Array.isArray(result.warnings));
});

test('parses vars but does not evaluate expressions', t => {
	const result = parser.parse("foo: 2\nbar: 'red'\nbaz: true\n--\n");

	t.is(result.vars.foo, '2');
	t.is(result.vars.bar, "'red'");
	t.is(result.vars.baz, 'true');
});

test('ignores empty lines in the vars section', t => {
	const result = parser.parse('foo: 2\n  \n\t\nbar: 3\n--\n');

	t.is(result.vars.foo, '2');
	t.is(result.vars.bar, '3');
});

test('warns about repeated vars', t => {
	const result = parser.parse('foo: 2\n foo: 3\n--\n');

	t.is(result.warnings.length, 1);
	t.regex(result.warnings[0], /defined more than once/);
	t.is(result.vars.foo, '3');
});

test('warns about malformed lines in vars', t => {
	const result = parser.parse('hello there\n--\n');

	t.is(result.warnings.length, 1);
	t.regex(result.warnings[0], /missing a colon/);
});

test('parses a bare text block correctly', t => {
	const result = parser.parse('Hello world');

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'Hello world');
});

test('preserves newlines in text blocks', t => {
	const src = 'Hello world\nThis is a new line\rAnd a second line';
	const result = parser.parse(src);

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, src);
});

test('trims whitespace before and after text blocks', t => {
	const result = parser.parse('\n \n \rHello world   \n ');

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'Hello world');
});

test('parses a modifier correctly', t => {
	const result = parser.parse('[hello world]');

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'modifier');
	t.is(result.blocks[0].content, 'hello world');
});

test('ignores bracketed phrases inside text blocks', t => {
	const src =
		'Hello [world]\n[This is a left bracket but not a right one\n[this]: is a Markdown link\n';
	const result = parser.parse(src);

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, src.trim());
});

test('ignores [[bracketed links]] on a line by themselves', t => {
	const src = '[[This is a link not a modifier]]\n';
	const result = parser.parse(src);

	t.is(result.blocks.length, 1);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, src.trim());
});

test('parses mixtures of text blocks and modifiers correctly', t => {
	const result = parser.parse(
		'This is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally...'
	);

	t.is(result.blocks.length, 5);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'This is a text block.');
	t.is(result.blocks[1].type, 'modifier');
	t.is(result.blocks[1].content, 'hello');
	t.is(result.blocks[2].type, 'text');
	t.is(result.blocks[2].content, 'And another block.');
	t.is(result.blocks[3].type, 'modifier');
	t.is(result.blocks[3].content, 'hello again');
	t.is(result.blocks[4].type, 'text');
	t.is(result.blocks[4].content, 'Finally...');
});

test('parses mixtures of vars, text blocks, and modifiers correctly', t => {
	const result = parser.parse(
		"foo: 1\nbar: 'red'\n--\nThis is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally..."
	);

	t.is(result.vars.foo, '1');
	t.is(result.vars.bar, "'red'");
	t.is(result.blocks.length, 5);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'This is a text block.');
	t.is(result.blocks[1].type, 'modifier');
	t.is(result.blocks[1].content, 'hello');
	t.is(result.blocks[2].type, 'text');
	t.is(result.blocks[2].content, 'And another block.');
	t.is(result.blocks[3].type, 'modifier');
	t.is(result.blocks[3].content, 'hello again');
	t.is(result.blocks[4].type, 'text');
	t.is(result.blocks[4].content, 'Finally...');
});

test('allows multiple modifiers to be joined with a semicolon', t => {
	const result = parser.parse(
		'This is a text block.\n[hello; hello]\nAnd another block.'
	);

	t.is(result.blocks.length, 4);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'This is a text block.');
	t.is(result.blocks[1].type, 'modifier');
	t.is(result.blocks[1].content, 'hello');
	t.is(result.blocks[2].type, 'modifier');
	t.is(result.blocks[2].content, 'hello');
	t.is(result.blocks[3].type, 'text');
	t.is(result.blocks[3].content, 'And another block.');
});

test('ignores semicolons inside quoted phrases inside a modifier', t => {
	const result = parser.parse(
		'This is a text block.\n[hello "I wonder;"; hello]\nAnd another block.'
	);

	t.is(result.blocks.length, 4);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'This is a text block.');
	t.is(result.blocks[1].type, 'modifier');
	t.is(result.blocks[1].content, 'hello "I wonder;"');
	t.is(result.blocks[2].type, 'modifier');
	t.is(result.blocks[2].content, 'hello');
	t.is(result.blocks[3].type, 'text');
	t.is(result.blocks[3].content, 'And another block.');
});

test('handles escaped quotation marks inside compound modifiers correctly', t => {
	const result = parser.parse(
		'This is a text block.\n[hello "I \\"wonder\\";"; hello]\nAnd another block.'
	);

	t.is(result.blocks.length, 4);
	t.is(result.blocks[0].type, 'text');
	t.is(result.blocks[0].content, 'This is a text block.');
	t.is(result.blocks[1].type, 'modifier');
	t.is(result.blocks[1].content, 'hello "I \\"wonder\\";"');
	t.is(result.blocks[2].type, 'modifier');
	t.is(result.blocks[2].content, 'hello');
	t.is(result.blocks[3].type, 'text');
	t.is(result.blocks[3].content, 'And another block.');
});

test.todo('logs to the console with the verbose property');
test.todo('allows modifying the varsSep property');
test.todo('allows modifying the modifierPattern property');
