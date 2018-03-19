import {expect} from 'chai';
import Story from './index';

describe('Story class', () => {
	let story;
	const storyContainer = document.createElement('div');

	storyContainer.innerHTML =
		'<tw-storydata name="Test" startnode="1" creator="test-creator" creator-version="1.2.3"><tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata><tw-passagedata pid="2" name="Test Passage 2" tags="tag1 tag2">Hello world 2</tw-passagedata></tw-passagedata><script type="text/twine-javascript">window.scriptRan = true;</script><style type="text/twine-css">body { color: blue }</style></tw-storydata>';

	const storyEl = storyContainer.querySelector('tw-storydata');

	beforeEach(() => {
		story = new Story();
		story.loadFromHtml(storyEl);
	});

	it('sets the story name from the element', () => {
		expect(story.name).to.equal('Test');
	});

	it('sets the story creator from the element', () => {
		expect(story.creator).to.equal('test-creator');
	});

	it('sets the story creator version from the element', () => {
		expect(story.creatorVersion).to.equal('1.2.3');
	});

	it('sets the start node from the element', () => {
		expect(story.startNode).to.equal(1);
	});

	it("sets the story's scripts from the element", () => {
		expect(story.customScripts.length).to.equal(1);
		expect(story.customScripts[0]).to.equal('window.scriptRan = true;');
	});

	it("sets the story's styles from the element", () => {
		expect(story.customStyles.length).to.equal(1);
		expect(story.customStyles[0]).to.equal('body { color: blue }');
	});

	it('creates passages', () => {
		expect(story.passages.length).to.equal(2);
	});
});
