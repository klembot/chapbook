import StateTab from './state';
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

	addDefaultTabs(vars, view, story, passage) {
		new StateTab(this.tabs, vars, view, story, passage);
	}
}
