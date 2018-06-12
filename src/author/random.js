/* Author unctions for random behavior. */

import seedrandom from 'seedrandom';
import shuffle from 'lodash.shuffle';

export default class {
	constructor(seed) {
		this.seed = seed;
		this.rng = seedrandom(seed);
	}

	get seed() {
		return this._seed;
	}

	/*
	Seeds the random number generator so that subsequent calls are predictable.
	Useful for testing.
	*/

	set seed(value) {
		this._seed = value;
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
			total += 1 + Math.round(this.rng() * (sides - 1));
		}

		return total;
	}

	/*
	If only one argument is passed and it is an array:
		Returns a randomly chosen item in the array.
	Otherwise:
		Returns a randomly chosen argument.
	*/

	choice(...choices) {
		let toChooseFrom = choices;

		if (choices.length === 1 && Array.isArray(choices[0])) {
			toChooseFrom = choices[0];
		}

		return toChooseFrom[Math.round(this.rng() * (toChooseFrom.length - 1))];
	}

	/*
	If only one argument is passed and it is an array:
		Returns a copy of the array, but with items are in random order.
	Otherwise:
		Returns the arguments passed in random order.
	*/

	shuffle(...items) {
		let toShuffle = items;

		if (items.length === 1 && Array.isArray(items[0])) {
			toShuffle = items[0];
		}

		return shuffle(toShuffle.slice());
	}
}
