import test from 'ava';
import Stylesheet from './stylesheet';

let style;

test.beforeEach(() => {
	style = new Stylesheet();
});

test('converts numbers to pixel units with autopx()', t => {
	t.is(style.autopx(1), '1px');
});

test('leaves non-numeric values alone with autopx()', t => {
	t.is(style.autopx('1em'), '1em');
});
