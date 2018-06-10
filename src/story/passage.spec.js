import test from 'ava';
import Passage from './passage';

let passage;
const passageContainer = document.createElement('div');

passageContainer.innerHTML =
	'<tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">&lt;Hello world&gt;</tw-passagedata>';

const passageEl = passageContainer.querySelector('tw-passagedata');

test.beforeEach(t => {
	passage = new Passage();
	passage.loadFromHtml(passageEl);
});

test('sets the name from the element', t => {
	t.is(passage.name, 'Test Passage');
});

test('sets the contents from the element', t => {
	t.is(passage.source, '<Hello world>');
});

test('sets the tags from the element', t => {
	t.is(passage.tags.length, 2);
	t.is(passage.tags[0], 'tag1');
	t.is(passage.tags[1], 'tag2');
});

test('handles an absence of tags', t => {
	const noTagContainer = document.createElement('div');
	const noTagPassage = new Passage();

	noTagContainer.innerHTML =
		'<tw-passagedata pid="1" name="Test Passage">&lt;Hello</tw-passagedata>';

	t.notThrows(() =>
		noTagPassage.loadFromHtml(
			noTagContainer.querySelector('tw-passagedata')
		)
	);
});
