import test from 'ava';
import random from './random';

test('returns boolean values from coinFlip()', t => {
	t.is(typeof random.coinFlip(), 'boolean');
});

test('rolls dice with roll()', t => {
	let result = random.roll('1d4');

	t.true(result >= 1 && result <= 4);

	result = random.roll('5d20');

	t.true(result >= 5 && result <= 100);
});

test('rejects incorrect specs with roll()', t => {
	t.throws(() => random.roll('d4'));
	t.throws(() => random.roll('5'));
	t.throws(() => random.roll(5));
	t.throws(() => random.roll('nd4'));
	t.throws(() => random.roll('4dx'));
});

test('selects args with choice()', t => {
	let result = random.choice('a', 'b', 'c');

	t.true(result === 'a' || result === 'b' || result === 'c');
	t.is(random.choice('a'), 'a');
});

test('selects from an array with choice()', t => {
	let result = random.choice(['a', 'b', 'c']);

	t.true(result === 'a' || result === 'b' || result === 'c');
	t.is(random.choice(['a']), 'a');
});

test('shuffles args with shuffle()', t => {
	let result = random.shuffle('a', 'b', 'c');

	t.is(result.length, 3);
	t.is(result.filter(i => i === 'a').length, 1);
	t.is(result.filter(i => i === 'b').length, 1);
	t.is(result.filter(i => i === 'c').length, 1);
});

test('shuffles a copy of an array with shuffle()', t => {
	let src = ['a', 'b', 'c'];
	let result = random.shuffle(src);

	t.is(result.length, 3);
	t.is(result.filter(i => i === 'a').length, 1);
	t.is(result.filter(i => i === 'b').length, 1);
	t.is(result.filter(i => i === 'c').length, 1);
	t.is(src[0], 'a');
	t.is(src[1], 'b');
	t.is(src[2], 'c');
});

test('acts predictably when seeded', t => {
	random.seed = 1234;

	t.snapshot(random.roll('1d10'));
	t.snapshot(random.roll('1d10'));
	t.snapshot(random.roll('1d10'));
});
