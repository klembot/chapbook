import HistoryTab from './history';
import StateTab from './state';
import StyleTab from './style';
import Tabs from './tabs';

export default class {
	constructor() {
		this.el = document.createElement('div');
		this.el.setAttribute('id', 'cb-debug');
		this.tabs = new Tabs();
		this.el.appendChild(this.tabs.el);
	}

	activate() {
		document.body.classList.add('with-debugger');
		document.body.append(this.el);
	}

	deactivate() {
		document.body.classList.remove('with-debugger');
		document.body.removeChild(this.el);
	}

	addDefaultTabs(globals) {
		new StateTab(
			this.tabs,
			globals.vars,
			globals.view,
			globals.story,
			globals.passage
		);
		new HistoryTab(this.tabs, globals.vars, globals.restart);
		new StyleTab(this.tabs, globals.vars, globals.view);
	}
}
