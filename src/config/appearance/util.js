const colors = require('./colors');

module.exports = {
	autopx(value) {
		return typeof value === 'number' ? value + 'px' : value;
	},

	color(value) {
		return colors[value] || value;
	},

	cssify(selector, props) {
		return selector + '{' + Object.keys(props).reduce(
			(result, current) => result + current + ':' + props[current] + ';',
			''
		) + '}';
	}
}