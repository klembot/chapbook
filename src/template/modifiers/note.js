/*
This modifier allows entering text that won't be displayed to the player. It can
be written as [note], [note to self], [n.b.], [nb], [todo], or [fixme].
*/

export default {
	match: /^(note(\s+to\s+self)?|n?b?|todo|fixme)$/i,
	process(output) {
		output.text = '';
	},
};
