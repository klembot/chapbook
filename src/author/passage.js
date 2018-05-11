/* Author functions for working with passages. */

import Passage from '../story/passage';

class RenderablePassage extends Passage {
	constructor(passage, parser, renderer) {
		super();

		console.log(passage);
		['id', 'name', 'source', 'tags'].forEach(i => (this[i] = passage[i]));
		this.parser = parser;
		this.renderer = renderer;
	}

	toString() {
		return this.renderer.render(this.parser.parse(this.source)).html;
	}
}

function createFactory(story, parser, renderer) {
	return passageName =>
		new RenderablePassage(story.passage(passageName), parser, renderer);
}

export {RenderablePassage, createFactory};
