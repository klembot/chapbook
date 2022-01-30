import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import mode from './twine/codemirror-mode';
import parseReferences from './twine/parse-references';

CodeMirror.defineMode('chapbook', mode);

const cm = CodeMirror.fromTextArea(document.querySelector('textarea'), {
	lineWrapping: true,
	mode: 'chapbook'
});

function updateReferences() {
	document.querySelector('#references').innerHTML = parseReferences(
		cm.getValue()
	).reduce((result, ref) => result + `<li>${ref}</li>`, '');
}

cm.on('change', updateReferences);
updateReferences();
