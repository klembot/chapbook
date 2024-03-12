/**
 * A tiny version of HyperScript (https://github.com/hyperhype/hyperscript).
 * @param tagName - name of the tag to create, like `div`
 * @param attributes - dictionary of attributes to set on the children
 * @param children - text or child elements to append
 */
export function domify(
	tagName: string,
	attributes?: Record<string, string | undefined>,
	children: (string | number | Element)[] = []
) {
	const result = document.createElement(tagName);

	if (attributes) {
		for (const attribute of Object.keys(attributes)) {
			if (attributes[attribute] !== undefined) {
				// Don't understand why TypeScript flags this.
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				result.setAttribute(attribute, attributes[attribute]!);
			}
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

/**
 * Like domify(), but returns the HTML for a constructed element instead of the
 * element itself.
 */
export function htmlify(...args: Parameters<typeof domify>) {
	return domify(...args).outerHTML;
}
