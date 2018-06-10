import test from 'ava';
import wrap from './wrap-markdown';

test('wraps a single line properly', t => {
	t.is(wrap('Hello'), '<span>Hello</span>');
});

test('wraps a paragraph with single line breaks properly', t => {
	t.is(wrap('Hello\nthere'), '<span>Hello\nthere</span>');
});

test('wraps multiple paragraphs properly', t => {
	t.is(wrap('Hello\n\nthere'), '<span>Hello</span>\n\n<span>there</span>');
	t.is(
		wrap('Hello\n\nthere\n\n\nbuddy'),
		'<span>Hello</span>\n\n<span>there</span>\n\n\n<span>buddy</span>'
	);
});

test('sets attributes properly', t => {
	t.is(wrap('Hello', {foo: 'bar'}), '<span foo="bar">Hello</span>');
	t.is(
		wrap('Hello', {foo: 'bar', baz: 'quux'}),
		'<span foo="bar" baz="quux">Hello</span>'
	);
});

test('sets attributes properly on multiple paragraphs', t => {
	t.is(
		wrap('Hello\n\nthere', {foo: 'bar'}),
		'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>'
	);
	t.is(
		wrap('Hello\n\nthere', {foo: 'bar', baz: 'quux'}),
		'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>'
	);
	t.is(
		wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar'}),
		'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>\n\n\n<span foo="bar">buddy</span>'
	);
	t.is(
		wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar', baz: 'quux'}),
		'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>\n\n\n<span foo="bar" baz="quux">buddy</span>'
	);
});
