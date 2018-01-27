import {expect} from 'chai';
import colors from './colors';
import {autopx, color, cssify} from './util';

describe('appearance utilities', () => {
	it('converts numbers to pixel units with autopx()', () => {
		expect(autopx(1)).to.equal('1px');
	});

	it('leaves non-numeric values alone with autopx()', () => {
		expect(autopx('1em')).to.equal('1em');
	});

	it('converts color values with color()', () => {
		expect(color('pale red')).to.equal(colors['pale red']);
	});

	it('leaves hex triplets alone with color()', () => {
		expect(color('#aabbcc')).to.equal('#aabbcc');
	});

	it('converts JS objects to CSS declrations with cssify()', () => {
		expect(cssify('body', {foo: 'bar'})).to.equal('body{foo:bar;}');
	});
});