import {afterEach, describe, expect, it, vi} from 'vitest';
import {javascriptModifier} from '../javascript';
import {ModifierOutput} from '../types';
import {reset, set} from '../../../state';

describe('JavaScript modifier', () => {
	describe('its invocation', () => {
		it('matches "JavaScript"', () =>
			expect(javascriptModifier.match.test('JavaScript')).toBe(true));
	});

	it('executes the code in the block immediately', () => {
		const logSpy = vi.spyOn(window.console, 'log').mockReturnValue();
		const output: ModifierOutput = {
			startsNewParagraph: false,
			text: 'console.log("pass")'
		};

		expect(logSpy).not.toBeCalled();
		javascriptModifier.process?.(output, {
			invocation: 'JavaScript',
			state: {}
		});
		expect(logSpy.mock.calls).toEqual([['pass']]);
		logSpy.mockRestore();
	});

	it('allows writing output to the block using the write() function', () => {
		const output: ModifierOutput = {
			startsNewParagraph: false,
			text: 'write("pass");'
		};

		javascriptModifier.process?.(output, {
			invocation: 'JavaScript',
			state: {}
		});

		expect(output).toEqual({
			startsNewParagraph: false,
			text: 'pass'
		});
	});

	describe('If the code in the block throws an error', () => {
		afterEach(() => {
			reset();
		});

		it('displays an error message if config.testing is truthy', () => {
			const output: ModifierOutput = {
				startsNewParagraph: false,
				text: 'throw new Error()'
			};

			set('config.testing', true);
			javascriptModifier.process?.(output, {
				invocation: 'JavaScript',
				state: {}
			});
			expect(output.startsNewParagraph).toBe(false);
			expect(output.text).toContain('An error occurred evaluating');
		});

		it('rethrows the error if config.testing is falsy', () =>
			expect(() =>
				javascriptModifier.process?.(
					{
						startsNewParagraph: true,
						text: 'throw new Error()'
					},
					{invocation: 'JavaScript', state: {}}
				)
			).toThrow());
	});
});
