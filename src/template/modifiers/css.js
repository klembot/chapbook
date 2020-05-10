/*
Allows insertion of CSS directly, for just this passage.
*/

export default {
	match: /^css$/i,
	process(output) {
		output.text = `<style>${output.text}</style>`;
	}
};
