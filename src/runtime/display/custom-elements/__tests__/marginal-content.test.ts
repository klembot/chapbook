import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '../../../../test-utils';
import {get} from '../../../state';
import {defineElements} from '../../../util/custom-element';
import {transition} from '../../transitions';
import {MarginalContent} from '../marginal-content';

vi.mock('../../transitions');
vi.mock('../../../state');

describe('<marginal-content>', () => {
	const getMock = vi.mocked(get);
	const transitionMock = vi.mocked(transition);

	beforeAll(() => {
		defineElements({'marginal-content': MarginalContent});
	});

	beforeEach(() => {
		getMock.mockImplementation((name: string) => {
			switch (name) {
				case 'config.footer.transition.name':
					return 'mock-footer-transition';
				case 'config.footer.transition.duration':
					return 'mock-footer-duration';
				case 'config.header.transition.name':
					return 'mock-header-transition';
				case 'config.header.transition.duration':
					return 'mock-header-duration';
				default:
					return undefined;
			}
		});
		transitionMock.mockClear();
	});

	describe.each([['header'], ['footer']])('With type attribute "%s"', type => {
		it(`transitions content with the ${type} transition type and duration`, async () => {
			render(`<marginal-content type="${type}"></marginal-content>`);

			const el = document.querySelector('marginal-content') as MarginalContent;

			await el.changeContent(content => {
				content.innerHTML = '<p>changed</p>';
			});
			expect(screen.getByText('changed')).toBeInTheDocument();
			expect(transitionMock.mock.calls).toEqual([
				[
					el,
					'<p>changed</p>',
					`mock-${type}-transition`,
					`mock-${type}-duration`
				]
			]);
		});

		it(`updates when a display-change event is dispatched on window`, async () => {
			render(`<marginal-content type="${type}"></marginal-content>`);
			window.dispatchEvent(
				new CustomEvent('display-change', {
					detail: {
						[type]: {
							center: 'test-center',
							left: 'test-left',
							right: 'test-right'
						}
					}
				})
			);
			await Promise.resolve();
			expect(document.querySelector('marginal-content')).toHaveTextContent(
				'test-lefttest-centertest-right'
			);
		});
	});
});
