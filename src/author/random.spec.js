import test from 'ava';
import Random from './random';

let rand;

test.beforeEach(() => (rand = new Random()));

test('returns boolean values from coinFlip()', t => {
	t.is(typeof rand.coinFlip(), 'boolean');
});

test('rolls dice with roll()', t => {
	let result = rand.roll('1d4');

	t.true(result >= 1 && result <= 4);

	result = rand.roll('5d20');

	t.true(result >= 5 && result <= 100);
});

test('rejects incorrect specs with roll()', t => {
	t.throws(() => rand.roll('d4'));
	t.throws(() => rand.roll('5'));
	t.throws(() => rand.roll(5));
	t.throws(() => rand.roll('nd4'));
	t.throws(() => rand.roll('4dx'));
});

test('selects args with choice()', t => {
	let result = rand.choice('a', 'b', 'c');

	t.true(result === 'a' || result === 'b' || result === 'c');
	t.is(rand.choice('a'), 'a');
});

test('selects from an array with choice()', t => {
	let result = rand.choice(['a', 'b', 'c']);

	t.true(result === 'a' || result === 'b' || result === 'c');
	t.is(rand.choice(['a']), 'a');
});

test('shuffles args with shuffle()', t => {
	let result = rand.shuffle('a', 'b', 'c');

	t.is(result.length, 3);
	t.is(result.filter(i => i === 'a').length, 1);
	t.is(result.filter(i => i === 'b').length, 1);
	t.is(result.filter(i => i === 'c').length, 1);
});

test('shuffles a copy of an array with shuffle()', t => {
	let src = ['a', 'b', 'c'];
	let result = rand.shuffle(src);

	t.is(result.length, 3);
	t.is(result.filter(i => i === 'a').length, 1);
	t.is(result.filter(i => i === 'b').length, 1);
	t.is(result.filter(i => i === 'c').length, 1);
	t.is(src[0], 'a');
	t.is(src[1], 'b');
	t.is(src[2], 'c');
});

test('acts predictably when seeded', t => {
	rand.seed = 1234;

	t.snapshot(rand.roll('1d10'));
	t.snapshot(rand.roll('1d10'));
	t.snapshot(rand.roll('1d10'));
});
