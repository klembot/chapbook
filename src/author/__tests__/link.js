import {Link} from '../link';

function domify(html) {
	const el = document.createElement('div');

	el.innerHTML = html;
	return el.firstChild;
}

describe('Link class', () => {
	it('sets a label in its constructor', () => {
		const result = domify(new Link('hello world').toString());

		expect(result.textContent).toBe('hello world');
	});

	it('sets a label manually with labelled()', () => {
		const result = domify(new Link().labelled('hello world').toString());

		expect(result.textContent).toBe('hello world');
	});

	it('creates an external link with to()', () => {
		const result = domify(new Link().to('https://twinery.org').toString());

		expect(result.getAttribute('href')).toBe('https://twinery.org');
	});

	it('creates a passage link with to()', () => {
		const result = domify(new Link().to('hi there').toString());

		expect(result.getAttribute('href')).toBe('javascript:void(0)');
		expect(result.getAttribute('data-cb-go')).toBe('hi there');
	});

	it('creates a restart link with restart()', () => {
		const result = domify(new Link().restart().toString());

		expect(result.getAttribute('href')).toBe('javascript:void(0)');
		expect(result.getAttribute('data-cb-restart')).toBe('');
	});

	// todo: back tracking
});
