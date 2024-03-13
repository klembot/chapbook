import {
	MockInstance,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {render, screen} from '../../../../test-utils';
import {defineElements} from '../../../util/custom-element';
import {WarningList} from '../warning-list';
import {get} from '../../../state';

vi.mock('../../../state');

describe('<warning-list>', () => {
	const getMock = vi.mocked(get);
	let warnSpy: MockInstance;

	beforeAll(() => {
		defineElements({
			'warning-list': WarningList
		});
		warnSpy = vi.spyOn(console, 'warn').mockReturnValue(undefined);
	});

	beforeEach(() => {
		getMock.mockImplementation(name => {
			return name === 'config.testing';
		});
		warnSpy.mockClear();
	});

	it('displays nothing initially', () => {
		render('<warning-list></warning-list>');
		expect(document.body.textContent).toBe('');
	});

	describe('When a console.warn() call is made', () => {
		beforeEach(() => {
			render('<warning-list></warning-list>');
		});

		it('displays the message if config.testing is true', () => {
			console.warn('test-message');
			expect(screen.getByText('Warning: test-message')).toBeInTheDocument();
		});

		it("doesn't display the message if config.testing is false", () => {
			getMock.mockReturnValue(undefined);
			console.warn('test-message');
			expect(
				screen.queryByText('Warning: test-message')
			).not.toBeInTheDocument();
		});

		it('calls the original console.warn() function with the message', () => {
			console.warn('test-message');
			expect(warnSpy.mock.calls).toEqual([['test-message']]);
		});

		it('adds additional warnings', () => {
			console.warn('test-1');
			console.warn('test-2');
			expect(screen.getByText('Warning: test-1')).toBeInTheDocument();
			expect(screen.getByText('Warning: test-2')).toBeInTheDocument();
		});

		it('empties its contents when the trail variable changes', () => {
			console.warn('test-message');
			expect(screen.getByText('Warning: test-message')).toBeVisible();
			window.dispatchEvent(
				new CustomEvent('state-change', {detail: {name: 'trail'}})
			);
			expect(screen.queryByText('Warning: test-message')).not.toBeVisible();
		});

		it('ignores other state changes', () => {
			console.warn('test-message');
			expect(screen.getByText('Warning: test-message')).toBeVisible();
			window.dispatchEvent(
				new CustomEvent('state-change', {detail: {name: 'other'}})
			);
			expect(screen.queryByText('Warning: test-message')).toBeVisible();
		});
	});
});
