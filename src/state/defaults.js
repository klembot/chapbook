// Manages default state.

import {defaults as displayDefaults} from '../display';
import {defaults as loggerDefaults} from '../logger';
import {defaults as randomDefaults} from '../author/random';
import {defaults as stateDefaults, setDefault} from './index';
import {defaults as styleDefaults} from '../style';
import {defaults as templateDefaults} from '../template';

export default function init() {
	[
		displayDefaults,
		loggerDefaults,
		randomDefaults,
		stateDefaults,
		styleDefaults,
		templateDefaults
	].forEach(defs =>
		Object.keys(defs).forEach(k => {
			if (typeof defs[k] === 'function') {
				setDefault(k, defs[k]());
			} else {
				setDefault(k, defs[k]);
			}
		})
	);
}
