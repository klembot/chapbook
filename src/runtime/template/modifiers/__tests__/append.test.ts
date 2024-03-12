import {describe, expect, it} from 'vitest';
import {ModifierOutput} from '../types';
import {appendModifier} from '../append';

describe('Append modifier', () => {
	describe('its invocation', () => {
		it('matches "append"', () =>
			expect(appendModifier.match.test('append')).toBe(true));
	});

	it('changes the output to not start a new paragraph', () => {
		const output: ModifierOutput = {
			startsNewParagraph: true,
			text: 'One line\n\nTwo lines'
		};

		appendModifier.process?.(output, {invocation: 'append', state: {}});
		expect(output).toEqual({
			startsNewParagraph: false,
			text: 'One line\n\nTwo lines'
		});
	});
});
