// This is a template parser that processes text in a specific format:
//
// 1. An optional vars section that looks like this:
//
//    prop: value
//    prop: value
//    --
//
// 2. Then, a series of a mixture of plain text blocks and modifiers. Modifiers
//    exist on a single line that begins and ends with [ and ]. They affect the
//    following text block *only*. Text blocks are all other text.
//
//    Modifiers can be joined on a single line by placing a semicolon between
//    them, e.g. [modifier 1; modifier 2]
//
// This returns an object with two properties:
//
// - vars: a key => function structure, where the function evaluates to the
//   value the variable should set to
// - blocks: an array of {type, content} blocks

import splitLines from 'split-lines';
import logger from '../logger';

const {log, warn} = logger('parse');

const defaultOpts = {
	// The regexp matching the end of a vars section of source code.
	varsSep: /^--$/m,

	// The regexp matching a modifier block.
	modifierPattern: /^\[([^[].+[^\]])\]$/gm
};

export default function parse(src, opts = defaultOpts) {
	let result = {
		vars: {},
		blocks: []
	};

	// Does the source start with a vars section?

	let varsBits = src.split(opts.varsSep, 2);
	let vars, text;

	if (varsBits.length === 2) {
		log('Detected vars section');
		[vars, text] = varsBits;

		splitLines(vars).forEach(line => {
			if (line.trim() === '') {
				return;
			}

			const firstColon = line.indexOf(':');

			if (firstColon !== -1) {
				const name = line.substr(0, firstColon).trim();
				const value = line.substr(firstColon + 1).trim();

				if (result.vars[name] !== undefined) {
					warn(
						`The property "${name}" was defined more than once; using the last value.`
					);
				}

				log(`Setting prop "${name}" to "${value}"`);
				result.vars[name] = new Function(`return (${value})`);
			} else {
				warn(
					`The line "${line}" in the properties section is missing a colon. It was ignored.`
				);
			}
		});
	} else {
		log('No vars section detected');
		text = varsBits[0];
	}

	// Scan the text for modifiers. They always begin immediately with a
	// bracket. Because of the /g flag on the modifier pattern, successive
	// runs of exec() match each instance.

	const addBlock = (type, content) => {
		const trimmedContent = content.trim();

		if (trimmedContent === '') {
			return;
		}

		log(`Creating '${type}' block with content: "${trimmedContent}"`);
		result.blocks.push({type, content: trimmedContent});
	};

	const modifierPat = new RegExp(opts.modifierPattern);
	let searchIndex = 0;
	let modifierMatch = modifierPat.exec(text);

	while (modifierMatch) {
		addBlock('text', text.substring(searchIndex, modifierMatch.index));

		// Scan the modifier content for semicolons not inside quotation marks.
		// We cannot allow single quotes here because we allow modifiers such
		// as "cont'd".

		const modifierSrc = modifierMatch[1];
		let modifier = '';

		for (let i = 0; i < modifierSrc.length; i++) {
			switch (modifierSrc[i]) {
				case '"':
					// Scan ahead.

					modifier += '"';

					for (i = i + 1; i < modifierSrc.length; i++) {
						modifier += modifierSrc[i];

						if (
							modifierSrc[i] === '"' &&
							modifierSrc[i - 1] !== '\\'
						) {
							break;
						}
					}
					break;

				case ';':
					addBlock('modifier', modifier);
					modifier = '';
					break;

				default:
					modifier += modifierSrc[i];
			}
		}

		addBlock('modifier', modifier);
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
