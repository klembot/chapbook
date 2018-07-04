import event from '../../event';
import random from '../random';

describe('random', () => {
	test('returns boolean values from coinFlip()', () => {
		expect(typeof random.coinFlip()).toBe('boolean');
	});

	test('rolls dice with roll()', () => {
		let result = random.roll('1d4');

		expect(result >= 1 && result <= 4).toBe(true);

		result = random.roll('5d20');

		expect(result >= 5 && result <= 100).toBe(true);
	});

	test('rejects incorrect specs with roll()', () => {
		expect(() => random.roll('d4')).toThrow();
		expect(() => random.roll('5')).toThrow();
		expect(() => random.roll(5)).toThrow();
		expect(() => random.roll('nd4')).toThrow();
		expect(() => random.roll('4dx')).toThrow();
	});

	test('selects args with choice()', () => {
		let result = random.choice('a', 'b', 'c');

		expect(result === 'a' || result === 'b' || result === 'c').toBe(true);
		expect(random.choice('a')).toBe('a');
	});

	test('selects from an array with choice()', () => {
		let result = random.choice(['a', 'b', 'c']);

		expect(result === 'a' || result === 'b' || result === 'c').toBe(true);
		expect(random.choice(['a'])).toBe('a');
	});

	test('shuffles args with shuffle()', () => {
		let result = random.shuffle('a', 'b', 'c');

		expect(result.length).toBe(3);
		expect(result.filter(i => i === 'a').length).toBe(1);
		expect(result.filter(i => i === 'b').length).toBe(1);
		expect(result.filter(i => i === 'c').length).toBe(1);
	});

	test('shuffles a copy of an array with shuffle()', () => {
		let src = ['a', 'b', 'c'];
		let result = random.shuffle(src);

		expect(result.length).toBe(3);
		expect(result.filter(i => i === 'a').length).toBe(1);
		expect(result.filter(i => i === 'b').length).toBe(1);
		expect(result.filter(i => i === 'c').length).toBe(1);
		expect(src[0]).toBe('a');
		expect(src[1]).toBe('b');
		expect(src[2]).toBe('c');
	});

	test('acts predictably when seeded', () => {
		event.emit('state-change', {name: 'config.random.seed', value: 1234});

		expect(random.roll('1d10')).toMatchSnapshot();
		expect(random.roll('1d10')).toMatchSnapshot();
		expect(random.roll('1d10')).toMatchSnapshot();
	});
});
