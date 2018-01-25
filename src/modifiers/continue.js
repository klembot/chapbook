/*
A no-op modifier used to reset other modifiers.
*/

class Continue {
	setup() {}
	process() {}
}

Continue.regexps = [
	/^continued$/i,
	/^continue$/i,
	/^cont'd$/i,
	/^cont$/i
];

export default Continue;