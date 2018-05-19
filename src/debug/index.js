import Panel from './panel';
import StatePanel from './state';

export default class {
	constructor() {
		this.el = document.createElement('div');
		this.el.setAttribute('id', 'cb-debug');
	}

	activate() {
		document.body.classList.add('with-debugger');
		document.body.append(this.el);
	}

	deactivate() {
		document.body.classList.remove('with-debugger');
		document.body.removeChild(this.el);
	}

	addDefaultPanels(vars) {
		const statePanel = new StatePanel(vars);

		statePanel.open();
		this.addPanel(statePanel);
	}

	addPanel(titleOrPanel) {
		let panel = titleOrPanel;

		if (typeof titleOrPanel === 'string') {
			panel = new Panel(title);
		}

		this.el.appendChild(panel.el);
		return panel;
	}
}
