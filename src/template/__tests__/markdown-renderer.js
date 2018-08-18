import renderer from '../markdown-renderer';

beforeEach(() => {
	delete window.foo;
});

afterEach(() => {
	delete window.foo;
});

describe('custom Markdown renderer', () => {
	test('evaluates code inside backtick fences silently', () => {
		const result = renderer.code("\nwindow.foo = 'red';\n");

		expect(result).toBe('');
		expect(window.foo).toBe('red');
	});

	test('outputs source with write() inside backtick fences', () => {
		let result = renderer.code("\nwrite('hello world');\n");

		expect(result).toBe('hello world');

		result = renderer.code("\nwrite('hello', ' world');\n");
		expect(result).toBe('hello world');

		result = renderer.code("\nwrite('hello'); write(' world');\n");
		expect(result).toBe('hello world');
	});
});
