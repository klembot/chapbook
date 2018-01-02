/*
This "renders" a template as parsed by the `parser` module. It actually does
more than render it to HTML, as templates have side effects (e.g. changing
variables).
*/

const marked = require('marked');
const EvalCodeRenderer = require('./eval-code-renderer');
const {parse:parsePassageLinks} = require('./passage-links');

module.exports = class {
	constructor(opts = {}) {
		/*
		If true, logs information to the console as it renders.
		*/
		this.verbose = false;

		/*
		Active directives.
		*/
		this.directives = [];

		/*
		Options passed to the `marked` module in the `toHtml()` function.
		*/

		this.markedOptions = {
			renderer: EvalCodeRenderer,
			smartypants: true
		};

		Object.assign(this, opts);
	}

	/*
	Adds a directive class to the rendering process. During each render, a new
	instance of the directive will be created. This is to allow a directive to
	remember state between invocations.
	*/

	addDirective(name, regexp, directive) {
		/* Check for repeats. */

		if (this.directives.some(d => d.name === name)) {
			throw new Error(`A directive named "${name}" has already been added to this renderer`);
		}

		this.directives.push({name, regexp, directive});
	}

	/*
	Removes a directive class from the rendering process.
	*/

	removeDirective(name) {
		const oldLen = this.directives.length;

		this.directives = this.directives.filter(d => d.name !== name);

		if (this.directives.length === oldLen) {
			throw new Error(`A directive named "${name}" does not exist in this renderer`);
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

		if (parsed.props) {
			Object.keys(parsed.props).forEach(name => {
				window[name] = eval(parsed.props[name]);
			});
		}
		else {
			console.warn('Renderer was given an object with no props');
		}

		/*
		Parse the blocks in sequence.
		*/

		let activeDirectives = [];
		let directiveInstances = {};

		/*
		Tiny functions we give to active directives to allow adding warnings and errors.
		*/

		const directiveOpts = {
			addWarning(message) { output.warnings.push(message); },
			addError(message) { output.errors.push(message); }
		};

		if (parsed.blocks) {
			parsed.blocks.forEach(block => {
				switch (block.type) {
					case 'text': {
						/*
						We allow directives to change the text, as well as add text
						before or after it. We allow this separation to keep the
						original text intact.
						*/

						let blockOutput = {
							text: parsePassageLinks(block.content),
							beforeText: '',
							afterText: '\n\n'
						};

						/*
						Allow all active directives to alter the text, then clear
						them so that the next set of directives will start with a
						clean slate.
						*/

						if (this.verbose) {
							console.log(`Running ${activeDirectives.length} directives on text block...`);
							activeDirectives.forEach(d => {
								d.process(blockOutput, directiveOpts);
								console.table(blockOutput);
							});
						}
						else {
							activeDirectives.forEach(d => d.process(blockOutput, directiveOpts));
						}

						output.markdown += blockOutput.beforeText + blockOutput.text +
							blockOutput.afterText;
						activeDirectives = [];

						if (this.verbose) {
							console.log(`Output after directives:`);
							console.table(blockOutput);
						}
						break;
					}

					case 'directive': {
						/* Find all directives whose regexp matches this one's. */

						const dirs = this.directives.filter(
							d => d.regexp.test(block.content)
						);

						if (dirs.length === 1) {
							const dir = dirs[0];

							if (this.verbose) {
								console.log(`Activated "${dir.name}" directive matching [${block.content}]`);
							}

							if (!directiveInstances[dir.name]) {
								if (this.verbose) {
									console.log(`Creating new instance of "${dir.name}" directive`);
								}

								directiveInstances[dir.name] =
									new dir.directive();
							}

							activeDirectives.push(directiveInstances[dir.name]);
						}
						else if (dirs.length === 0) {
							output.warnings.push(`No directives matched "[${block.content}]". It was ignored.`);
						}
						else {
							output.warnings.push(`More than one directive matched "[${block.content}]". It was ignored.`);
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