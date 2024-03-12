/**
 * A helper function to define custom elements.
 * @param elements - Dictionary of 'element-name': ElementClass elements
 */
export function defineElements(
	elements: Record<string, CustomElementConstructor>
) {
	for (const elementName in elements) {
		if (!window.customElements.get(elementName)) {
			window.customElements.define(
				elementName,
				elements[elementName as keyof typeof elements]
			);
		}
	}
}

/**
 * A base class for custom elements that contains shared functionality.
 */
export class CustomElement extends HTMLElement {
	/**
	 * Sets inner HTML if it's empty.
	 */
	defaultHtml(source: string) {
		if (this.innerHTML.trim() === '') {
			this.innerHTML = source;
		}
	}

	/**
	 * Responds to events on child elements.
	 */
	delegate(
		eventName: string,
		selector: string,
		callback: (event: Event, element: HTMLElement) => void
	) {
		this.addEventListener(eventName, event => {
			if (!event.target) {
				return;
			}

			const el = (event.target as HTMLElement).closest(selector);

			if (el) {
				callback(event, el as HTMLElement);
			}
		});

		// We should not need to clean this up since the listener is on ourselves.
	}

	/**
	 * Selects a child element, throwing an error if it can't be found.
	 */
	query<T = HTMLElement>(selector: string) {
		const result = this.querySelector(selector);

		if (!result) {
			throw new Error(`Couldn't find element matching "${selector}"`);
		}

		return result as T;
	}

	/**
	 * Selects all child elements matching a selector, returning an empty array if
	 * none match.
	 */
	queryAll(selector: string): HTMLElement[] {
		return [...this.querySelectorAll(selector)] as HTMLElement[];
	}
}
