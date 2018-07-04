// Author functions for random behavior. These are guaranteed to stay consistent
// over multiple loads.

import seedrandom from 'seedrandom';
import shuffle from 'shuffle-array';
import event from '../event';
import {get, set} from '../state';
import {story} from '../story';

export const defaults = {
	'config.random.seed': () => story.name,
	'config.random.privateState': null
};

// Default the seed

let rng = seedrandom(new Date(), {state: true});

event.on('state-change', ({name, value}) => {
	if (name === 'config.random.seed') {
		rng = seedrandom(value, {state: true});
	}
});

function saveRngState() {
	set('config.random.privateState', rng.state());
}

export default {
	// Returns either true or false, randomly.

	coinFlip() {
		const value = rng();

		saveRngState();
		return value > 0.5;
	},

	// Returns a set of simulated die rolls. See
	// https://en.wikipedia.org/wiki/Dice_notation for an explanation of the format
	// this accepts.

	roll(spec) {
		const bits = spec.split(/d/i);

		if (bits.length !== 2) {
			throw new Error(
				'A roll must be in the format [number of rolls]d[number of sides], i.e. 1d4.'
			);
		}

		const rolls = parseInt(bits[0]);

		if (isNaN(rolls)) {
			throw new Error(
				`The number of rolls specified (${bits[0]}) isn't a number.`
			);
		}

		const sides = parseInt(bits[1]);

		if (isNaN(sides)) {
			throw new Error(
				`The number of die sides specified (${bits[1]}) isn't a number.`
			);
		}

		let total = 0;

		for (let i = 0; i < rolls; i++) {
			total += 1 + Math.round(rng() * (sides - 1));
		}

		saveRngState();
		return total;
	},

	// If only one argument is passed and it is an array:
	// 	Returns a randomly chosen item in the array.
	// Otherwise:
	// 	Returns a randomly chosen argument.

	choice(...choices) {
		let toChooseFrom = choices;

		if (choices.length === 1 && Array.isArray(choices[0])) {
			toChooseFrom = choices[0];
		}

		const index = Math.round(rng() * (toChooseFrom.length - 1));

		saveRngState();
		return toChooseFrom[index];
	},

	// If only one argument is passed and it is an array:
	// 	Returns a copy of the array, but with items are in random order.
	// Otherwise:
	// 	Returns the arguments passed in random order.

	shuffle(...items) {
		let toShuffle = items;

		if (items.length === 1 && Array.isArray(items[0])) {
			toShuffle = items[0];
		}

		const result = shuffle(toShuffle, {copy: true, rng});

		saveRngState();
		return result;
	}
};
