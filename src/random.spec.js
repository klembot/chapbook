import {expect} from 'chai';
import Random from './random';

describe('random module', () => {
	const rand = new Random();

	it('returns boolean values from coinFlip()', () => {
		expect(rand.coinFlip()).to.be.a('Boolean');
	});

	it('rolls dice with roll()', () => {
		let result = rand.roll('1d4');

		expect(result >= 1 && result <= 4).to.equal(true);

		result = rand.roll('5d20');

		expect(result >= 5 && result <= 100).to.equal(true);
	});

	it('rejects incorrect specs with roll()', () => {
		expect(() => { rand.roll('d4') }).to.throw;
		expect(() => { rand.roll('5') }).to.throw;
		expect(() => { rand.roll(5) }).to.throw;
		expect(() => { rand.roll('nd4') }).to.throw;
		expect(() => { rand.roll('4dx') }).to.throw;
	});

	it('selects args with choice()', () => {
		let result = rand.choice('a', 'b', 'c');

		expect(result === 'a' || result === 'b' || result === 'c').to.equal(true);
		expect(rand.choice('a')).to.equal('a');
	});

	it('acts predictably when seeded');
});