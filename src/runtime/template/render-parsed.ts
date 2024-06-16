import {marked} from 'marked';
import {createLoggers} from '../logger';
import {set} from '../state';
import {Insert} from './inserts';
import {markdownRenderer} from './markdown-renderer';
import {Modifier} from './modifiers';
import renderInserts from './render-inserts';
import {renderLinks} from './links';
import {ParseResult} from './types';

const {log} = createLoggers('render');

export const markedOptions = {
	renderer: markdownRenderer,
	smartypants: true
};

/**
 * This "renders" a template as parsed by the `parser` module. It actually does
 * more than render it to HTML, as templates have side effects (e.g. changing
 * variables).
 * @param parsed - parsed source to render
 * @param inserts - possible inserts to use when rendering
 * @param modifiers - possible modifiers to use when rendering
 * @param ignoreVars - don't set variables?
 */
export function renderParsed(
	parsed: ParseResult,
	inserts: Insert[],
	modifiers: Modifier[],
	ignoreVars = false
) {
	if (!parsed.vars) {
		throw new Error('The renderer was given an object with no vars property.');
	}

	if (!parsed.blocks) {
		throw new Error(
			'The renderer was given an object with no blocks property.'
		);
	}

	let markdown = '';

	// Dispatch variable changes.

	if (!ignoreVars) {
		log(`Setting vars (${parsed.vars.length})`);

		for (const variable of parsed.vars) {
			if (variable.condition) {
				const condition = variable.condition();

				if (condition) {
					log(`Setting var "${variable.name}" (condition is currently true)`);
					set(variable.name, variable.value());
				} else {
					log(
						`Not setting var "${variable.name}" (condition is currently false)`
					);
				}
			} else {
				log(`Setting var "${variable.name}"`);
				set(variable.name, variable.value());
			}
		}
	}

	// Parse the blocks in sequence.

	let activeModifiers = [];
	const modifierState: Map<Modifier, Record<string, unknown>> = new Map();

	for (const block of parsed.blocks) {
		switch (block.type) {
			case 'text': {
				const blockOutput = {
					text: block.content,
					startsNewParagraph: true
				};

				// Allow active modifiers to process the raw source.

				const rawModifiers = activeModifiers.filter(
					m => !!m.modifier.processRaw
				);

				log(`Running ${rawModifiers.length} modifiers on raw source block`);

				for (const {invocation, modifier} of rawModifiers) {
					const state = modifierState.get(modifier);

					if (!state) {
						throw new Error(
							'State for a modifier was unknown, but should have had a value.'
						);
					}

					if (!modifier.processRaw) {
						throw new Error(
							'A modifier was added to the raw modifiers list, but it has no processRaw function.'
						);
					}

					modifier.processRaw(blockOutput, {state, invocation});
				}

				blockOutput.text = renderInserts(
					renderLinks(blockOutput.text),
					inserts
				);

				// Allow active modifiers to process the source with inserts rendered.
				// This is usually where modifiers do their work.

				const processedModifiers = activeModifiers.filter(
					m => !!m.modifier.process
				);

				log(`Running ${processedModifiers.length} modifiers on source block`);

				for (const {invocation, modifier} of processedModifiers) {
					const state = modifierState.get(modifier);

					if (!state) {
						throw new Error(
							'State for a modifier was unknown, but should have had a value.'
						);
					}

					if (!modifier.process) {
						throw new Error(
							'A modifier was added to the processed modifiers list, but it has no process function.'
						);
					}

					modifier.process(blockOutput, {state, invocation});
				}

				log(`Output after modifiers: ${JSON.stringify(blockOutput)}`);

				if (blockOutput.text.trim() !== '') {
					// If we are appending to existing Markdown source, use the
					// appropriate separator.

					if (markdown !== '') {
						markdown += blockOutput.startsNewParagraph ? '\n\n' : ' ';
					}

					markdown += blockOutput.text;
				}

				// Clear modifiers so that the next set will start with a clean slate.

				activeModifiers = [];
				break;
			}

			case 'modifier': {
				// Find all modifiers whose regexp matches this one's.

				const mods = modifiers.filter(m => m.match.test(block.content));

				if (mods.length === 1) {
					const modifier = mods[0];

					log(`Activated modifier matching [${block.content}]`);

					// Set up initial state for the modifier.

					if (!modifierState.has(modifier)) {
						modifierState.set(modifier, {});
					}

					activeModifiers.push({modifier, invocation: block.content});
				} else if (mods.length === 0) {
					// No modifier matched; output the source as-is, as it might be
					// something the author intended to display.

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
	}

	// Close any whitespace between list items or forks. This can be a side effect
	// of modifiers running.

	const multipleLinesBetweenItems = /^((>|-|(\*\s)).*$)\n{2,}\2/gm;

	while (multipleLinesBetweenItems.test(markdown)) {
		markdown = markdown.replace(multipleLinesBetweenItems, '$1\n$2');
	}

	// Finally, render the Markdown to HTML.

	marked.setOptions(markedOptions);
	log(`Final Markdown:\n${markdown}`);
	return marked(markdown);
}
