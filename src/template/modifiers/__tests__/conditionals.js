import conditionals from '../conditionals';
import render from '../../render';

afterEach(() => {
	if (window.testCall) {
		delete window.testCall;
	}
});

describe('conditional modifiers', () => {
	test('renders text conditionally with if', () => {
		let output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'if true'},
					{type: 'text', content: 'there'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>\n<p>there</p>');

		output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'if false'},
					{type: 'text', content: 'there'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>');
	});

	test('renders text conditionally with unless', () => {
		let output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'unless true'},
					{type: 'text', content: 'there'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>');

		output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'unless false'},
					{type: 'text', content: 'there'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>\n<p>there</p>');
	});

	test('inverts conditions with else', () => {
		let output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'if true'},
					{type: 'text', content: 'there'},
					{type: 'modifier', content: 'else'},
					{type: 'text', content: 'never seen'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>\n<p>there</p>');

		output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'if false'},
					{type: 'text', content: 'never seen'},
					{type: 'modifier', content: 'else'},
					{type: 'text', content: 'there'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>\n<p>there</p>');
	});

	test('only evaluates a condition once with an else', () => {
		window.testCall = jest.fn(() => true);

		let output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'if window.testCall()'},
					{type: 'text', content: 'there'},
					{type: 'modifier', content: 'else'},
					{type: 'text', content: 'never seen'},
				],
				vars: [],
			},
			[],
			[conditionals]
		);

		expect(output.trim()).toBe('<p>Hello</p>\n<p>there</p>');
		expect(window.testCall).toHaveBeenCalledTimes(1);
	});

	test('does not let contents be rendered at all if the condition is false', () => {
		const spyInsert = {
			match: /spy insert/i,
			render: jest.fn(),
		};

		const output = render(
			{
				blocks: [
					{type: 'modifier', content: 'if false'},
					{type: 'text', content: '{spy insert}'},
				],
				vars: [],
			},
			[spyInsert],
			[conditionals]
		);

		expect(output).toBe('');
		expect(spyInsert.render).toHaveBeenCalledTimes(0);
	});

	// TODO: signals an error if else is used without a matching if'
});
