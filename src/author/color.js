/*
Color-related functions. Right now this supports either hex triplets or Material
Design color keywords that look like `red.500`.
*/

import get from 'lodash.get';
import colors from 'open-color/open-color.json';

class Color {
	constructor(value) {
		if (value) {
			if (value[0] && value[0] === '#') {
				this.hex = value;
				return;
			}

			if (colors[value]) {
				if (Array.isArray(colors[value])) {
					this.hex = colors[value][colors[value].length - 1];
				} else {
					this.hex = colors[value];
				}

				return;
			}

			const colorLookup = /^(\w+)-(\d)$/.exec(value);

			if (colorLookup && colors[colorLookup[1]]) {
				this.hex = colors[colorLookup[1]][colorLookup[2]];
				return;
			}
		}

		/* Fall back to black. */

		this.hex = '#000000';
	}

	toString() {
		return this.hex;
	}
}

function createFactory() {
	return (...args) => new Color(...args);
}

export {Color, createFactory};
