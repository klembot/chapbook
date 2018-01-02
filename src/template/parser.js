/*
This is a template parser that processes text in a specific format:

1. An optional props section that looks like this:

	prop: value
	prop: value
	--

2. Then, a series of a mixture of plain text blocks and modifiers. Modifiers
   exist on a single line that begins and ends with [ and ]. They affect the
   following text block *only*. Text blocks are all other text.
*/

const splitLines = require('split-lines');

module.exports = class {
	constructor(opts = {}) {
		/*
		If true, logs information to the console as it parses.
		*/
		this.verbose = false;
	
		/*
		The regexp matching the end of a props section of source code.
		*/
		this.propsSep = /^--$/m;

		/*
		The regexp matching a modifier block.
		*/
		this.modifierPattern = /^\[(.+)\]$/gm;

		Object.assign(this, opts);
	}

	/*
	Parses a source string into a structured object:
		props: a key => value structure
		blocks: an array of {type, content} blocks
		warnings: an array of warning strings
	*/
	parse(src) {
		let result = {
			props: {},
			blocks: [],
			warnings: []
		};

		/* Does the source start with a props section? */

		let propsBits = src.split(this.propsSep, 2);
		let props, text;

		if (propsBits.length === 2) {
			if (this.verbose) {
				console.log('Props section detected');
			}

			[props, text] = propsBits;

			splitLines(props).forEach(line => {
				if (line.trim() === '') {
					return;
				}

				const firstColon = line.indexOf(':');

				if (firstColon !== -1) {
					const name = line.substr(0, firstColon).trim();
					const value = line.substr(firstColon + 1).trim();
	
					if (result.props[name] !== undefined) {
						result.warnings.push(
							`The property "${name}" was defined more than once; using the last value.`
						);
					}

					if (this.verbose) {
						console.log(`Setting prop "${name}" to "${value}"`);
					}

					result.props[name] = value;
				}
				else {
					result.warnings.push(
						`The line "${line}" in the properties section is missing a colon. It was ignored.`
					);
				}
			});
		}
		else {
			if (this.verbose) {
				console.log('No props section detected');
			}

			text = propsBits[0];
		}

		/*
		Scan the text for modifiers. They always begin immediately with a
		bracket. Because of the /g flag on the modifier pattern, successive
		runs of exec() match each instance.
		*/

		const addBlock = (type, content) => {
			const trimmedContent = content.trim();

			if (trimmedContent === '') {
				return;
			}

			if (this.verbose) {
				console.log(`Creating '${type}' block with content: "${trimmedContent}"`);
			}

			result.blocks.push({type, content: trimmedContent});
		};

		const modifierPat = new RegExp(this.modifierPattern);
		let searchIndex = 0;
		let modifierMatch = modifierPat.exec(text);

		while (modifierMatch) {
			addBlock('text', text.substring(searchIndex, modifierMatch.index));
			addBlock('modifier', modifierMatch[1]);
			searchIndex = modifierPat.lastIndex;
			modifierMatch = modifierPat.exec(text);
		}

		/*
		We've finished parsing modifiers; put any remaining text into a final
		block.
		*/

		addBlock('text', text.substring(searchIndex));
		return result;
	}
};