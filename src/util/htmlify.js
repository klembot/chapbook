// A tiny version of HyperScript (https://github.com/hyperhype/hyperscript).

export function domify(tagName, attrs, children = []) {
	const result = document.createElement(tagName);

	Object.keys(attrs).forEach(a => result.setAttribute(a, attrs[a]));

	children.forEach(c => {
		if (typeof c === 'string') {
			result.appendChild(document.createTextNode(c));
		} else {
			result.appendChild(c);
		}
	});

	return result;
}

export default function htmlify(...args) {
	return domify(...args).outerHTML;
}
