// This "renders" a template as parsed by the `parser` module. It actually does
// more than render it to HTML, as templates have side effects (e.g. changing
// variables).

import marked from 'marked';
import logger from '../logger';
import markdownRenderer from './markdown-renderer';
import renderLinks from './render-links';

const {log, warn} = logger('render');

export const markedOptions = {
	renderer: markdownRenderer,
	smartypants: true
};

export default function render(
	parsed,
	modifiers,
	varSetter,
	ignoreVars = false
) {
	if (!parsed.vars) {
		throw new Error(
			'The renderer was given an object with no vars property.'
		);
	}

	if (!parsed.blocks) {
		throw new Error(
			'The renderer was given an object with no blocks property.'
		);
	}

	let markdown = '';

	// Dispatch variable changes as denoted by properties.

	if (!ignoreVars) {
		log(`Setting vars (${Object.keys(parsed.vars).length})`);

		Object.keys(parsed.vars).forEach(name => {
			log(`Setting var "${name}"`);
			varSetter(name, parsed.vars[name]());
		});
	}

	// Parse the blocks in sequence.

	let activeModifiers = [];
	const modifierState = {};

	parsed.blocks.forEach(block => {
		switch (block.type) {
			case 'text': {
				// We allow modifiers to change the text, as well as add text
				// before or after it. We allow this separation to keep the
				// original text intact.

				let blockOutput = {
					text: renderLinks(block.content),
					beforeText: '\n\n',
					afterText: ''
				};

				// Allow all active modifiers to alter the text.

				log(
					`Running ${activeModifiers.length} modifiers on text block`
				);

				activeModifiers.forEach(m =>
					m.process(blockOutput, {
						state: modifierState[m.mod],
						invocation: m.invocation
					})
				);

				markdown +=
					blockOutput.beforeText +
					blockOutput.text +
					blockOutput.afterText;

				log(`Output after modifiers: ${JSON.stringify(blockOutput)}`);

				// Clear modifiers so that the next set will start with a clean
				// slate.

				activeModifiers = [];
				break;
			}

			case 'modifier': {
				// Find all modifiers whose regexp matches this one's.

				const mods = modifiers.filter(m => m.match.test(block.content));

				if (mods.length === 1) {
					const mod = mods[0];

					log(
						`Activated "${mod.name}" modifier matching [${
							block.content
						}]`
					);

					modifierState[mod] = modifierState[mod] || {};
					activeModifiers.push({
						mod,
						data: modifierState[mod],
						invocation: block.content
					});
				} else if (mods.length === 0) {
					warn(
						`No modifiers matched "[${
							block.content
						}]". It was ignored.`
					);
				} else {
					warn(
						`More than one modifier matched "[${
							block.content
						}]". It was ignored.`
					);
				}
				break;
			}

			default:
				throw new Error(
					`Don't know how to render a block with type "${
						block.type
					}".`
				);
		}
	});

	// Finally, render the Markdown to HTML.

	marked.setOptions(markedOptions);
	return marked(markdown);
}
