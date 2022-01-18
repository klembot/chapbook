/* Chapbook engine-related lookups. */

import pkg from '../../../../package.json';

export default function init(setLookup) {
	setLookup('engine.version', () => {
		return pkg.version;
	});
}
