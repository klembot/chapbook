/*
A reveal link shows either text or a passage's contents when selected.
*/

import event from '../../event';
import htmlify from '../../util/htmlify';
import {passageNamed} from '../../story';
import {render} from '../index';

export default {
	match: /^reveal\s+link/i,
	render(label, props) {
		let current;

		if (props.text) {
			return htmlify(
				'a',
				{
					href: 'javascript:void(0)',
					'data-cb-reveal-text': props.text
				},
				[label]
			);
		}

		if (props.passage) {
			return htmlify(
				'a',
				{
					href: 'javascript:void(0)',
					'data-cb-reveal-passage': props.passage
				},
				[label]
			);
		}
	}
};

event.on('dom-click', el => {
	let source = el.dataset.cbRevealText;

	if (el.dataset.cbRevealPassage) {
		source = passageNamed(el.dataset.cbRevealPassage).source;
	}

	if (source) {
		const output = document.createElement('div');

		output.innerHTML = render(source);

		/*
		If the first node of the output is a <p>, substitute it inline for the
		link.
		*/

		if (output.firstChild.nodeName === 'P') {
			const text = document.createElement('span');

			text.innerHTML = output.firstChild.innerHTML;
			el.parentNode.insertBefore(text, el.nextSibling);
			output.removeChild(output.firstChild);
		}

		/*
		Append the rest of the output after the node that the link resides in--
		in most cases, after the paragraph that the link is in.
		*/

		while (output.firstChild) {
			el.parentNode.parentNode.insertBefore(
				output.firstChild,
				el.parentNode.nextSibling
			);
		}

		/*
		Remove the original link from the DOM.
		*/

		el.parentNode.removeChild(el);
	}
});
