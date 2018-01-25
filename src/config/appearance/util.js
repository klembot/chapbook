import colors from './colors';

function autopx(value) {
	return typeof value === 'number' ? value + 'px' : value;
}

function color(value) {
	return colors[value] || value;
}

function cssify(selector, props) {
	return selector + '{' + Object.keys(props).reduce(
		(result, current) => result + current + ':' + props[current] + ';',
		''
	) + '}';
}

export {autopx, color, cssify};