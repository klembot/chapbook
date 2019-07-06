import render from '../render';
import {set} from '../../state';

jest.mock('../../state');

const modifierInput = {
	blocks: [
		{type: 'modifier', content: 'test'},
		{type: 'text', content: 'Hello world'}
	],
	vars: []
};

beforeEach(() => {
	set.mockClear();
});

describe('render()', () => {
	test('sets vars', () => {
		const input = {
			vars: [{name: 'foo', value: () => 'hello'}],
			blocks: []
		};

		render(input, [], []);
		expect(set).toHaveBeenCalledTimes(1);
		expect(set).toHaveBeenCalledWith('foo', 'hello');
	});

	test('handles var names with dots', () => {
		const input = {
			vars: [{name: 'foo.bar.baz', value: () => 'hello'}],
			blocks: []
		};

		render(input, [], []);
		expect(set).toHaveBeenCalledTimes(1);
		expect(set).toHaveBeenCalledWith('foo.bar.baz', 'hello');
	});

	test('throws an error when given no vars', () => {
		expect(() => render({blocks: []})).toThrow();
	});

	test('throws an error when given a var whose value function throws', () => {
		expect(() =>
			render({
				blocks: [],
				vars: [
					{
						name: 'foo',
						value: () => {
							throw new Error('Test');
						}
					}
				]
			})
		).toThrow();
	});

	test('throws an error when given no blocks', () => {
		expect(() => render({vars: {}})).toThrow();
	});

	test('renders text blocks to HTML', () => {
		const result = render({
			blocks: [{type: 'text', content: 'Hello world.\n\nThis is me.'}],
			vars: []
		});

		expect(result.trim()).toBe('<p>Hello world.</p>\n<p>This is me.</p>');
	});

	test('renders consecutive text blocks to HTML', () => {
		const result = render({
			blocks: [
				{type: 'text', content: 'Hello world.'},
				{type: 'text', content: 'This is me.'}
			],
			vars: []
		});

		expect(result.trim()).toBe('<p>Hello world.</p>\n<p>This is me.</p>');
	});

	// TODO: warns about unknown modifiers
	// TODO: warns about modifier blocks that match more than one modifier

	test("passes text through a modifier's process method", () => {
		const spyModifier = {match: /^test/, process: jest.fn()};

		render(modifierInput, [], [spyModifier]);
		expect(spyModifier.process).toHaveBeenCalledTimes(1);
		expect(spyModifier.process).toHaveBeenCalledWith(
			{afterText: '', beforeText: '\n\n', text: 'Hello world'},
			{invocation: 'test', state: {}}
		);
	});

	test('persists changes made to the text by a modifier', () => {
		const result = render(
			modifierInput,
			[],
			[
				{
					match: /^test/,
					process(src) {
						src.beforeText = '-test-start-';
						src.text = src.text.toUpperCase();
						src.afterText = '-test-end-';
					}
				}
			]
		);

		expect(result.trim()).toBe('<p>-test-start-HELLO WORLD-test-end-</p>');
	});

	test('resets modifiers after a text block', () => {
		const spyModifier = {
			match: /^test/,
			process: jest.fn()
		};

		render(
			{
				blocks: [
					{type: 'modifier', content: 'test'},
					{type: 'text', content: 'Hello world'},
					{type: 'text', content: 'Hello world again'}
				],
				vars: []
			},
			[],
			[spyModifier]
		);
		expect(spyModifier.process.mock.calls.length).toBe(1);
	});
});
