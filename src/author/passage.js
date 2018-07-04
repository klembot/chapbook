// Author functions for working with passages.

import factoryFor from '../util/class-factory';
import {passages} from '../story';
import {render} from '../template';

export class Passage {
	constructor(name) {
		Object.assign(this, passages.find(p => p.name === name));
	}

	toString() {
		return render(this.source);
	}
}

export default factoryFor(Passage);
