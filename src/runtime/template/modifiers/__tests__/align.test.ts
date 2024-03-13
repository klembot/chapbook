import {describe, expect, it} from 'vitest';
import {alignModifier} from '../align';
import {ModifierOutput} from '../types';

describe('Align modifier', () => {
	describe('its invocation', () => {
		it('matches "align left"', () =>
			expect(alignModifier.match.test('align left')).toBe(true));

		it('matches "align center"', () =>
			expect(alignModifier.match.test('align center')).toBe(true));

		it('matches "align right"', () =>
			expect(alignModifier.match.test('align right')).toBe(true));
	});

	it.each(['left', 'center', 'right'])(
		"wraps text in %s-aligned spans if called as 'align %s'",
		align => {
			const output: ModifierOutput = {
				startsNewParagraph: false,
				text: 'One line\n\nTwo lines'
			};

			alignModifier.process?.(output, {
				invocation: `align ${align}`,
				state: {}
			});
			expect(output.text).toBe(
				`<span style="display: block; text-align: ${align}">One line</span>\n` +
					'\n' +
					`<span style="display: block; text-align: ${align}">Two lines</span>`
			);
		}
	);
});
