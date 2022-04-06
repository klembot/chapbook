export default () => ({
	startState() {
		return {inVarsSection: false};
	},
	token(stream, state) {
		if (state.hasVarsSection === undefined) {
			// Scan forward to see if there's any vars section at all.

			for (
				let i = 1, nextLine = stream.lookAhead(1);
				nextLine && state.hasVarsSection === undefined;
				nextLine = stream.lookAhead(++i)
			) {
				if (nextLine === '--') {
					state.hasVarsSection = true;
					state.inVarsSection = true;
				}
			}

			// If we didn't find it already, it doesn't exist.

			if (state.hasVarsSection === undefined) {
				state.hasVarsSection = false;
			}
		}

		if (state.hasVarsSection && state.inVarsSection) {
			// We're in the vars section.

			if (stream.sol()) {
				if (stream.match(/^--$/)) {
					state.inVarsSection = false;
					return 'punctuation';
				} else {
					stream.skipTo(':');
					return 'def';
				}
			}
		}

		// We're in body text.

		// Modifiers are on a line by themselves.
		
		if (stream.sol() && stream.match(/^\[[^[].*\]$/)) {
			return 'keyword';
		}

		// Are we at an insert?

		if (stream.match(/^\{.+?\}/)) {
			return 'keyword';
		}

		// Are we at a link?

		if (stream.match(/^\[\[[^\]]+?\]\]/)) {
			return 'link';
		}

		// Try scanning forward to an insert or link.

		if (stream.eatWhile(/[^[{]/)) {
			return 'text';
		}

		// If not, the line just holds plain text.

		stream.skipToEnd();
		return 'text';
	}
});
