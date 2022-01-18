export default () => ({
	startState() {
		return {};
	},
	token(stream, state) {
		console.log('CodeMirror mode stream', stream);
		console.log('CodeMirror mode state', state);
		stream.skipToEnd();
		return 'keyword';
	}
});
