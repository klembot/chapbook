import {describe, expect, it} from 'vitest';
import {wrapMarkdown} from '../wrap-markdown';

describe('wrapMarkdown', () => {
	it('wraps a single line properly', () => {
		expect(wrapMarkdown('Hello', 'span')).toBe('<span>Hello</span>');
	});

	it('wraps a paragraph with single line breaks properly', () => {
		expect(wrapMarkdown('Hello\nthere', 'span')).toBe(
			'<span>Hello\nthere</span>'
		);
	});

	it('wraps multiple paragraphs properly', () => {
		expect(wrapMarkdown('Hello\n\nthere', 'span')).toBe(
			'<span>Hello</span>\n\n<span>there</span>'
		);
		expect(wrapMarkdown('Hello\n\nthere\n\n\nbuddy', 'span')).toBe(
			'<span>Hello</span>\n\n<span>there</span>\n\n\n<span>buddy</span>'
		);
		expect(wrapMarkdown('Hello\n\nthere\n\n\nbuddy', 'custom-element')).toBe(
			'<custom-element>Hello</custom-element>\n\n<custom-element>there</custom-element>\n\n\n<custom-element>buddy</custom-element>'
		);
	});

	it('sets attributes properly', () => {
		expect(wrapMarkdown('Hello', 'span', {foo: 'bar'})).toBe(
			'<span foo="bar">Hello</span>'
		);
		expect(wrapMarkdown('Hello', 'span', {foo: 'bar', baz: 'quux'})).toBe(
			'<span foo="bar" baz="quux">Hello</span>'
		);
	});

	it('sets attributes properly on multiple paragraphs', () => {
		expect(wrapMarkdown('Hello\n\nthere', 'span', {foo: 'bar'})).toBe(
			'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>'
		);
		expect(
			wrapMarkdown('Hello\n\nthere', 'span', {foo: 'bar', baz: 'quux'})
		).toBe(
			'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>'
		);
		expect(
			wrapMarkdown('Hello\n\nthere\n\n\nbuddy', 'span', {foo: 'bar'})
		).toBe(
			'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>\n\n\n<span foo="bar">buddy</span>'
		);
		expect(
			wrapMarkdown('Hello\n\nthere\n\n\nbuddy', 'span', {
				foo: 'bar',
				baz: 'quux'
			})
		).toBe(
			'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>\n\n\n<span foo="bar" baz="quux">buddy</span>'
		);
	});
});
