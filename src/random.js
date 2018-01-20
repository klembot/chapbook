/*
Functions for random behavior.
*/

const seedrandom = require('seedrandom');

module.exports = class {
	constructor(seed) {
		this.rng = seedrandom(seed);
	}

	/*
	Seeds the random number generator so that subsequent calls are predictable.
	Useful for testing.
	*/

	seed(value) {
		this.rng = seedrandom(value);
	}

	/*
	Returns either true or false, randomly.
	*/

	coinFlip() {
		return this.rng() > 0.5;
	}

	/*
	Returns a set of simulated die rolls. See
	https://en.wikipedia.org/wiki/Dice_notation for an explanation of the format
	this accepts.
	*/

	roll(spec) {
		const bits = spec.split(/d/i);

		if (bits.length !== 2) {
			throw new Error(
				'A roll must in the format [number of rolls]d[number of sides], i.e. 1d4.'
			);
		}

		const rolls = parseInt(bits[0]);

		if (isNaN(rolls)) {
			throw new Error(`The number of rolls specified (${bits[0]}) isn't a number.`);
		}

		const sides = parseInt(bits[1]);

		if (isNaN(sides)) {
			throw new Error(`The number of die sides specified (${bits[1]}) isn't a number.`);
		}

		let total = 0;

		for (let i = 0; i < rolls; i++) {
			total += 1 + Math.round(this.rng() * (sides - 1));
		}

		return total;
	}

	/*
	Returns a randomly chosen argument.
	*/

	choice(...choices) {
		return choices[Math.round(this.rng() * (choices.length - 1))];
	}
};