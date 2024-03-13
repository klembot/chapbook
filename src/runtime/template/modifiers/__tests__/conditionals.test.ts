import {describe, expect, it} from 'vitest';
import {ModifierOutput} from '../types';
import {conditionalModifier} from '../conditionals';

describe('Conditional modifier', () => {
	describe('its invocation', () => {
		it('matches "if something"', () =>
			expect(conditionalModifier.match.test('if something')).toBe(true));

		it('matches "ifalways something"', () =>
			expect(conditionalModifier.match.test('ifalways something')).toBe(true));

		it('matches "ifnever something"', () =>
			expect(conditionalModifier.match.test('ifnever something')).toBe(true));

		it('matches "else"', () =>
			expect(conditionalModifier.match.test('else')).toBe(true));

		it('matches "unless something"', () =>
			expect(conditionalModifier.match.test('unless something')).toBe(true));
	});

	describe.each([
		['If', 'text', ''],
		['Ifalways', 'text', 'text'],
		['Ifnever', '', ''],
		['Unless', '', 'text']
	])('%s modifier', (invocation, truthyResult, falsyResult) => {
		it(`sets the text to "${truthyResult}" if the condition supplied to it is truthy`, () => {
			const output: ModifierOutput = {
				startsNewParagraph: true,
				text: 'text'
			};

			conditionalModifier.processRaw?.(output, {
				invocation: `${invocation} 1`,
				state: {}
			});
			expect(output).toEqual({
				startsNewParagraph: true,
				text: truthyResult
			});
		});

		it('sets the text to "${falsyResult}" if the condition supplied to it is falsy', () => {
			const output: ModifierOutput = {
				startsNewParagraph: true,
				text: 'text'
			};

			conditionalModifier.processRaw?.(output, {
				invocation: `${invocation} 0`,
				state: {}
			});
			expect(output).toEqual({
				startsNewParagraph: true,
				text: falsyResult
			});
		});
	});

	describe('Else modifier', () => {
		it('hides the text if the previous condition was truthy', () => {
			const output: ModifierOutput = {
				startsNewParagraph: true,
				text: 'text'
			};

			conditionalModifier.processRaw?.(output, {
				invocation: 'else',
				state: {
					conditionEval: 1
				}
			});
			expect(output).toEqual({
				startsNewParagraph: true,
				text: ''
			});
		});

		it('shows the text if the previous condition was falsy but not undefined', () => {
			const output: ModifierOutput = {
				startsNewParagraph: true,
				text: 'text'
			};

			conditionalModifier.processRaw?.(output, {
				invocation: 'else',
				state: {
					conditionEval: 0
				}
			});
			expect(output).toEqual({
				startsNewParagraph: true,
				text: 'text'
			});
		});

		it('throws an error if there is no previous condition defined in state', () =>
			expect(() =>
				conditionalModifier.processRaw?.(
					{startsNewParagraph: true, text: 'text'},
					{
						invocation: 'else',
						state: {}
					}
				)
			).toThrow());
	});
});
