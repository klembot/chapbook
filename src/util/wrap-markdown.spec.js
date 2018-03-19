import {expect} from 'chai';
import wrap from './wrap-markdown';

describe('Markdown <span> wrapper', () => {
	it('wraps a single line properly', () => {
		expect(wrap('Hello')).to.equal('<span>Hello</span>');
	});

	it('wraps a paragraph with single line breaks properly', () => {
		expect(wrap('Hello\nthere')).to.equal('<span>Hello\nthere</span>');
	});

	it('wraps multiple paragraphs properly', () => {
		expect(wrap('Hello\n\nthere')).to.equal(
			'<span>Hello</span>\n\n<span>there</span>'
		);
		expect(wrap('Hello\n\nthere\n\n\nbuddy')).to.equal(
			'<span>Hello</span>\n\n<span>there</span>\n\n\n<span>buddy</span>'
		);
	});

	it('sets attributes properly', () => {
		expect(wrap('Hello', {foo: 'bar'})).to.equal(
			'<span foo="bar">Hello</span>'
		);
		expect(wrap('Hello', {foo: 'bar', baz: 'quux'})).to.equal(
			'<span foo="bar" baz="quux">Hello</span>'
		);
	});

	it('sets attributes properly on multiple paragraphs', () => {
		expect(wrap('Hello\n\nthere', {foo: 'bar'})).to.equal(
			'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>'
		);
		expect(wrap('Hello\n\nthere', {foo: 'bar', baz: 'quux'})).to.equal(
			'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>'
		);
		expect(wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar'})).to.equal(
			'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>\n\n\n<span foo="bar">buddy</span>'
		);
		expect(
			wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar', baz: 'quux'})
		).to.equal(
			'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>\n\n\n<span foo="bar" baz="quux">buddy</span>'
		);
	});
});
