const {expect} = require('chai');
const Trail = require('./trail');

describe('Trail class', () => {
	it('creates an empty array when instantiated', () => {
		expect(new Trail().length).to.equal(0);
	});

	it('uses an array if passed one at instantiation', () => {
		expect(new Trail(['a', 'b']).length).to.equal(2);
	});

	it('allows adding items', () => {
		let t = new Trail();

		expect(t.length).to.equal(0);
		t.add('test');
		expect(t.length).to.equal(1);
	});

	it('allows clearing items', () => {
		let t = new Trail(['test']);

		expect(t.length).to.equal(1);
		t.clear();
		expect(t.length).to.equal(0);
	});

	it('maintains a last property', () => {
		let t = new Trail();
		
		t.add('test');
		expect(t.last).to.equal('test');
		t.add('test2');
		expect(t.last).to.equal('test2');
	});
});