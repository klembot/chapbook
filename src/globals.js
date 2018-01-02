const Parser = require('./template/parser');
const Renderer = require('./template/renderer');
const Story = require('./story');
const View = require('./view');
const passageLinks = require('./template/passage-links');

const Globals = module.exports = {
	init() {
		/*
		Create template parsers and renderers.
		*/

		Globals.parser = new Parser();
		Globals.renderer = new Renderer();

		/*
		Connect our view to the DOM.
		*/

		Globals.view = new View(document.querySelector('#main'));
		passageLinks.attachTo(Globals.view.el, Globals.go);

		/*
		Load the story from the page's HTML.
		*/

		Globals.story = new Story();
		Globals.story.loadFromHtml(document.querySelector('tw-storydata'));

		/*
		Expose properties on the window.
		*/

		Object.assign(window, Globals);
	},

	go(passageNameOrId) {
		Globals.view.show(Globals.render(passageNameOrId));
	},

	render(passageNameOrId) {
		let passage;

		if (typeof passageNameOrId === 'number') {
			passage = Globals.story.passages.find(
				p => p.id === passageNameOrId
			);

			if (!passage) {
				throw new Error(`There is no passage with ID ${passageNameOrId}.`);
			}
		}
		else {
			passage = Globals.story.passage(passageNameOrId);

			if (!passage) {
				throw new Error(`There is no passage named "${passageNameOrId}".`);
			}
		}

		const output = Globals.renderer.render(
			Globals.parser.parse(passage.source)
		);

		return output.html;
	},

	restart() {
		Globals.go(Globals.story.startNode);
	}
};