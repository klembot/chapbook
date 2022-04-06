import mode from './codemirror-mode';
import commands from './codemirror-commands';
import toolbar from './codemirror-toolbar';
import parsePassageText from './parse-references';

export default {
	'^2.4.0-beta2': {
		codeMirror: {commands, mode, toolbar},
		references: {parsePassageText}
	}
};
