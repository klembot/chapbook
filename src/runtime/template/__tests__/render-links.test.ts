import {describe, expect, it} from 'vitest';
import {renderLinks} from '../links';

describe('renderLinks', () => {
	it.each([
		[
			'[[target]]',
			'<passage-link class="link" to="target">target</passage-link>'
		],
		[
			'[[target<-label]]',
			'<passage-link class="link" to="target">label</passage-link>'
		],
		[
			'[[label->target]]',
			'<passage-link class="link" to="target">label</passage-link>'
		],
		[
			'[[label|target]]',
			'<passage-link class="link" to="target">label</passage-link>'
		],
		[
			'[[https://twinery.org]]',
			'<a class="link" href="https://twinery.org">https://twinery.org</a>'
		],
		[
			'[[https://twinery.org<-label]]',
			'<a class="link" href="https://twinery.org">label</a>'
		],
		[
			'[[label->https://twinery.org]]',
			'<a class="link" href="https://twinery.org">label</a>'
		],
		[
			'[[label|https://twinery.org]]',
			'<a class="link" href="https://twinery.org">label</a>'
		],
		[
			'[[two]] [[links]]',
			'<passage-link class="link" to="two">two</passage-link> <passage-link class="link" to="links">links</passage-link>'
		],
		['[[]]', '[[]]'],
		['[[label->]]', '[[label->]]'],
		['[[->target]]', '[[->target]]']
	])('renders %s correctly', (source, output) =>
		expect(renderLinks(source)).toBe(output)
	);
});
