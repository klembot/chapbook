import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '../../../../test-utils';
import {get, purgeFromStorage, set} from '../../../state';
import {InlineButton} from '../../../template/custom-elements/inline-button';
import {defineElements} from '../../../util/custom-element';
import {ErrorHandler} from '../error-handler';
import {startPassage} from '../../../story';

vi.mock('../../../state');
vi.mock('../../../story');

describe('<error-handler>', () => {
	const getMock = vi.mocked(get);
	const setMock = vi.mocked(set);
	const purgeFromStorageMock = vi.mocked(purgeFromStorage);
	const startPassageMock = vi.mocked(startPassage);

	beforeAll(() => {
		defineElements({
			'error-handler': ErrorHandler,
			'inline-button': InlineButton
		});
	});

	beforeEach(() => {
		render('<error-handler></error-handler>');
		getMock.mockReset();
		getMock.mockImplementation((name: string) => {
			if (name === 'config.testing') {
				return true;
			}

			return undefined;
		});
		setMock.mockReset();
		startPassageMock.mockReturnValue({
			name: 'start-passage',
			source: '',
			tags: []
		});
	});

	it('displays nothing initially', () => {
		expect(
			screen.queryByText('An unexpected error has occurred.')
		).not.toBeInTheDocument();
	});

	// jsdom doesn't support PromiseRejectionEvents yet so we can only test
	// ErrorEvents.
	// https://github.com/jsdom/jsdom/issues/2401

	describe('when an error event occurs on the window', () => {
		it('shows an error message', () => {
			window.dispatchEvent(
				new ErrorEvent('error', {error: {message: 'test-error-message'}})
			);
			expect(
				screen.getByText('An unexpected error has occurred.')
			).toBeInTheDocument();
		});

		describe('When config.testing is set to true', () => {
			it("shows the error's message property", () => {
				window.dispatchEvent(
					new ErrorEvent('error', {error: {message: 'test-error-message'}})
				);
				expect(
					screen.getByText('test-error-message', {exact: false})
				).toBeInTheDocument();
			});

			it('shows a stack trace if available', () => {
				window.dispatchEvent(
					new ErrorEvent('error', {error: {stack: 'test-stack-trace'}})
				);
				expect(
					screen.getByText('test-stack-trace', {exact: false})
				).toBeInTheDocument();
			});

			it("shows a placeholder if a stack trace isn't available", () => {
				window.dispatchEvent(new ErrorEvent('error', {error: {}}));
				expect(
					screen.getByText('[no stack trace available]', {exact: false})
				).toBeInTheDocument();
			});
		});

		describe('When config.testing is set to false', () => {
			beforeEach(() => {
				getMock.mockImplementation((name: string) => {
					if (name === 'config.testing') {
						return false;
					}

					return undefined;
				});
			});

			it("doesn't show the error's message property", () => {
				window.dispatchEvent(
					new ErrorEvent('error', {error: {message: 'test-error-message'}})
				);
				expect(
					screen.queryByText('test-error-message', {exact: false})
				).not.toBeInTheDocument();
			});

			it("doesn't show a stack trace or placeholder", () => {
				window.dispatchEvent(
					new ErrorEvent('error', {error: {stack: 'test-stack-trace'}})
				);
				expect(
					screen.queryByText('test-stack-trace', {exact: false})
				).not.toBeInTheDocument();
				expect(
					screen.queryByText('[no stack trace available]', {exact: false})
				).not.toBeInTheDocument();
			});
		});

		it('shows a button that clears all local storage and reloads the page', () => {
			const reload = vi.fn();

			window.dispatchEvent(new ErrorEvent('error', {error: {}}));

			const button = screen.getByRole('button', {name: 'Hard restart'});

			expect(purgeFromStorageMock).not.toBeCalled();
			vi.stubGlobal('window', {location: {reload}});
			fireEvent.click(button);
			vi.unstubAllGlobals();
			expect(purgeFromStorageMock).toBeCalledTimes(1);
			expect(reload).toBeCalledTimes(1);
		});

		describe('If trail is an array and has more than 1 item', () => {
			beforeEach(() => {
				getMock.mockImplementation((name: string) => {
					if (name === 'trail') {
						return ['one', 'two', 'three'];
					}

					return undefined;
				});
			});

			// Testing that the element hides itself after going back doesn't seem to
			// work--the content is still considered visible even though CSS will hide
			// it when the active class is removed.

			it('shows a button that goes back one passage when clicked', () => {
				window.dispatchEvent(new ErrorEvent('error', {error: {}}));
				expect(setMock).not.toBeCalled();
				fireEvent.click(screen.getByRole('button', {name: 'Go back'}));
				expect(setMock.mock.calls).toEqual([['trail', ['one', 'two']]]);
			});

			it('shows an alert if the trail is no longer an array when the button is clicked', () => {
				const alert = vi.fn();

				window.dispatchEvent(new ErrorEvent('error', {error: {}}));
				getMock.mockReturnValue(undefined);
				expect(setMock).not.toBeCalled();
				vi.stubGlobal('window', {alert});
				fireEvent.click(screen.getByRole('button', {name: 'Go back'}));
				vi.unstubAllGlobals();
				expect(alert).toBeCalledTimes(1);
			});
		});

		it('shows a button that reloads the current passage if trail has a single item', () => {
			getMock.mockImplementation((name: string) => {
				if (name === 'trail') {
					return ['one'];
				}

				return undefined;
			});

			window.dispatchEvent(new ErrorEvent('error', {error: {}}));
			expect(setMock).not.toBeCalled();
			fireEvent.click(screen.getByRole('button', {name: 'Go back'}));
			expect(setMock.mock.calls).toEqual([['trail', ['one']]]);
		});

		it("shows a button that goes to the start passage if trail isn't an array", () => {
			getMock.mockReturnValue(undefined);
			window.dispatchEvent(new ErrorEvent('error', {error: {}}));
			expect(setMock).not.toBeCalled();
			fireEvent.click(screen.getByRole('button', {name: 'Go back'}));
			expect(setMock.mock.calls).toEqual([['trail', ['start-passage']]]);
		});
	});
});
