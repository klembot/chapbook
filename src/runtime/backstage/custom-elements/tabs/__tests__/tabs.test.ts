import {beforeAll, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../../util/custom-element';
import {Tabs} from '../tabs';
import {render, screen} from '../../../../../test-utils';

describe('<backstage-tabs>', () => {
	beforeAll(() => {
		defineElements({'backstage-tabs': Tabs});
	});

	it('displays children', () => {
		render('<backstage-tabs>test</backstage-tabs>');
		expect(screen.getByText('test')).toBeInTheDocument();
	});

	it('selects the first tab', () => {
		vi.useFakeTimers();
		render(
			`<backstage-tabs>
				<div role="tab" aria-controls="panel1">1</div>
				<div role="tab" aria-controls="panel2">2</div>
				<div role="tabpanel" id="panel1" data-testid="panel1"></div>
				<div role="tabpanel" id="panel2" data-testid="panel2"></div>
			</backstage-tabs>`
		);
		vi.advanceTimersToNextTimer();
		expect(screen.getByRole('tab', {name: '1'})).toHaveAttribute(
			'aria-selected',
			'true'
		);
		expect(screen.getByRole('tab', {name: '2'})).toHaveAttribute(
			'aria-selected',
			'false'
		);
		expect(screen.getByTestId('panel1')).not.toHaveAttribute('hidden');
		expect(screen.getByTestId('panel2')).toHaveAttribute('hidden');
		vi.useRealTimers();
	});

	describe('its selectTab method', () => {
		it('selects a tab by name', () => {
			render(
				`<backstage-tabs>
					<div role="tab" aria-controls="panel1">1</div>
					<div role="tab" aria-controls="panel2">2</div>
					<div role="tabpanel" id="panel1" data-testid="panel1"></div>
					<div role="tabpanel" id="panel2" data-testid="panel2"></div>
				</backstage-tabs>`
			);
			(document.querySelector('backstage-tabs') as Tabs).selectTab('2');
			expect(screen.getByRole('tab', {name: '1'})).toHaveAttribute(
				'aria-selected',
				'false'
			);
			expect(screen.getByRole('tab', {name: '2'})).toHaveAttribute(
				'aria-selected',
				'true'
			);
			expect(screen.getByTestId('panel1')).toHaveAttribute('hidden');
			expect(screen.getByTestId('panel2')).not.toHaveAttribute('hidden');
		});

		it('selects a tab by index', () => {
			render(
				`<backstage-tabs>
					<div role="tab" aria-controls="panel1">1</div>
					<div role="tab" aria-controls="panel2">2</div>
					<div role="tabpanel" id="panel1" data-testid="panel1"></div>
					<div role="tabpanel" id="panel2" data-testid="panel2"></div>
				</backstage-tabs>`
			);
			(document.querySelector('backstage-tabs') as Tabs).selectTab(1);
			expect(screen.getByRole('tab', {name: '1'})).toHaveAttribute(
				'aria-selected',
				'false'
			);
			expect(screen.getByRole('tab', {name: '2'})).toHaveAttribute(
				'aria-selected',
				'true'
			);
			expect(screen.getByTestId('panel1')).toHaveAttribute('hidden');
			expect(screen.getByTestId('panel2')).not.toHaveAttribute('hidden');
		});
	});
});
