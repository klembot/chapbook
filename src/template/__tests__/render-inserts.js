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

const inserts = [
	{
		match: /^test insert/i,
		render(first, props, invocation) {
			return first + '#' + JSON.stringify(props) + '#' + invocation;
		}
	}
];

describe('insert renderer', () => {
	test('interpolates variables', () => {
		expect(render('{color}', [], [])).toBe('red');
		expect(render('{ color }', [], [])).toBe('red');
		expect(render('The sky was {color}.', [], [])).toBe('The sky was red.');
		expect(render('{color} -- {color}', [], [])).toBe('red -- red');
		expect(render('{color}\n\n{color}', [], [])).toBe('red\n\nred');

		expect(render('{a.nested.variable}', [], [])).toBe('success');
		expect(render('{ a.nested.variable }', [], [])).toBe('success');
		expect(render('The test was a {a.nested.variable}.', [], [])).toBe(
			'The test was a success.'
		);
		expect(
			render('{a.nested.variable} -- {a.nested.variable}', [], [])
		).toBe('success -- success');
		expect(
			render('{a.nested.variable}\n\n{a.nested.variable}', [], [])
		).toBe('success\n\nsuccess');
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

	test('leaves unparseable inserts alone', () => {
		expect(render('{???}', [], [])).toBe('{???}');
		expect(render('{??? ???}', [], [])).toBe('{??? ???}');
	});
});
