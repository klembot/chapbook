const {expect} = require('chai');
const Parser = require('./parser');

describe('template parser', () => {
	let parser;

	beforeEach(() => {
		parser = new Parser();
	});

	it('returns an object with vars, blocks, and warnings properties', () => {
		const result = parser.parse('hello');
		
		expect(result).to.be.an('object');
		expect(result.vars).to.be.an('object');
		expect(result.blocks).to.be.an('array');
		expect(result.warnings).to.be.an('array');
	});

	it('parses vars but does not evaluate expressions', () => {
		const result = parser.parse('foo: 2\nbar: \'red\'\nbaz: true\n--\n');

		expect(result.vars.foo).to.equal('2');
		expect(result.vars.bar).to.equal('\'red\'');
		expect(result.vars.baz).to.equal('true');
	});

	it('ignores empty lines in the vars section', () => {
		const result = parser.parse('foo: 2\n  \n\t\nbar: 3\n--\n');

		expect(result.vars.foo).to.equal('2');
		expect(result.vars.bar).to.equal('3');
	});

	it('warns about repeated vars', () => {
		const result = parser.parse('foo: 2\n foo: 3\n--\n');

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.include('defined more than once');
		expect(result.vars.foo).to.equal('3');
	});

	it('warns about malformed lines in vars', () => {
		const result = parser.parse('hello there\n--\n');

		expect(result.warnings.length).to.equal(1);
		expect(result.warnings[0]).to.include('missing a colon');
	});

	it('parses a bare text block correctly', () => {
		const result = parser.parse('Hello world');

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('Hello world');
	});

	it('preserves newlines in text blocks', () => {
		const src = 'Hello world\nThis is a new line\rAnd a second line';
		const result = parser.parse(src);

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal(src);
	});

	it('trims whitespace before and after text blocks', () => {
		const result = parser.parse('\n \n \rHello world   \n ');

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('Hello world');
	});

	it('parses a modifier correctly', () => {
		const result = parser.parse('[hello world]');

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('modifier');
		expect(result.blocks[0].content).to.equal('hello world');
	});

	it('ignores bracketed phrases inside text blocks', () => {
		const src = 'Hello [world]\n[This is a left bracket but not a right one\n[this]: is a Markdown link\n';
		const result = parser.parse(src);

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal(src.trim());
	});

	it('ignores [[bracketed links]] on a line by themselves', () => {
		const src = '[[This is a link not a modifier]]\n';
		const result = parser.parse(src);

		expect(result.blocks.length).to.equal(1);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal(src.trim());
	});

	it ('parses mixtures of text blocks and modifiers correctly', () => {
		const result = parser.parse('This is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally...');

		expect(result.blocks.length).to.equal(5);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('This is a text block.');
		expect(result.blocks[1].type).to.equal('modifier');
		expect(result.blocks[1].content).to.equal('hello');
		expect(result.blocks[2].type).to.equal('text');
		expect(result.blocks[2].content).to.equal('And another block.');
		expect(result.blocks[3].type).to.equal('modifier');
		expect(result.blocks[3].content).to.equal('hello again');
		expect(result.blocks[4].type).to.equal('text');
		expect(result.blocks[4].content).to.equal('Finally...');
	});

	it('parses mixtures of vars, text blocks, and modifiers correctly', () => {
		const result = parser.parse('foo: 1\nbar: \'red\'\n--\nThis is a text block.\n[hello]\nAnd another block.\n\n[hello again]\nFinally...');

		expect(result.vars.foo).to.equal('1');
		expect(result.vars.bar).to.equal('\'red\'');
		expect(result.blocks.length).to.equal(5);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('This is a text block.');
		expect(result.blocks[1].type).to.equal('modifier');
		expect(result.blocks[1].content).to.equal('hello');
		expect(result.blocks[2].type).to.equal('text');
		expect(result.blocks[2].content).to.equal('And another block.');
		expect(result.blocks[3].type).to.equal('modifier');
		expect(result.blocks[3].content).to.equal('hello again');
		expect(result.blocks[4].type).to.equal('text');
		expect(result.blocks[4].content).to.equal('Finally...');
	});

	it('allows multiple modifiers to be joined with a semicolon', () => {
		const result = parser.parse(
			'This is a text block.\n[hello; hello]\nAnd another block.'
		);

		expect(result.blocks.length).to.equal(4);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('This is a text block.');
		expect(result.blocks[1].type).to.equal('modifier');
		expect(result.blocks[1].content).to.equal('hello');
		expect(result.blocks[2].type).to.equal('modifier');
		expect(result.blocks[2].content).to.equal('hello');
		expect(result.blocks[3].type).to.equal('text');
		expect(result.blocks[3].content).to.equal('And another block.');
	});

	it('ignores semicolons inside quoted phrases inside a modifier', () => {
		const result = parser.parse(
			'This is a text block.\n[hello "I wonder;"; hello]\nAnd another block.'
		);

		expect(result.blocks.length).to.equal(4);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('This is a text block.');
		expect(result.blocks[1].type).to.equal('modifier');
		expect(result.blocks[1].content).to.equal('hello "I wonder;"');
		expect(result.blocks[2].type).to.equal('modifier');
		expect(result.blocks[2].content).to.equal('hello');
		expect(result.blocks[3].type).to.equal('text');
		expect(result.blocks[3].content).to.equal('And another block.');
	});

	it('handles escaped quotation marks inside compound modifiers correctly', () => {
		const result = parser.parse(
			'This is a text block.\n[hello "I \\"wonder\\";"; hello]\nAnd another block.'
		);

		expect(result.blocks.length).to.equal(4);
		expect(result.blocks[0].type).to.equal('text');
		expect(result.blocks[0].content).to.equal('This is a text block.');
		expect(result.blocks[1].type).to.equal('modifier');
		expect(result.blocks[1].content).to.equal('hello "I \\"wonder\\";"');
		expect(result.blocks[2].type).to.equal('modifier');
		expect(result.blocks[2].content).to.equal('hello');
		expect(result.blocks[3].type).to.equal('text');
		expect(result.blocks[3].content).to.equal('And another block.');
	});

	it('logs to the console with the verbose property');
	it('allows modifying the varsSep property');
	it('allows modifying the modifierPattern property');
});