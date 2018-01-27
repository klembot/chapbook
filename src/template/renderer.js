/*
This "renders" a template as parsed by the `parser` module. It actually does
more than render it to HTML, as templates have side effects (e.g. changing
variables).
*/

import marked from 'marked';
import set from 'lodash.set';
import CustomMarkdown from './custom-markdown';
import linkParser from './link-parser';

export default class {
	constructor(vars, opts = {}) {		
		/*
		If true, logs information to the console as it renders.
		*/
		this.verbose = false;

		/*
		Active modifiers.
		*/
		this.modifiers = [];

		/*
		Options passed to the `marked` module in the `toHtml()` function.
		*/

		this.markedOptions = {
			renderer: CustomMarkdown,
			smartypants: true
		};

		Object.assign(this, opts);
		this.vars = vars;
	}

	/*
	Adds a modifier class to the rendering process. During each render, a new
	instance of the modifier will be created. This is to allow a modifier to
	remember state between invocations.
	*/

	addModifier(name, modifier) {
		/* Check for repeats. */

		if (this.modifiers.some(m => m.name === name)) {
			throw new Error(`A modifier named "${name}" has already been added to this renderer`);
		}

		if (!modifier.regexps || !modifier.regexps.length) {
			throw new Error(`A modifier must have a static regexps property`);
		}

		modifier.regexps.forEach(
			regexp => this.modifiers.push({name, regexp, modifier})
		);
	}

	/*
	Removes a modifier class from the rendering process.
	*/

	removeModifier(name) {
		const oldLen = this.modifiers.length;

		this.modifiers = this.modifiers.filter(m => m.name !== name);

		if (this.modifiers.length === oldLen) {
			throw new Error(`A modifier named "${name}" does not exist in this renderer`);
		}
	}

	/*
	As a final step, the text blocks concatenated are run through this function
	to convert the source to HTML. By default, this runs the text through `marked`.
	*/

	toHtml(source) {
		marked.setOptions(this.markedOptions);
		return marked(source);
	}

	/*
	The main render process. Returns an object with markdown, html, warnings,
	and errors properties.
	*/

	render(parsed) {
		let output = {
			markdown: '',
			html: '',
			warnings: parsed.warnings || [],
			errors: parsed.errors || []
		};

		/*
		Set global variables as denoted by properties.
		*/

		if (parsed.vars) {
			if (this.verbose) {
				console.log(`Setting vars...`, parsed.vars);
			}

			Object.keys(parsed.vars).forEach(name => {
				if (this.verbose) {
					console.log(`Setting var "${name}"`);
				}

				this.vars.set(name, new Function('return ' + parsed.vars[name])());
			});
		}
		else {
			console.warn('Renderer was given an object with no vars');
		}

		/*
		Parse the blocks in sequence.
		*/

		let activeModifiers = [];
		let modifierInstances = {};

		/*
		Tiny functions we give to active modifiers to allow adding warnings and errors.
		*/

		const modifierOpts = {
			addWarning(message) { output.warnings.push(message); },
			addError(message) { output.errors.push(message); }
		};

		if (parsed.blocks) {
			parsed.blocks.forEach(block => {
				switch (block.type) {
					case 'text': {
						/*
						We allow modifiers to change the text, as well as add text
						before or after it. We allow this separation to keep the
						original text intact.
						*/

						let blockOutput = {
							text: linkParser(block.content),
							beforeText: '\n\n',
							afterText: ''
						};

						/*
						Allow all active modifiers to alter the text, then clear
						them so that the next set of modifiers will start with a
						clean slate.
						*/

						if (this.verbose) {
							console.log(`Running ${activeModifiers.length} modifiers on text block...`);
							activeModifiers.forEach(m => {
								m.process(blockOutput, modifierOpts);
								console.table(blockOutput);
							});
						}
						else {
							activeModifiers.forEach(m => m.process(blockOutput, modifierOpts));
						}

						output.markdown += blockOutput.beforeText + blockOutput.text +
							blockOutput.afterText;
						activeModifiers = [];

						if (this.verbose) {
							console.log(`Output after modifiers:`);
							console.table(blockOutput);
						}
						break;
					}

					case 'modifier': {
						/* Find all modifiers whose regexp matches this one's. */

						const mods = this.modifiers.filter(
							m => m.regexp.test(block.content)
						);

						if (mods.length === 1) {
							const mod = mods[0];

							if (this.verbose) {
								console.log(`Activated "${mod.name}" modifier matching [${block.content}]`);
							}

							if (!modifierInstances[mod.name]) {
								if (this.verbose) {
									console.log(`Creating new instance of "${mod.name}" modifier`);
								}

								modifierInstances[mod.name] = new mod.modifier();
							}

							modifierInstances[mod.name].setup(block.content);
							activeModifiers.push(modifierInstances[mod.name]);
						}
						else if (mods.length === 0) {
							output.warnings.push(`No modifiers matched "[${block.content}]". It was ignored.`);
						}
						else {
							output.warnings.push(`More than one modifier matched "[${block.content}]". It was ignored.`);
						}
						break;
					}

					default:
						throw new Error(
							`Don't know how to render a block with type "${block.type}".`
						);
				}
			});
		}
		else {
			console.warn('Renderer was given an object with no blocks');
		}

		output.html = this.toHtml(output.markdown);
		return output;
	}
};