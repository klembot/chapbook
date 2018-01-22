const Config = require('./config');
const Modifiers = require('./modifiers');
const Parser = require('./template/parser');
const Persistence = require('./persistence');
const Random = require('./random');
const Renderer = require('./template/renderer');
const Story = require('./story');
const Trail = require('./trail');
const View = require('./view');
const passageLinks = require('./template/passage-links');

const Globals = module.exports = {
	init() {
		/*
		Create template parsers and renderers.
		*/

		Globals.parser = new Parser();
		Globals.renderer = new Renderer();
		Modifiers.addBuiltins(Globals.renderer);

		/*
		Connect our view to the DOM.
		*/

		Globals.view = new View(document.querySelector('.page'));
		passageLinks.attachTo(Globals.view.el, Globals.go);

		/*
		Load the story from the page's HTML.
		*/

		Globals.story = new Story();
		Globals.story.loadFromHtml(document.querySelector('tw-storydata'));

		Globals.config = Config;
		Globals.random = new Random();

		/*
		Expose properties on the window.
		*/

		Object.assign(window, Globals);

		/*
		Start up persistence. This should happen as late as possible so that
		restoring variables overwrites defaults.
		*/

		Globals.persistence = new Persistence(Globals.story.name);

		/*
		If possible, resume from where the user last left off--otherwise, start
		from the beginning.
		*/

		if (Globals.persistence.canRestore()) {
			Globals.trail = new Trail(Globals.persistence.restore());
		}
		else {
			Globals.trail = new Trail();
		}

		/*
		Start the story.
		*/

		if (Globals.trail.length > 0) {
			Globals.view.show(Globals.render(Globals.trail.last));
			Globals.persistence.save(Globals.trail.passages);
		}
		else {
			Globals.restart();
		}
	},

	go(passageName) {
		Globals.trail.add(passageName);
		Globals.view.show(Globals.render(passageName));
		Globals.persistence.save(Globals.trail.passages);
	},

	render(passageName) {
		let passage = Globals.story.passage(passageName);

		if (!passage) {
			throw new Error(`There is no passage named "${passageName}".`);
		}

		const parsed = Globals.parser.parse(passage.source);
		const output = Globals.renderer.render(parsed);

		/* Remember vars that were set. */

		Object.keys(parsed.vars).forEach(v => Globals.persistence.remember(v));

		return output.html;
	},

	restart() {
		const passage = Globals.story.passages.find(
			p => p.id === Globals.story.startNode
		);

		if (!passage) {
			throw new Error(`There is no passsage with the ID ${Global.story.startNode}.`);
		}

		Globals.persistence.delete();
		Globals.trail.clear();
		Globals.go(passage.name);
	}
};