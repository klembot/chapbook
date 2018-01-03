/*
Causes text to appear in the same paragraph as the one preceding it.
*/

class Append {
	setup() {}

	process(output) {
		output.beforeText = ' ';
	}
}

Append.regexps = [
	/^append$/i
];

module.exports = Append;