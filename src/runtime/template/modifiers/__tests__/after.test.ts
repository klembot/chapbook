import {describe, expect, it} from 'vitest';
import {afterModifier} from '../after';
import {ModifierOutput} from '../types';

describe('After modifier', () => {
	describe('its invocation', () => {
		it('matches "after 1s"', () =>
			expect(afterModifier.match.test('after 1s')).toBe(true));

		it('matches "after 100ms"', () =>
			expect(afterModifier.match.test('after 1s')).toBe(true));
	});

	it('wraps text in a skippable-aniamtion tag with fade-in class and delay set based on the invocation', () => {
		const output: ModifierOutput = {
			startsNewParagraph: false,
			text: 'One line\n\nTwo lines'
		};

		afterModifier.process?.(output, {invocation: 'after 1.5s', state: {}});
		expect(output).toEqual({
			startsNewParagraph: false,
			text:
				'<skippable-animation skippable-delay="1500" class="fade-in">One line</skippable-animation>' +
				'\n\n' +
				'<skippable-animation skippable-delay="1500" class="fade-in">Two lines</skippable-animation>'
		});
	});

	describe.skip('initAfterModifier', () => {
		// 	it.todo('does nothing if there are no element with data-after attributes');
		// 	describe('When there are elements with data-after attributes', () => {
		// 		// const hideSkipMock = vi.spyOn(pageSkip, 'hidePageSkip');
		// 		// const showSkipMock = vi.spyOn(pageSkip, 'showPageSkip');
		// 		beforeEach(() => {
		// 			hideSkipMock.mockReset();
		// 			showSkipMock.mockReset();
		// 		});
		// 		afterEach(() => {
		// 			vi.clearAllTimers();
		// 			vi.useRealTimers();
		// 		});
		// 		it("ignores elements whose values can't be parsed", () => {
		// 			document.body.innerHTML =
		// 				'<div data-after="bad" style="animation-delay: 1000ms" />';
		// 			initAfterModifier();
		// 			window.dispatchEvent(new CustomEvent('page-change-done'));
		// 			expect(showSkipMock).not.toBeCalled();
		// 		});
		// 		it('shows the page skip element', () => {
		// 			const showSkipMock = vi.spyOn(pageSkip, 'showPageSkip');
		// 			document.body.innerHTML =
		// 				'<div data-after="1000ms" style="animation-delay: 1000ms" />';
		// 			initAfterModifier();
		// 			expect(showSkipMock).not.toBeCalled();
		// 			window.dispatchEvent(new CustomEvent('page-change-done'));
		// 			expect(showSkipMock).toBeCalledTimes(1);
		// 		});
		// 		it('hides the page skip element after the last element has begun its animation', () => {
		// 			vi.useFakeTimers();
		// 			document.body.innerHTML =
		// 				'<div data-after="1000ms" style="animation-delay: 1000ms" /><div data-after="2000ms" style="animation-delay: 2000ms" />';
		// 			initAfterModifier();
		// 			expect(hideSkipMock).not.toBeCalled();
		// 			window.dispatchEvent(new CustomEvent('page-change-done'));
		// 			vi.advanceTimersByTime(1000);
		// 			expect(hideSkipMock).not.toBeCalled();
		// 			vi.advanceTimersByTime(1000);
		// 			expect(hideSkipMock).toBeCalledTimes(1);
		// 			vi.useRealTimers();
		// 		});
		// 		describe('When a page-skip event is emitted', () => {
		// 			beforeEach(() => {
		// 				vi.useFakeTimers();
		// 				document.body.innerHTML =
		// 					'<div data-after="1000ms" style="animation-delay: 1000ms" /><div data-after="2000ms" style="animation-delay: 2000ms" /><div data-after="3000ms" style="animation-delay: 3000ms" />';
		// 				initAfterModifier();
		// 				window.dispatchEvent(new CustomEvent('page-change-done'));
		// 			});
		// 			it('triggers the elements whose animation delay is lowest and after the elapsed time', () => {
		// 				vi.advanceTimersByTime(1500);
		// 				window.dispatchEvent(new CustomEvent('page-skip'));
		// 				const divs = document.querySelectorAll('div');
		// 				expect(divs.length).toBe(3);
		// 				// This one already completed.
		// 				expect(divs[0].style.animationDelay).toBe('');
		// 				// This one was just triggered.
		// 				expect(divs[1].style.animationDelay).toBe('');
		// 			});
		// 			it('adjusts element animation delays', () => {
		// 				vi.advanceTimersByTime(500);
		// 				window.dispatchEvent(new CustomEvent('page-skip'));
		// 				const divs = document.querySelectorAll('div');
		// 				expect(divs.length).toBe(3);
		// 				expect(divs[0].style.animationDelay).toBe('');
		// 				// These are changed based on the first element's delay, so it doesn't
		// 				// matter that only 500ms have passed.
		// 				expect(divs[1].style.animationDelay).toBe('1000ms');
		// 				expect(divs[2].style.animationDelay).toBe('2000ms');
		// 			});
		// 			it('adjusts the delay of hiding the page skip element', () => {
		// 				vi.advanceTimersByTime(500);
		// 				window.dispatchEvent(new CustomEvent('page-skip'));
		// 				vi.advanceTimersByTime(2000);
		// 				// If the logic was incorrect, it would take until 3000ms total for
		// 				// hideSkip() to be called.
		// 				expect(hideSkipMock).toBeCalledTimes(1);
		// 			});
		// 		});
		// 	});
	});
});
