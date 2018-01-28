import Image from './image';
import Input from './input';
import {Link, factory as linkFactory} from './link';
import Modifiers from './modifiers';
import Parser from './template/parser';
import Random from './random';
import Renderer from './template/renderer';
import SideMatter from './side-matter';
import Story from './story';
import {init as initStyle} from './style';
import Vars from './vars';
import View from './view';

const Globals = {
	init() {
		/*
		Load the story from the page's HTML.
		*/

		Globals.story = new Story();
		Globals.story.loadFromHtml(document.querySelector('tw-storydata'));

		/*
		Create our variable tracker. We want this to occur as early as possible
		because other modules depend on it. We turn off autosaving so any setup
		doesn't blow away pre-existing data in local storage.
		*/

		Globals.vars = new Vars(Globals.story.name);
		Globals.vars.autosave = false;

		/*
		Create template parsers and renderers.
		*/

		Globals.parser = new Parser();
		Globals.renderer = new Renderer(Globals.vars);
		Modifiers.addBuiltins(Globals.renderer);

		/*
		Connect our view to the DOM.
		*/

		Globals.view = new View(document.querySelector('.page article'));
		Link.addPassageListener(Globals.view.el, Globals.go);
		initStyle(Globals.vars);

		Globals.header = new SideMatter(
			document.querySelector('.page header'),
			Globals.render,
			Globals.vars
		);
		Globals.footer = new SideMatter(
			document.querySelector('.page footer'),
			Globals.render,
			Globals.vars
		);
		Globals.footer.left = '_`story.name`_';
		Globals.footer.right = '`link(\'Restart\').restart()`';
		Globals.image = Image;
		Globals.link = linkFactory;
		Globals.input = Input;
		Globals.random = new Random();

		/*
		Expose properties on the window.
		*/

		Object.assign(window, Globals);

		/*
		If possible, resume from where the user last left off--otherwise, start
		from the beginning. This should occur as late as possible in
		initialization so that author-set values overwrite defaults.
		*/
		
		Globals.vars.restore();
		Globals.vars.autosave = true;
		Globals.vars.default('trail', []);

		/*
		Start the story.
		*/

		const trail = Globals.vars.get('trail');

		if (trail.length > 0) {
			/* Just show the passage without creating a new history entry. */

			Globals.view.show(Globals.show(trail[trail.length - 1]));
		}
		else {
			const startPassage = Globals.story.passages.find(
				p => p.id === Globals.story.startNode
			);

			if (startPassage) {
				Globals.go(startPassage.name);
			}
			else {
				throw new Error(`The start passage, with ID ${Global.story.startNode}, does not exist.`);
			}
		}
	},

	render(source) {
		return Globals.renderer.render(Globals.parser.parse(source)).html;
	},

	show(passageName) {
		let passage = Globals.story.passage(passageName);

		if (!passage) {
			throw new Error(`There is no passage named "${passageName}".`);
		}

		return Globals.render(passage.source);
	},

	go(passageName) {
		const trail = Globals.vars.get('trail');

		trail.push(passageName);

		Globals.vars.set('trail', trail);
		Globals.view.show(Globals.show(passageName));	
	},

	restart() {
		const passage = Globals.story.passages.find(
			p => p.id === Globals.story.startNode
		);

		if (!passage) {
			throw new Error(`There is no passsage with the ID ${Global.story.startNode}.`);
		}

		Globals.vars.forgetAll();
		Globals.vars.set('trail', []);
		Globals.go(passage.name);
	}
};

export default Globals;