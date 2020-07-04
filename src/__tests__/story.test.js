import {setDefault} from '../state';
import {
	addCustomStyles,
	ifid,
	init,
	loadFromData,
	name,
	runCustomScripts,
	startPassage,
	passageNamed,
	passageWithId
} from '../story';

jest.mock('../state');

const mockReleaseStoryHtml =
	'<tw-storydata name="&lt;mock-story-name&gt;" startnode="1" creator="Twine" creator-version="2.3.8" ifid="&lt;mock-ifid&gt;" zoom="1" format="Chapbook" format-version="1.1.1" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">mock-stylesheet</style><script role="script" id="twine-user-script" type="text/twine-javascript">globalMock("mock script")</script><tw-passagedata pid="1" name="mock-passage-name-1" tags="mock-tag-1 mock-tag-2" position="259.5,279.5" size="100,100">mock-passage-text-1</tw-passagedata><tw-passagedata pid="2" name="mock-passage-name-2" tags="" position="400.5,279.5" size="100,100">mock-passage-text-2</tw-passagedata></tw-storydata>';

const mockTestStoryHtml = mockReleaseStoryHtml.replace(
	'options=""',
	'options="debug"'
);

beforeEach(() => {
	const storyEl = document.createElement('div');

	storyEl.innerHTML = mockReleaseStoryHtml;
	loadFromData(storyEl.querySelector('tw-storydata'));
});

describe('addCustomStyles()', () => {
	afterAll(() =>
		Array.from(document.querySelectorAll('style')).forEach(el => el.remove())
	);

	it('appends a stylesheet to the DOM', () => {
		addCustomStyles();

		const styles = Array.from(document.querySelectorAll('style'));

		expect(styles.length).toBe(1);
		expect(styles[0].innerHTML).toBe('mock-stylesheet');
	});
});

describe('ifid()', () => {
	it('returns the IFID set in the <tw-storydata> element', () =>
		expect(ifid()).toBe('<mock-ifid>'));
});

describe('init()', () => {
	let oldEnv;

	beforeAll(() => {
		oldEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = 'production';
		init();
	});

	afterAll(() => {
		setDefault.mockReset();
		process.env.NODE_ENV = oldEnv;
	});

	it('defaults the trail to the first passage', () => {
		expect(setDefault).toBeCalledWith('trail', ['mock-passage-name-1']);
	});

	it('sets config.testing based on Node environment and story options', () => {
		/* Release HTML and production Node environment. */

		expect(setDefault).toBeCalledWith('config.testing', false);

		/* Release HTML and development Node environment. */

		process.env.NODE_ENV = 'development';
		setDefault.mockReset();
		init();
		expect(setDefault).toBeCalledWith('config.testing', true);

		/* Test HTML and production Node environment. */

		const testStoryEl = document.createElement('div');

		testStoryEl.innerHTML = mockTestStoryHtml;
		loadFromData(testStoryEl.querySelector('tw-storydata'));
		process.env.NODE_ENV = 'production';
		setDefault.mockReset();
		init();
		expect(setDefault).toBeCalledWith('config.testing', true);
	});
});

describe('name()', () => {
	it('returns the name set in the <tw-storydata> element', () =>
		expect(name()).toBe('<mock-story-name>'));
});

describe('runCustomScripts()', () => {
	beforeAll(() => {
		global.globalMock = jest.fn();
	});

	afterAll(() => {
		delete global.globalMock;
	});

	it('runs JavaScript in story script tags', () => {
		runCustomScripts();
		expect(global.globalMock).toHaveBeenCalledTimes(1);
	});
});

describe('passageNamed', () => {
	it('returns a passage when one name matches exactly', () => {
		expect(passageNamed('mock-passage-name-1')).not.toBeUndefined();
		expect(passageNamed('mock-passage-name-2')).not.toBeUndefined();
	});

	it('returns undefined when the passage does not exist', () => {
		expect(passageNamed('nonexistent')).toBeUndefined();
		expect(passageNamed('Mock-Passage-Name-1')).toBeUndefined();
		expect(passageNamed('mock-passage-name-1 ')).toBeUndefined();
		expect(passageNamed(' mock-passage-name-1')).toBeUndefined();
	});

	it('returns an object with name, id, source, and tags properties', () => {
		const passage1 = passageNamed('mock-passage-name-1');
		const passage2 = passageNamed('mock-passage-name-2');

		expect(passage1).toEqual({
			id: 1,
			name: 'mock-passage-name-1',
			source: 'mock-passage-text-1',
			tags: ['mock-tag-1', 'mock-tag-2']
		});

		expect(passage2).toEqual({
			id: 2,
			name: 'mock-passage-name-2',
			source: 'mock-passage-text-2',
			tags: []
		});
	});
});

describe('passageWithId', () => {
	it('returns a passage when one ID matches exactly', () => {
		expect(passageWithId(1)).not.toBeUndefined();
		expect(passageWithId(2)).not.toBeUndefined();
	});

	it('returns undefined when the passage does not exist', () => {
		expect(passageWithId(-1)).toBeUndefined();
	});

	it('returns an object with name, id, source, and tags properties', () => {
		const passage1 = passageWithId(1);
		const passage2 = passageWithId(2);

		expect(passage1).toEqual({
			id: 1,
			name: 'mock-passage-name-1',
			source: 'mock-passage-text-1',
			tags: ['mock-tag-1', 'mock-tag-2']
		});

		expect(passage2).toEqual({
			id: 2,
			name: 'mock-passage-name-2',
			source: 'mock-passage-text-2',
			tags: []
		});
	});
});

describe('startPassage()', () => {
	it('returns the start passage as set by the <tw-storydata> element', () => {
		const start = startPassage();

		expect(start.name).toBe('mock-passage-name-1');
	});
});
