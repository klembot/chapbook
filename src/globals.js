import Config from './config';
import Image from './image';
import Input from './input';
import {Link, linker} from './link';
import Modifiers from './modifiers';
import Parser from './template/parser';
import Persistence from './persistence';
import Random from './random';
import Renderer from './template/renderer';
import SideMatter from './side-matter';
import Story from './story';
import Trail from './trail';
import View from './view';

const Globals = {
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

		Globals.view = new View(document.querySelector('.page article'));
		attachPassageLinks(Globals.view.el, Globals.go);

		/*
		Load the story from the page's HTML.
		*/

		Globals.story = new Story();
		Globals.story.loadFromHtml(document.querySelector('tw-storydata'));

		Globals.config = Config;
		Globals.header = new SideMatter(document.querySelector('.page header'), Globals.render);
		Globals.footer = new SideMatter(document.querySelector('.page footer'), Globals.render);
		Globals.footer.left = '_`story.name`_';
		Globals.footer.right = '`link(\'Restart\').restart()`';
		Globals.image = Image;
		Globals.link = linker;
		Link.addPassageListener(Globals.view.el);
		Globals.input = Input;
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
			Globals.view.show(Globals.show(Globals.trail.last));
			Globals.persistence.save(Globals.trail.passages);
		}
		else {
			Globals.restart();
		}

		/* Update the header and footer. */

		Globals.header.update();
		Globals.footer.update();
	},

	render(source) {
		const parsed = Globals.parser.parse(source);
		const output = Globals.renderer.render(parsed);

		/* Remember vars that were set. */

		Object.keys(parsed.vars).forEach(v => Globals.persistence.remember(v));

		return output.html;
	},

	show(passageName) {
		let passage = Globals.story.passage(passageName);

		if (!passage) {
			throw new Error(`There is no passage named "${passageName}".`);
		}

		return Globals.render(passage.source);
	},

	go(passageName) {
		Globals.trail.add(passageName);
		Globals.view.show(Globals.show(passageName));
		Globals.persistence.save(Globals.trail.passages);

		/* The header and footer may have changed based on this. */

		Globals.header.update();
		Globals.footer.update();	
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

export default Globals;