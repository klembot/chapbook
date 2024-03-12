import {describe, expect, it} from 'vitest';
import {render} from '../../../test-utils';
import {isTransitionName, none, transition} from '../transitions';

describe('none', () => {
	it('resolves after changing content', async () => {
		render('<p>before</p>');
		expect(document.body.textContent).toBe('before');
		await none(document.body, '<p>after</p>');
		expect(document.body.textContent).toBe('after');
	});
});

// fadeInOut and crossfade depend on animationend events, which aren't currently
// implemented in jsdom.
// See https://github.com/jsdom/jsdom/issues/3239

describe('isTransitionName', () => {
	it("returns true for 'crossfade', 'fadeInOut', and 'none'", () => {
		expect(isTransitionName('crossfade')).toBe(true);
		expect(isTransitionName('fadeInOut')).toBe(true);
		expect(isTransitionName('none')).toBe(true);
	});

	it('returns false for an unknown string', () =>
		expect(isTransitionName('bad')).toBe(false));

	it('returns false for non-string values', () => {
		expect(isTransitionName(1)).toBe(false);
		expect(isTransitionName(true)).toBe(false);
		expect(isTransitionName(null)).toBe(false);
		expect(isTransitionName(undefined)).toBe(false);
	});
});

describe('transition', () => {
	it('runs a none transition if specified', async () => {
		render('<p>before</p>');
		expect(document.body.textContent).toBe('before');
		await transition(document.body, '<p>after</p>', 'none');
		expect(document.body.textContent).toBe('after');
	});

	it('runs a none transition if given a nonexistent transition', async () => {
		render('<p>before</p>');
		expect(document.body.textContent).toBe('before');
		await transition(document.body, '<p>after</p>', 'bad');
		expect(document.body.textContent).toBe('after');
	});

	// crossfade and fadeInOut can't be tested because of jsdom issues mentioned
	// earlier in this test.
});
