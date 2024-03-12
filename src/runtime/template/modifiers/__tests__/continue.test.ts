import {describe, expect, it} from 'vitest';
import {continueModifier} from '../continue';
import {ModifierOutput} from '../types';

describe('Continue modifier', () => {
	describe('its invocation', () => {
		it('matches "continue"', () =>
			expect(continueModifier.match.test('continue')).toBe(true));

		it('matches "cont\'d"', () =>
			expect(continueModifier.match.test("cont'd")).toBe(true));

		it('matches "cont"', () =>
			expect(continueModifier.match.test('cont')).toBe(true));
	});

	it('its process function does nothing', () => {
		const output: ModifierOutput = {
			startsNewParagraph: true,
			text: 'text'
		};
		const originalOutput = {...output};

		continueModifier.process?.(output, {invocation: 'continue', state: {}});
		expect(output).toEqual(originalOutput);
	});
});
