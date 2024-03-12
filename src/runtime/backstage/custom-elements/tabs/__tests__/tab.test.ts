import {beforeAll, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {Tab} from '../tab';

describe('<backstage-tab>', () => {
	beforeAll(() => {
		defineElements({'backstage-tab': Tab});
	});

	it('displays a tab with children content', () => {
		render('<backstage-tab>test</backstage-tab>');
		expect(screen.getByRole('tab', {name: 'test'})).toBeInTheDocument();
	});

	describe('When clicked', () => {
		it('calls the selectTab method of its parent backstage-tabs if it has text content', () => {
			const selectTab = vi.fn();

			render(
				'<backstage-tabs><backstage-tab>test</backstage-tab><backstage-tabs>'
			);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(document.querySelector('backstage-tabs') as any).selectTab = selectTab;
			fireEvent.click(screen.getByRole('tab', {name: 'test'}));
			expect(selectTab.mock.calls).toEqual([['test']]);
		});

		it('does nothing if it has no text content', () => {
			const selectTab = vi.fn();

			render('<backstage-tabs><backstage-tab></backstage-tab><backstage-tabs>');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(document.querySelector('backstage-tabs') as any).selectTab = selectTab;
			fireEvent.click(screen.getByRole('tab'));
			expect(selectTab).not.toBeCalled();
		});
	});
});
