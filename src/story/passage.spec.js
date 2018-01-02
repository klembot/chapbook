const {expect} = require('chai');
const Passage = require('./passage');

describe('Passage', function() {
	let passage;
	const passageContainer = document.createElement('div');

	passageContainer.innerHTML = '<tw-passagedata pid="1" name="Test Passage" tags="tag1 tag2">&lt;Hello world&gt;</tw-passagedata>';

	const passageEl = passageContainer.querySelector('tw-passagedata');

	beforeEach(() => {
		passage = new Passage();
		passage.loadFromHtml(passageEl);
	});

	it('sets the name from the element', () => {
		expect(passage.name).to.equal('Test Passage');
	});

	it('sets the contents from the element', () => {
		expect(passage.source).to.equal('<Hello world>');
	});

	it('sets the tags from the element', () => {
		expect(passage.tags.length).to.equal(2);
		expect(passage.tags[0]).to.equal('tag1');
		expect(passage.tags[1]).to.equal('tag2');
	});

	it('handles an absence of tags', () => {
		const noTagContainer = document.createElement('div');
		const noTagPassage = new Passage();

		noTagContainer.innerHTML = '<tw-passagedata pid="1" name="Test Passage">&lt;Hello</tw-passagedata>';

		noTagPassage.loadFromHtml(noTagContainer.querySelector('tw-passagedata'));
	});
});
