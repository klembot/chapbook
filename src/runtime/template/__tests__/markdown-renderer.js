// eslint-disable-next-line no-unused-vars
import renderer from '../markdown-renderer';

beforeEach(() => {
	delete window.foo;
});

afterEach(() => {
	delete window.foo;
});

describe('custom Markdown renderer', () => {
	test.todo('renders forks');
	test.todo('renders tildes as small caps');
});
