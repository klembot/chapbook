const {expect} = require('chai');
const colors = require('./colors');
const util = require('./util');

describe('appearance utilities', () => {
	it('converts numbers to pixel units with autopx()', () => {
		expect(util.autopx(1)).to.equal('1px');
	});

	it('leaves non-numeric values alone with autopx()', () => {
		expect(util.autopx('1em')).to.equal('1em');
	});

	it('converts color values with color()', () => {
		expect(util.color('pale red')).to.equal(colors['pale red']);
	});

	it('leaves hex triplets alone with color()', () => {
		expect(util.color('#aabbcc')).to.equal('#aabbcc');
	});

	it('converts JS objects to CSS declrations with cssify()', () => {
		expect(util.cssify('body', {foo: 'bar'})).to.equal('body{foo:bar;}');
	});
});