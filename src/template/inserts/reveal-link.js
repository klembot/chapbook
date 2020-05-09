/*
A reveal link shows either text or a passage's contents when selected.
*/

import {changeBody} from '../../display';
import event from '../../event';
import htmlify from '../../util/htmlify';
import {passageNamed} from '../../story';
import {render} from '../index';

export default {
	match: /^reveal\s+link/i,
	render(label, props) {
		if (props.text) {
			return htmlify(
				'a',
				{
					href: 'javascript:void(0)',
					'data-cb-reveal-text': props.text,
				},
				[label]
			);
		}

		if (props.passage) {
			return htmlify(
				'a',
				{
					href: 'javascript:void(0)',
					'data-cb-reveal-passage': props.passage,
				},
				[label]
			);
		}
	},
};

/*
Finds the first parent of an element that has block styling. If none exists,
this returns null.
*/

function findBlockParent(el) {
	let parent = el.parentNode;

	while (parent) {
		let display = window.getComputedStyle(parent).display;

		if (
			display === 'block' ||
			display === 'flex' ||
			display === 'inline-block' ||
			display === 'table' ||
			display === 'list-item'
		) {
			return parent;
		}

		parent = parent.parentNode;
	}

	return null;
}

event.on('dom-click', el => {
	let source = el.dataset.cbRevealText;

	if (el.dataset.cbRevealPassage) {
		source = passageNamed(el.dataset.cbRevealPassage).source;
	}

	if (source) {
		const output = document.createElement('div');

		/*
		Need to trim() this to avoid spurious empty text nodes at the end.
		*/

		output.innerHTML = render(source).trim();

		/*
		Output contains only block-level elements as its children. We know this
		because when we render source, it always comes wrapped in block
		elements; a bare link in a paragraphy by itself, for example, gets
		rendered with a <p> container by marked.
		*/

		changeBody(() => {
			const toInsert = output.children.length;

			if (toInsert > 0) {
				/*
				Put the first child where the link was in the DOM. Set its display
				as inline to make it imitate the link's layout.
				*/

				const firstInsert = document.createElement('span');

				firstInsert.innerHTML = output.firstChild.innerHTML;
				el.parentNode.insertBefore(firstInsert, el);
				output.removeChild(output.firstChild);

				if (toInsert > 1) {
					/*
					If there are other block elements, place them as siblings of the
					parent.
					*/

					const lastInsert = output.lastChild;

					while (output.lastChild) {
						// if (output.innerHTML !== '') {
						// 	console.log('setting lastInsert', output.firstChild);
						// 	lastInsert = output.firstChild;
						// }

						el.parentNode.parentNode.insertBefore(
							output.lastChild,
							el.parentNode.nextSibling
						);
					}

					/*
					Move any inline elements after the link we just expanded to
					the end of the last newly-inserted block element. Otherwise,
					they'll be sandwiched in by the new insert and order of
					content won't be preserved.
					*/

					console.log(lastInsert, lastInsert.innerHTML);

					while (el.nextSibling) {
						console.log('moving', el.nextSibling);
						lastInsert.insertBefore(el.nextSibling, null);
					}
				}
			}

			/*
			Remove the original link from the DOM.
			*/

			el.parentNode.removeChild(el);
		});
	}
});
