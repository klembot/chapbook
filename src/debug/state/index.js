import Snapshots from './snapshots';
import Vars from './vars';

export default class {
	constructor(tabs) {
		const contentEl = tabs.add('State');

		contentEl.appendChild(new Vars(vars).el);
		contentEl.appendChild(new Snapshots(vars, view, story, passage).el);
	}
}
