import test from 'ava';
import Story from './index';

let story;
const storyContainer = document.createElement('div');

storyContainer.innerHTML =
	'<tw-storydata name="Test" startnode="1" creator="test-creator" creator-version="1.2.3"><tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">Hello world</tw-passagedata><tw-passagedata pid="2" name="Test Passage 2" tags="tag1 tag2">Hello world 2</tw-passagedata></tw-passagedata><script type="text/twine-javascript">window.scriptRan = true;</script><style type="text/twine-css">body { color: blue }</style></tw-storydata>';

const storyEl = storyContainer.querySelector('tw-storydata');

test.beforeEach(t => {
	story = new Story();
	story.loadFromHtml(storyEl);
});

test('sets the story name from the element', t => {
	t.is(story.name, 'Test');
});

test('sets the story creator from the element', t => {
	t.is(story.creator, 'test-creator');
});

test('sets the story creator version from the element', t => {
	t.is(story.creatorVersion, '1.2.3');
});

test('sets the start node from the element', t => {
	t.is(story.startNode, 1);
});

test("sets the story's scripts from the element", t => {
	t.is(story.customScripts.length, 1);
	t.is(story.customScripts[0], 'window.scriptRan = true;');
});

test("sets the story's styles from the element", t => {
	t.is(story.customStyles.length, 1);
	t.is(story.customStyles[0], 'body { color: blue }');
});

test('creates passages', t => {
	t.is(story.passages.length, 2);
});
