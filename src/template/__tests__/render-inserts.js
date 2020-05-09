import render from '../render-inserts';
import * as state from '../../state';

jest.mock('../../state');

state.get = jest.fn(value => {
	switch (value) {
		case 'color':
			return 'red';

		case 'a.nested.variable':
			return 'success';
	}
});

afterAll(() => {
	state.get.mockRestore();
});

let warnSpy;

beforeEach(() => {
	warnSpy = jest.spyOn(global.console, 'warn');
	warnSpy.mockImplementation(() => {});
});

afterEach(() => warnSpy.mockRestore());

const inserts = [
	{
		match: /^test insert/i,
		render(first, props, invocation) {
			return first + '#' + JSON.stringify(props) + '#' + invocation;
		},
	},
	{
		match: /^insert that throws/i,
		render() {
			throw new Error('Test');
		},
	},
	{
		match: /^insert without return/i,
		render() {},
	},
];

describe('insert renderer', () => {
	test('interpolates variables', () => {
		expect(render('{color}', [])).toBe('red');
		expect(render('{ color }', [])).toBe('red');
		expect(render('The sky was {color}.', [])).toBe('The sky was red.');
		expect(render('AA {color} -- {color} ZZ', [])).toBe('AA red -- red ZZ');
		expect(render('{color}\n\n{color}', [])).toBe('red\n\nred');

		expect(render('{a.nested.variable}', [])).toBe('success');
		expect(render('{ a.nested.variable }', [])).toBe('success');
		expect(render('The test was a {a.nested.variable}.', [])).toBe(
			'The test was a success.'
		);
		expect(render('{a.nested.variable} -- {a.nested.variable}', [])).toBe(
			'success -- success'
		);
		expect(render('{a.nested.variable}\n\n{a.nested.variable}', [])).toBe(
			'success\n\nsuccess'
		);
	});

	test('invokes functional inserts', () => {
		expect(render('{test insert: "hello"}', inserts)).toBe(
			'hello#{}#test insert: "hello"'
		);

		expect(render('{test insert, foo: "hello"}', inserts)).toBe(
			'null#{"foo":"hello"}#test insert, foo: "hello"'
		);

		expect(render('{test insert}', inserts)).toBe('null#{}#test insert');
	});

	test('invokes functional inserts that contain }', () => {
		expect(render('{test insert: "hello }"}', inserts)).toBe(
			'hello }#{}#test insert: "hello }"'
		);
	});

	test('leaves unparseable inserts alone', () => {
		expect(render('{???}', [])).toBe('{???}');
		expect(render('{??? ???}', [])).toBe('{??? ???}');
		expect(render("{test insert: '}", inserts)).toBe("{test insert: '}");
		expect(render("{test insert, unclosed: '}", inserts)).toBe(
			"{test insert, unclosed: '}"
		);
	});

	test("renders inserts that don't explicitly return a value as an empty space", () => {
		expect(render('{insert without return}', inserts)).toBe('');
	});

	test('leaves inserts that throw an error when rendering alone', () => {
		expect(render('{insert that throws}', inserts)).toBe(
			'{insert that throws}'
		);
	});
});
