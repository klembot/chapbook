import {describe, expect, it} from 'vitest';
import {domify, htmlify} from '../htmlify';

describe('domify', () => {
	it('sets the tag name to the first argument', () =>
		expect(domify('div').nodeName).toBe('DIV'));

	it('applies attributes set in the second argument', () => {
		const result = domify('a', {href: 'https://twinery.org', target: '_blank'});

		expect(result.getAttribute('href')).toBe('https://twinery.org');
		expect(result.getAttribute('target')).toBe('_blank');
	});

	it('adds children in the third argument', () =>
		expect(
			domify('a', {href: 'https://twinery.org'}, [
				'a',
				1,
				document.createElement('span')
			]).innerHTML
		).toBe('a1<span></span>'));
});

describe('htmlify', () => {
	it('sets the tag name to the first argument', () =>
		expect(htmlify('div')).toBe('<div></div>'));

	it('applies attributes set in the second argument', () =>
		expect(htmlify('a', {href: 'https://twinery.org', target: '_blank'})).toBe(
			'<a href="https://twinery.org" target="_blank"></a>'
		));

	it('adds children in the third argument', () =>
		expect(
			htmlify('a', {href: 'https://twinery.org'}, [
				'a',
				1,
				document.createElement('span')
			])
		).toBe('<a href="https://twinery.org">a1<span></span></a>'));
});
