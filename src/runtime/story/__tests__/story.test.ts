import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {
	addCustomStyles,
	ifid,
	loadFromData,
	name,
	runCustomScripts,
	startPassage,
	passages,
	passageNamed,
	passageWithId
} from '../story';

const mockReleaseStoryHtml =
	'<tw-storydata name="&lt;mock-story-name&gt;" startnode="1" creator="Twine" creator-version="2.3.8" ifid="&lt;mock-ifid&gt;" zoom="1" format="Chapbook" format-version="1.1.1" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">mock-stylesheet</style><script role="script" id="twine-user-script" type="text/twine-javascript">globalMock("mock script")</script><tw-passagedata pid="1" name="mock-passage-name-1" tags="mock-tag-1 mock-tag-2" position="259.5,279.5" size="100,100">mock-passage-text-1</tw-passagedata><tw-passagedata pid="2" name="mock-passage-name-2" tags="" position="400.5,279.5" size="100,100">mock-passage-text-2</tw-passagedata></tw-storydata>';

beforeEach(() => {
	const storyEl = document.createElement('div');

	storyEl.innerHTML = mockReleaseStoryHtml;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	loadFromData(storyEl.querySelector('tw-storydata')!);
});

describe('addCustomStyles()', () => {
	afterAll(() => {
		for (const el of document.querySelectorAll('style')) {
			el.remove();
		}
	});

	it('appends a stylesheet to the DOM', () => {
		addCustomStyles();

		const styles = document.querySelectorAll('style');

		expect(styles.length).toBe(1);
		expect(styles[0].innerHTML).toBe('mock-stylesheet');
	});
});

describe('ifid()', () => {
	it('returns the IFID set in the <tw-storydata> element', () =>
		expect(ifid()).toBe('<mock-ifid>'));
});

describe('name()', () => {
	it('returns the name set in the <tw-storydata> element', () =>
		expect(name()).toBe('<mock-story-name>'));
});

describe('runCustomScripts()', () => {
	beforeAll(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).globalMock = vi.fn();
	});

	afterAll(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (window as any).globalMock;
	});

	it('runs JavaScript in story script tags', () => {
		runCustomScripts();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((window as any).globalMock).toHaveBeenCalledTimes(1);
	});
});

describe('passages', () => {
	it('returns all passages that the story has', () => {
		expect(passages()).toEqual([
			{
				id: 1,
				name: 'mock-passage-name-1',
				source: 'mock-passage-text-1',
				tags: ['mock-tag-1', 'mock-tag-2']
			},
			{
				id: 2,
				name: 'mock-passage-name-2',
				source: 'mock-passage-text-2',
				tags: []
			}
		]);
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

		expect(start?.name).toBe('mock-passage-name-1');
	});
});
