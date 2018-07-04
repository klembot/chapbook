import renderer from '../markdown-renderer';

beforeEach(() => {
	delete window.foo;
});

afterEach(() => {
	delete window.foo;
});

test('evaluates code inside backtick fences silently', () => {
	const result = renderer.code("\nwindow.foo = 'red';\n");

	expect(result).toBe('');
	expect(window.foo).toBe('red');
});

test('interpolates JavaScript values inside backticks', () => {
	expect(renderer.codespan('2 + 2')).toBe('4');
});
