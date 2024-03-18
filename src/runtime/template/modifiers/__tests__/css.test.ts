import {describe, expect, it} from 'vitest';
import {ModifierOutput} from '../types';
import {cssModifier} from '../css';

describe('CSS modifier', () => {
	describe('its invocation', () => {
		it('matches "CSS"', () => expect(cssModifier.match.test('css')).toBe(true));
	});

	it('wraps the output text in a <style> tag', () => {
		const output: ModifierOutput = {
			startsNewParagraph: false,
			text: 'One line\n\nTwo lines'
		};

		cssModifier.processRaw?.(output, {
      invocation: 'css',
      state: {}
    });

		expect(output).toEqual({
			startsNewParagraph: false,
			text: '<style>One line\n\nTwo lines</style>'
		});
	});
});
