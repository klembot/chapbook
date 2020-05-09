// Causes text to appear in the same paragraph as the one preceding it.

export default {
	match: /^append$/i,
	process(output) {
		output.startsNewParagraph = false;
	},
};
