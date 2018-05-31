/*
A lightweight JavaScript interface for adding stylesheets to the DOM. Its main
interface is its rules property, which stores selector => rules pairs. For
example:

this.rules['body p'] = {color: 'red', 'font-size': 18};

This creates CSS rules as-is; you must use the key 'font-size', not fontSize.
*/

export default class {
	constructor(rules = {}) {
		this.el = document.createElement('style');
		document.head.appendChild(this.el);
		this.rules = rules;
	}

	/*
	Coerces a number to a pixel value.
	*/

	autopx(value) {
		return typeof value === 'number' ? value + 'px' : value;
	}

	/*
	Updates the DOM <style> element to reflect the rules property.
	*/

	update() {
		function cssify(selector, props) {
			return (
				selector +
				'{' +
				Object.keys(props).reduce(
					(result, current) => result + current + ':' + props[current] + ';',
					''
				) +
				'}'
			);
		}

		this.el.innerHTML = Object.keys(this.rules).reduce(
			(result, rule) => result + cssify(rule, this.rules[rule]),
			''
		);
	}

	/*
	Removes the stylesheet from the DOM.
	*/

	detach() {
		document.head.removeChild(this.el);
	}
}
