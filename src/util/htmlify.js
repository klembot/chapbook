// A tiny version of HyperScript (https://github.com/hyperhype/hyperscript).

export default function htmlify(tagName, attrs, children = []) {
	const result = document.createElement(tagName);

	attrs.forEach(a => result.setAttribute(a, attrs[a]));
	children.forEach(c => {
		if (typeof c === 'string') {
			result.appendChild(document.createTextNode(c));
		} else {
			result.appendChild(c);
		}
	});

	return result.outerHTML;
}
