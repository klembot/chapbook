import {createLoggers} from '../logger';
import {ParseResult, VarDeclaration} from './types';

const {log, warn} = createLoggers('parse');

const defaultOpts = {
	// The regexp matching the end of a vars section of source code.
	varsSep: /^--$/m,

	// The regexp matching a modifier block.
	modifierPattern: /^\[([^[].+[^\]])\]$/gm
};

/**
 * A template parser that processes text in a specific format:
 *
 * 1. An optional vars section that looks like this:
 * ```
 * var1: value
 * var2: value
 * var2 (condition): value
 * --
 * ```
 *
 * Variable names may be repeated in the vars section.
 *
 * 2. Then, a series of a mixture of plain text blocks and modifiers. Modifiers
 * exist on a single line that begins and ends with `[` and `]`. They affect the
 * following text block *only*. Text blocks are all other text.
 *
 * Modifiers can be joined on a single line by placing a semicolon between
 * them, e.g. `[modifier 1; modifier 2]`
 *
 * This returns an object with two properties:
 *
 * - `vars`: a array of `{name, condition, value}` structures, where both `condition` and
 * `value` are functions. The `condition` evaluates to whether the value should be
 * set at all, and the `value` property evaluates to the value to set.
 * - blocks: an array of {type, content} blocks
 */
export function parse(src: string, opts = defaultOpts) {
	const result: ParseResult = {
		vars: [],
		blocks: []
	};

	// Does the source start with a vars section?

	const varsBits = src.split(opts.varsSep, 2);
	let vars, text;

	if (varsBits.length === 2) {
		log('Detected vars section');
		[vars, text] = varsBits;

		vars.split(/\r?\n/).forEach(line => {
			if (line.trim() === '') {
				return;
			}

			const firstColon = line.indexOf(':');

			if (firstColon !== -1) {
				const name = line.substring(0, firstColon).trim();
				const value = line.substring(firstColon + 1).trim();
				const thisVar: VarDeclaration = {
					name,
					value: new Function(`return (${value})`) as () => unknown
				};

				// Look for a `(condition)` in the name.

				const condMatch = name.match(/\(.+\)/);

				if (condMatch) {
					if (!condMatch.index) {
						throw new Error(
							`A condition was found in "${name}", but no index was present in the regular expression match.`
						);
					}

					thisVar.condition = new Function(
						`return !!(${condMatch[0]})`
					) as () => boolean;
					thisVar.name = thisVar.name.substring(0, condMatch.index).trim();
					log(
						`Setting variable "${thisVar.name}" to "${value}" with condition (${condMatch[0]})`
					);
				} else {
					log(`Setting variable "${name}" to "${value}" without condition`);
				}

				result.vars.push(thisVar);
			} else {
				warn(
					`The line "${line}" in the vars section is missing a colon. It was ignored.`
				);
			}
		});
	} else {
		log('No vars section detected');
		text = varsBits[0];
	}

	// Scan the text for modifiers. They always begin immediately with a bracket.
	// Because of the /g flag on the modifier pattern, successive runs of exec()
	// match each instance.

	function addBlock(type: 'modifier' | 'text', content: string) {
		const trimmedContent = content.trim();

		if (trimmedContent === '') {
			return;
		}

		log(`Creating '${type}' block with content: "${trimmedContent}"`);
		result.blocks.push({type, content: trimmedContent});
	}

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

						if (modifierSrc[i] === '"' && modifierSrc[i - 1] !== '\\') {
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

	// We've finished parsing modifiers; put any remaining text into a final
	// block.

	addBlock('text', text.substring(searchIndex));
	return result;
}
