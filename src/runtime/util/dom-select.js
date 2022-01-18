// Shorthands for querySelector() and friends.

export function select(el, selector) {
	return el.querySelector(selector);
}

export function selectAll(el, selector) {
	return Array.from(el.querySelectorAll(selector));
}
