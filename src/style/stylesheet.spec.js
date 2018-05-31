import {expect} from 'chai';
import Colors from './colors';
import Stylesheet from './stylesheet';

describe('Stylesheet class', () => {
	let style;

	beforeEach(() => {
		style = new Stylesheet();
	});

	it('converts numbers to pixel units with autopx()', () => {
		expect(style.autopx(1)).to.equal('1px');
	});

	it('leaves non-numeric values alone with autopx()', () => {
		expect(style.autopx('1em')).to.equal('1em');
	});
});
