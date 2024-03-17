import {SpyInstance, beforeEach, describe, expect, it, vi} from 'vitest';
import {renderParsed} from '../render-parsed';
import * as state from '../../state';
import {ParseResult} from '../types';

const modifierInput: ParseResult = {
	blocks: [
		{type: 'modifier', content: 'test'},
		{type: 'text', content: 'Hello world'}
	],
	vars: []
};

describe('renderParsed()', () => {
	let setSpy: SpyInstance;

	beforeEach(() => {
		setSpy = vi.spyOn(state, 'set');
	});

	it('sets vars', () => {
		const input = {
			vars: [
				{name: 'foo', value: () => 'hello'},
				{condition: () => true, name: 'bar', value: () => 'world'},
				{condition: () => false, name: 'bar', value: () => 'wrong'}
			],
			blocks: []
		};

		renderParsed(input, [], []);
		expect(setSpy.mock.calls).toEqual([
			['foo', 'hello'],
			['bar', 'world']
		]);
	});

	it('handles var names with dots', () => {
		const input = {
			vars: [{name: 'foo.bar.baz', value: () => 'hello'}],
			blocks: []
		};

		renderParsed(input, [], []);
		expect(setSpy.mock.calls).toEqual([['foo.bar.baz', 'hello']]);
	});

	it('throws an error when given no vars', () => {
		expect(() =>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderParsed({blocks: [{content: '', type: 'text'}]} as any, [], [])
		).toThrow();
	});

	it('throws an error when given a var whose value function throws', () => {
		expect(() =>
			renderParsed(
				{
					blocks: [],
					vars: [
						{
							name: 'foo',
							value: () => {
								throw new Error('Test');
							}
						}
					]
				},
				[],
				[]
			)
		).toThrow();
	});

	it('throws an error when given no blocks', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => renderParsed({vars: {}} as any, [], [])).toThrow();
	});

	it('renders text blocks to HTML', () => {
		const result = renderParsed(
			{
				blocks: [{type: 'text', content: 'Hello world.\n\nThis is me.'}],
				vars: []
			},
			[],
			[]
		);

		expect(result.trim()).toBe('<p>Hello world.</p>\n<p>This is me.</p>');
	});

	it('renders consecutive text blocks to HTML', () => {
		const result = renderParsed(
			{
				blocks: [
					{type: 'text', content: 'Hello world.'},
					{type: 'text', content: 'This is me.'}
				],
				vars: []
			},
			[],
			[]
		);

		expect(result.trim()).toBe('<p>Hello world.</p>\n<p>This is me.</p>');
	});

	it.todo('warns about unknown modifiers');
	it.todo('warns about modifier blocks that match more than one modifier');

	it("passes text through a modifier's process method", () => {
		const spyModifier = {match: /^test/, process: vi.fn()};

		renderParsed(modifierInput, [], [spyModifier]);
		expect(spyModifier.process).toHaveBeenCalledTimes(1);
		expect(spyModifier.process).toHaveBeenCalledWith(
			{text: 'Hello world', startsNewParagraph: true},
			{invocation: 'test', state: {}}
		);
	});

	it('persists changes made to the text by a modifier', () => {
		const result = renderParsed(
			modifierInput,
			[],
			[
				{
					match: /^test/,
					process(src) {
						src.text = src.text.toUpperCase();
						src.startsNewParagraph = false;
					}
				}
			]
		);

		expect(result.trim()).toBe('<p>HELLO WORLD</p>');
	});

	it('resets modifiers after a text block', () => {
		const spyModifier = {
			match: /^test/,
			process: vi.fn()
		};

		renderParsed(
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

	it('removes whitespace between list items', () => {
		expect(
			renderParsed(
				{
					blocks: [{type: 'text', content: '- one\n\n\n- two'}],
					vars: []
				},
				[],
				[]
			).trim()
		).toBe('<ul>\n<li>one</li>\n<li>two</li>\n</ul>');

		expect(
			renderParsed(
				{
					blocks: [{type: 'text', content: '* one\n\n\n* two\n\n* three'}],
					vars: []
				},
				[],
				[]
			).trim()
		).toBe('<ul>\n<li>one</li>\n<li>two</li>\n<li>three</li>\n</ul>');
	});

	it('removes whitespace between forks', () =>
		expect(
			renderParsed(
				{
					blocks: [{type: 'text', content: '> one\n\n\n> two\n\n> three'}],
					vars: []
				},
				[],
				[]
			).trim()
		).toBe('<div class="fork"><p>one\ntwo\nthree</p>\n</div>'));

		it("doesn't remove whitespace around italicized paragraphs", () =>
      expect(
        renderParsed(
          {
            blocks: [{type: 'text', content: '*italic*\n\n*italic*'}],
            vars: []
          },
          [],
          []
        ).trim()
      ).toBe('<p><em>italic</em></p>\n<p><em>italic</em></p>'));
});
