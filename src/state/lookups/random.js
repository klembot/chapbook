/*
Computed variables that return rendom values each time they are read. These are
guaranteed to stay consistent over multiple sessions. They are:

-	`random.coinFlip`: either true or false
-	`random.fraction`: value 0-1
-	`random.d4`: a value 1-4
-	`random.d5`: a value 1-5
-	`random.d6`: a value 1-6
-	`random.d8`: a value 1-8
-	`random.d10`: a value 1-10
-	`random.d12`: a value 1-2
-	`random.d20`: a value 1-20
-	`random.d25`: a value 1-25
-	`random.d50`: a value 1-50
-	`random.d100`: a value 1-100
-	`random.d1000`: a value 1-1000

This also adds two regular variables: `config.random.seed`, which is the seed
the random number generator (RNG) uses, and `config.random.privateState`, which
ensures that the RNG behaves deterministically across sessions.

When a lookup occurs, this saves private state to `config.random.privateState`.
This does this *once per tick, at the end of the execution context.* This is for one very important reason:

-   At init time, this prevents state restoration from local storage from being
	overwritten mid-load

This practice also:

-   Speeds up execution during play, so every time you read from a random
    lookup, it doesn't cause state to be saved to local storage
*/

import seedrandom from 'seedrandom';
import coalesceCalls from '../../util/coalesce-calls';
import event from '../../event';
import {set} from '..';
import {story} from '../../story';

export const defaults = {
	'config.random.seed': () => new Date(),
	'config.random.privateState': null
};

/*
Default the seed to the current time, but if it's ever changed, reset the random
number generator. This causes these random functions to behave in a
deterministic fashion.
*/

let rng = seedrandom(new Date(), {state: true});

event.on('state-change', ({name, value}) => {
	if (name === 'config.random.seed') {
		rng = seedrandom(value, {state: true});
	}
});

function saveRngState() {
	set('config.random.privateState', rng.state());
}

export default function(setLookup) {
	setLookup('random.coinFlip', () => {
		const value = rng();

		coalesceCalls(saveRngState);
		return value > 0.5;
	});

	setLookup('random.fraction', () => {
		const value = rng();

		coalesceCalls(saveRngState);
		return value;
	});

	[4, 5, 6, 8, 10, 12, 20, 25, 50, 100, 1000].forEach(i => {
		setLookup(`random.d${i}`, () => {
			const value = 1 + Math.round(rng() * (i - 1));

			coalesceCalls(saveRngState);
			return value;
		});
	});
}
