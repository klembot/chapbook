import Current from './current';

export default class {
	constructor(tabs, vars, restart) {
		const contentEl = tabs.add('History');

		contentEl.appendChild(new Current(vars, restart).el);
	}
}
