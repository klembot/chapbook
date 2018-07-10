import wrap from '../wrap-markdown';

test('wraps a single line properly', () => {
	expect(wrap('Hello')).toBe('<span>Hello</span>');
});

test('wraps a paragraph with single line breaks properly', () => {
	expect(wrap('Hello\nthere')).toBe('<span>Hello\nthere</span>');
});

test('wraps multiple paragraphs properly', () => {
	expect(wrap('Hello\n\nthere')).toBe(
		'<span>Hello</span>\n\n<span>there</span>'
	);
	expect(wrap('Hello\n\nthere\n\n\nbuddy')).toBe(
		'<span>Hello</span>\n\n<span>there</span>\n\n\n<span>buddy</span>'
	);
});

test('sets attributes properly', () => {
	expect(wrap('Hello', {foo: 'bar'})).toBe('<span foo="bar">Hello</span>');
	expect(wrap('Hello', {foo: 'bar', baz: 'quux'})).toBe(
		'<span foo="bar" baz="quux">Hello</span>'
	);
});

test('sets attributes properly on multiple paragraphs', () => {
	expect(wrap('Hello\n\nthere', {foo: 'bar'})).toBe(
		'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>'
	);
	expect(wrap('Hello\n\nthere', {foo: 'bar', baz: 'quux'})).toBe(
		'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>'
	);
	expect(wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar'})).toBe(
		'<span foo="bar">Hello</span>\n\n<span foo="bar">there</span>\n\n\n<span foo="bar">buddy</span>'
	);
	expect(wrap('Hello\n\nthere\n\n\nbuddy', {foo: 'bar', baz: 'quux'})).toBe(
		'<span foo="bar" baz="quux">Hello</span>\n\n<span foo="bar" baz="quux">there</span>\n\n\n<span foo="bar" baz="quux">buddy</span>'
	);
});
