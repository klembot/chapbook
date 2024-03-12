import {beforeAll, describe, expect, it, vi} from 'vitest';
import {PageSkip} from '../page-skip';
import {defineElements} from '../../../util/custom-element';
import {render, screen} from '../../../../test-utils';

describe('<page-skip>', () => {
	beforeAll(() => {
		defineElements({'page-skip': PageSkip});
	});

	describe('When a body-content-change event is received', () => {
		it('dispatches a page-skip-indicator-show event if there are any children with a skippable-delay attribute', () => {
			const listener = vi.fn();

			render('<page-skip><div skippable-delay="1000"></div></page-skip>');

			const skip = document.querySelector('page-skip') as PageSkip;

			skip.addEventListener('page-skip-indicator-show', listener);
			expect(listener).not.toBeCalled();
			document
				.querySelector('page-skip')
				?.dispatchEvent(new CustomEvent('body-content-change'));
			expect(listener).toBeCalledTimes(1);
		});

		it("doesn't dispatch a page-skip-indicator-show event if there are no children with a skippable-delay attribute", () => {
			const listener = vi.fn();

			render('<page-skip><div></div></page-skip>');

			const skip = document.querySelector('page-skip') as PageSkip;

			skip.addEventListener('page-skip-indicator-show', listener);
			expect(listener).not.toBeCalled();
			document
				.querySelector('page-skip')
				?.dispatchEvent(new CustomEvent('body-content-change'));
			expect(listener).not.toBeCalled();
		});

		describe.each([
			['click', MouseEvent],
			['keyup', KeyboardEvent]
		])('When a %s event occurs afterwards', (eventName, eventClass) => {
			it('sets the skippable-delay attribute of the soonest element to 0', () => {
				render(`<page-skip>
						<div data-testid="one" skippable-delay="300"></div>
						<div data-testid="two" skippable-delay="150"></div>
					</page-skip>`);
				document
					.querySelector('page-skip')
					?.dispatchEvent(new CustomEvent('body-content-change'));
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('two')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
			});

			it('decreases the skippable-delay attribute of all other elements by the delay left on the soonest element', () => {
				render(`<page-skip>
					<div data-testid="one" skippable-delay="300"></div>
					<div data-testid="two" skippable-delay="150"></div>
				</page-skip>`);
				document
					.querySelector('page-skip')
					?.dispatchEvent(new CustomEvent('body-content-change'));
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('one')).toHaveAttribute(
					'skippable-delay',
					'150'
				);
			});

			it('on subsequent skips, ignores previously skipped elements', () => {
				render(`<page-skip>
					<div data-testid="one" skippable-delay="400"></div>
					<div data-testid="two" skippable-delay="300"></div>
					<div data-testid="three" skippable-delay="100"></div>
					<div data-testid="four" skippable-delay="200"></div>
				</page-skip>`);
				document
					.querySelector('page-skip')
					?.dispatchEvent(new CustomEvent('body-content-change'));
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('one')).toHaveAttribute(
					'skippable-delay',
					'300'
				);
				expect(screen.getByTestId('two')).toHaveAttribute(
					'skippable-delay',
					'200'
				);
				expect(screen.getByTestId('three')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('four')).toHaveAttribute(
					'skippable-delay',
					'100'
				);
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('one')).toHaveAttribute(
					'skippable-delay',
					'200'
				);
				expect(screen.getByTestId('two')).toHaveAttribute(
					'skippable-delay',
					'100'
				);
				expect(screen.getByTestId('three')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('four')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('one')).toHaveAttribute(
					'skippable-delay',
					'100'
				);
				expect(screen.getByTestId('two')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('three')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('four')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				window.dispatchEvent(new eventClass(eventName));
				expect(screen.getByTestId('one')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('two')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('three')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
				expect(screen.getByTestId('four')).toHaveAttribute(
					'skippable-delay',
					'0'
				);
			});

			it('dispatches a page-skip-indicator-hide event if all children have been skipped', () => {
				const listener = vi.fn();

				render(`<page-skip>
					<div data-testid="one" skippable-delay="100"></div>
					<div data-testid="two" skippable-delay="200"></div>
				</page-skip>`);

				const skip = document.querySelector('page-skip') as PageSkip;

				skip.addEventListener('page-skip-indicator-hide', listener);
				skip.dispatchEvent(new CustomEvent('body-content-change'));
				expect(listener).not.toBeCalled();
				window.dispatchEvent(new eventClass(eventName));
				expect(listener).not.toBeCalled();

				// The event is dispatched via a 0ms timeout.

				vi.useFakeTimers();
				window.dispatchEvent(new eventClass(eventName));
				vi.advanceTimersByTime(1);
				expect(listener).toBeCalledTimes(1);
				vi.useRealTimers();
			});

			it("dispatches a page-skip-indicator-hide event if all children's delays have elapsed", () => {
				const listener = vi.fn();

				render(`<page-skip>
					<div data-testid="one" skippable-delay="100"></div>
					<div data-testid="two" skippable-delay="200"></div>
				</page-skip>`);

				const skip = document.querySelector('page-skip') as PageSkip;

				skip.addEventListener('page-skip-indicator-hide', listener);
				vi.useFakeTimers();
				skip.dispatchEvent(new CustomEvent('body-content-change'));
				expect(listener).not.toBeCalled();
				vi.advanceTimersByTime(200);
				expect(listener).toBeCalledTimes(1);
			});
		});
	});
});
