import Alarm from './alarm';
import Debug from './debug';
import {createFactory as createColorFactory} from './author/color';
import {createFactory as createCodeFactory} from './author/code';
import {Image, createFactory as createImageFactory} from './author/image';
import {Input, createFactory as createInputFactory} from './author/input';
import {Link, createFactory as createLinkFactory} from './author/link';
import Modifiers from './modifiers';
import Parser from './template/parser';
import {createFactory as createPassageFactory} from './author/passage';
import Random from './author/random';
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
		doesn't blow away pre-existing data in local storage. We'll turn it back
		on below.
		*/

		Globals.vars = new Vars(Globals.story.name);
		Globals.vars.autosave = false;

		/*
		Set the testing variable based on story options. That is, publishing a
		story in test mode will trigger this.
		*/

		Globals.vars.set(
			'testing',
			typeof Globals.story.options === 'string' &&
				Globals.story.options.indexOf('debug') !== -1
		);

		/*
		Add error reporting; clear shown messages if the player moves to another
		passage.
		*/

		Globals.alarm = new Alarm(
			document.querySelector('.page .messages'),
			Globals.vars
		);

		/*
		Create template parsers and renderers.
		*/

		Globals.parser = new Parser();
		Globals.renderer = new Renderer(Globals.vars, Globals.alarm);
		Modifiers.addBuiltins(Globals.renderer);

		/*
		Connect our view to the DOM.
		*/

		Globals.view = new View(
			document.querySelector('.page article'),
			Globals.vars
		);
		Input.attachTo(Globals.view.el, Globals.vars);
		Link.attachTo(Globals.view.el, Globals.go);
		initStyle(Globals.vars);

		/*
		Set up the author-facing render function. We also use for the header and
		footer.
		*/

		Globals.code = createCodeFactory(Globals.parser, Globals.renderer);

		/*
		Set up header and footer.
		*/

		Globals.header = new SideMatter(
			document.querySelector('.page header'),
			Globals.code,
			Globals.vars
		);
		Globals.footer = new SideMatter(
			document.querySelector('.page footer'),
			Globals.code,
			Globals.vars
		);
		Globals.footer.left = '_`story.name`_';
		Globals.footer.right = "`link('Restart').restart()`";

		/* Set up the rest of the author functions. */

		Globals.debug = new Debug();
		Globals.color = createColorFactory();
		Globals.image = createImageFactory();
		Globals.link = createLinkFactory(Globals.vars);
		Globals.input = createInputFactory(Globals.vars);
		Globals.passage = createPassageFactory(
			Globals.story,
			Globals.parser,
			Globals.renderer
		);
		Globals.random = new Random();

		/*
		Expose properties on the window.
		*/

		Object.assign(window, Globals);

		/*
		If possible, resume from where the user last left off--otherwise, start
		from the beginning. This should occur as late as possible in
		initialization so that author-set values overwrite defaults.

		Exception: if we're in debug mode, start from scratch.
		*/

		if (!/\bdebug\b/.test(Globals.story.options)) {
			Globals.vars.restore();
		}
		Globals.vars.autosave = true;
		Globals.vars.default('trail', []);

		/*
		Start the story.
		*/

		const trail = Globals.vars.get('trail');

		if (trail.length > 0) {
			/* Just show the passage without creating a new history entry. */

			Globals.view.show(Globals.passage(trail[trail.length - 1]));
		} else {
			const startPassage = Globals.story.passages.find(
				p => p.id === Globals.story.startNode
			);

			if (startPassage) {
				Globals.go(startPassage.name);
			} else {
				throw new Error(
					`The start passage, with ID ${
						Globals.story.startNode
					}, does not exist.`
				);
			}
		}

		/*
		Activate the debugger if we're in debug mode.
		*/

		if (/\bdebug\b/.test(Globals.story.options) || true) {
			Globals.debug.activate();
			Globals.debug.addDefaultTabs(
				Globals.vars,
				Globals.view,
				Globals.story,
				Globals.passage
			);
		}

		/*
		Turn on CSS transitions for all appearance properties. We need to do
		this late so that there is no transition while we are setting things up
		initially.
		*/

		window.setTimeout(() => {
			document.querySelector('.page').classList.add('transition-all');
		}, 0);
	},

	go(passageName) {
		const trail = Globals.vars.get('trail');

		trail.push(passageName);

		Globals.vars.set('trail', trail);
		Globals.view.show(Globals.passage(passageName));
	},

	restart(prompt) {
		if (
			!window.confirm(
				'Are you sure you want to restart? This will erase all saved progress.'
			)
		) {
			return;
		}

		const passage = Globals.story.passages.find(
			p => p.id === Globals.story.startNode
		);

		if (!passage) {
			throw new Error(
				`There is no passsage with the ID ${Globals.story.startNode}.`
			);
		}

		Globals.vars.forgetAll();
		Globals.vars.set('trail', []);
		Globals.go(passage.name);
	}
};

export default Globals;
