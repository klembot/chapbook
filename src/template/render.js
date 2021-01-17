/*
This "renders" a template as parsed by the `parser` module. It actually does
more than render it to HTML, as templates have side effects (e.g. changing
variables).
*/

import marked from 'marked';
import logger from '../logger';
import markdownRenderer from './markdown-renderer';
import renderInserts from './render-inserts';
import renderLinks from './render-links';
import {set} from '../state';

const {log} = logger('render');

export const markedOptions = {
	renderer: markdownRenderer,
	smartypants: true
};

export default function render(parsed, inserts, modifiers, ignoreVars = false) {
	if (!parsed.vars) {
		throw new Error('The renderer was given an object with no vars property.');
	}

	if (!parsed.blocks) {
		throw new Error(
			'The renderer was given an object with no blocks property.'
		);
	}

	let markdown = '';

	/* Dispatch variable changes. */

	if (!ignoreVars) {
		log(`Setting vars (${parsed.vars.length})`);

		parsed.vars.forEach(v => {
			if (v.condition) {
				const condition = v.condition();

				if (condition) {
					log(`Setting var "${name}" (condition is currently true)`);
					set(v.name, v.value());
				} else {
					log(`Not setting var "${name}" (condition is currently false)`);
				}
			} else {
				log(`Setting var "${name}"`);
				set(v.name, v.value());
			}
		});
	}

	/* Parse the blocks in sequence. */

	let activeModifiers = [];
	const modifierState = {};

	parsed.blocks.forEach(block => {
		switch (block.type) {
			case 'text': {
				let blockOutput = {
					text: block.content,
					startsNewParagraph: true
				};

				/* Allow active modifiers to process the raw source. */

				const rawModifiers = activeModifiers.filter(m => !!m.mod.processRaw);

				log(`Running ${rawModifiers.length} modifiers on raw source block`);

				rawModifiers.forEach(m => {
					m.mod.processRaw(blockOutput, {
						state: modifierState[m.mod],
						invocation: m.invocation
					});
				});

				/* Render inserts and links. */

				blockOutput.text = renderInserts(
					renderLinks(blockOutput.text),
					inserts
				);

				/*
				Allow active modifiers to process the source with inserts
				rendered. This is usually where modifiers do their work.
				*/

				const processedModifiers = activeModifiers.filter(m => !!m.mod.process);

				log(`Running ${processedModifiers.length} modifiers on source block`);

				processedModifiers.forEach(m =>
					m.mod.process(blockOutput, {
						state: modifierState[m.mod],
						invocation: m.invocation
					})
				);

				log(`Output after modifiers: ${JSON.stringify(blockOutput)}`);

				if (blockOutput.text.trim() !== '') {
					/*
					If we are appending to existing Markdown source, use the
					appropriate separator.
					*/

					if (markdown !== '') {
						markdown += blockOutput.startsNewParagraph ? '\n\n' : ' ';
					}

					markdown += blockOutput.text;
				}

				/*
				Clear modifiers so that the next set will start with a clean
				slate.
				*/

				activeModifiers = [];
				break;
			}

			case 'modifier': {
				/* Find all modifiers whose regexp matches this one's. */

				const mods = modifiers.filter(m => m.match.test(block.content));

				if (mods.length === 1) {
					const mod = mods[0];

					log(`Activated "${mod.name}" modifier matching [${block.content}]`);

					modifierState[mod] = modifierState[mod] || {};
					activeModifiers.push({
						mod,
						invocation: block.content
					});
				} else if (mods.length === 0) {
					/*
					No modifier matched; output the source as-is, as it might be
					something the author intended to display.
					*/

					markdown += `\n\n[${block.content}]\n\n`;
				} else {
					console.warn(`More than one modifier matched "[${block.content}]".`);

					markdown += `\n\n[${block.content}]\n\n`;
				}
				break;
			}

			default:
				throw new Error(
					`Don't know how to render a block with type "${block.type}".`
				);
		}
	});

	/*
	Close any whitespace between list items or forks. This can be a side effect of
	modifiers running.
	*/

	markdown = markdown.replace(/^((>|-|\*).*$)\n+\2/gm, '$1\n$2');

	/* Finally, render the Markdown to HTML. */

	marked.setOptions(markedOptions);
	log(`Final Markdown:\n${markdown}`);
	return marked(markdown);
}
