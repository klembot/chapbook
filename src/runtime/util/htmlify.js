// A tiny version of HyperScript (https://github.com/hyperhype/hyperscript).

export function domify(tagName, attrs, children = []) {
	const result = document.createElement(tagName);

	for (const attr of Object.keys(attrs)) {
		if (attrs[attr] !== undefined) {
			result.setAttribute(attr, attrs[attr]);
		}
	}

	for (const child of children) {
		if (typeof child === 'string' || typeof child === 'number') {
			result.appendChild(document.createTextNode(child.toString()));
		} else {
			result.appendChild(child);
		}
	}

	return result;
}

export default function htmlify(...args) {
	return domify(...args).outerHTML;
}
