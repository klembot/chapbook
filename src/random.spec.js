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
		expect(() => {
			rand.roll('d4');
		}).to.throw;
		expect(() => {
			rand.roll('5');
		}).to.throw;
		expect(() => {
			rand.roll(5);
		}).to.throw;
		expect(() => {
			rand.roll('nd4');
		}).to.throw;
		expect(() => {
			rand.roll('4dx');
		}).to.throw;
	});

	it('selects args with choice()', () => {
		let result = rand.choice('a', 'b', 'c');

		expect(result === 'a' || result === 'b' || result === 'c').to.equal(true);
		expect(rand.choice('a')).to.equal('a');
	});

	it('selects from an array with choice()', () => {
		let result = rand.choice(['a', 'b', 'c']);

		expect(result === 'a' || result === 'b' || result === 'c').to.equal(true);
		expect(rand.choice(['a'])).to.equal('a');
	});

	it('shuffles args with shuffle()', () => {
		let result = rand.shuffle('a', 'b', 'c');

		expect(result.length).to.equal(3);
		expect(result.filter(i => i === 'a').length).to.equal(1);
		expect(result.filter(i => i === 'b').length).to.equal(1);
		expect(result.filter(i => i === 'c').length).to.equal(1);
	});

	it('shuffles a copy of an array with shuffle()', () => {
		let src = ['a', 'b', 'c'];
		let result = rand.shuffle(src);

		console.log(result);
		expect(result.length).to.equal(3);
		expect(result.filter(i => i === 'a').length).to.equal(1);
		expect(result.filter(i => i === 'b').length).to.equal(1);
		expect(result.filter(i => i === 'c').length).to.equal(1);
		expect(src[0]).to.equal('a');
		expect(src[1]).to.equal('b');
		expect(src[2]).to.equal('c');
	});

	it('acts predictably when seeded');
});
