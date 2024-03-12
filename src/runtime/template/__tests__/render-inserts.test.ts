import {
	SpyInstance,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import render from '../render-inserts';
import * as state from '../../state';
import {Insert} from '../inserts';

const inserts: Insert[] = [
	{
		match: /^test insert/i,
		render(first, props, invocation) {
			return first + '#' + JSON.stringify(props) + '#' + invocation;
		}
	},
	{
		match: /^insert that throws/i,
		render() {
			throw new Error('Test');
		}
	},
	{
		match: /^insert without return/i,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		render() {}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any
];

describe('insert renderer', () => {
	let getSpy: SpyInstance;
	let warnSpy: SpyInstance;

	beforeEach(() => {
		getSpy = vi.spyOn(state, 'get').mockImplementation(name => {
			switch (name) {
				case 'color':
					return 'red';

				case 'a.nested.variable':
					return 'success';

				case 'anArray':
					return ['success1', 'success2'];

				case 'a.nested.array':
					return ['success1', 'success2'];

				default:
					return undefined;
			}
		});

		warnSpy = vi.spyOn(global.console, 'warn').mockReturnValue(undefined);
	});

	afterEach(() => {
		getSpy.mockRestore();
		warnSpy.mockRestore();
	});

	it('interpolates variables', () => {
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
		expect(render('{anArray}', [])).toBe('success1,success2');
		expect(render('{anArray[0]}', [])).toBe('success1');
		expect(render('{anArray[1]}', [])).toBe('success2');
		expect(render('{a.nested.array}', [])).toBe('success1,success2');
		expect(render('{a.nested.array[0]}', [])).toBe('success1');
		expect(render('{a.nested.array[1]}', [])).toBe('success2');
	});

	it('invokes functional inserts', () => {
		expect(render('{test insert: "hello"}', inserts)).toBe(
			'hello#{}#test insert: "hello"'
		);

		expect(render('{test insert, foo: "hello"}', inserts)).toBe(
			'null#{"foo":"hello"}#test insert, foo: "hello"'
		);

		expect(render('{test insert}', inserts)).toBe('null#{}#test insert');
	});

	it('invokes functional inserts that contain }', () => {
		expect(render('{test insert: "hello }"}', inserts)).toBe(
			'hello }#{}#test insert: "hello }"'
		);
	});

	it('invokes functional inserts that contain quotation marks', () => {
		expect(render(`{test insert: '"hello m\\'dear"'}`, inserts)).toBe(
			`"hello m'dear"#{}#test insert: '"hello m\\'dear"'`
		);
	});

	it('leaves unparseable inserts alone', () => {
		expect(render('{???}', [])).toBe('{???}');
		expect(render('{??? ???}', [])).toBe('{??? ???}');
		expect(render("{test insert: '}", inserts)).toBe("{test insert: '}");
		expect(render("{test insert, unclosed: '}", inserts)).toBe(
			"{test insert, unclosed: '}"
		);
	});

	it("renders inserts that don't explicitly return a value as an empty space", () => {
		expect(render('{insert without return}', inserts)).toBe('');
	});

	it('leaves inserts that throw an error when rendering alone', () => {
		expect(render('{insert that throws}', inserts)).toBe(
			'{insert that throws}'
		);
	});
});
