import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import {mode} from './codemirror-mode';
import {parsePassageText} from './parse-references';

CodeMirror.defineMode('chapbook', mode);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cm = CodeMirror.fromTextArea(document.querySelector('textarea')!, {
	lineWrapping: true,
	mode: 'chapbook'
});

function updateReferences() {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.querySelector('#references')!.innerHTML = parsePassageText(
		cm.getValue()
	).reduce((result, ref) => result + `<li>${ref}</li>`, '');
}

cm.on('change', updateReferences);
updateReferences();

// Place the instance into global scope for testing.

(window as any).cm = cm;
