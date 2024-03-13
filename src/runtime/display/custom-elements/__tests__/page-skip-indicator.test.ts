import {beforeAll, describe, expect, it} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {PageSkipIndicator} from '../page-skip-indicator';
import {render} from '../../../../test-utils';

describe('<page-skip-indicator>', () => {
	beforeAll(() => {
		defineElements({'page-skip-indicator': PageSkipIndicator});
	});

	it('adds an active attribute if its parent <parent-skip> dispatches a page-skip-indicator-show event', () => {
		render(
			'<page-skip><page-skip-indicator></page-skip-indicator></page-skip>'
		);
		document
			.querySelector('page-skip')
			?.dispatchEvent(new CustomEvent('page-skip-indicator-show'));
		expect(document.querySelector('page-skip-indicator')).toHaveAttribute(
			'active'
		);
	});

	it('removes its active attribute if its parent <parent-skip> dispatches a page-skip-indicator-hide event', () => {
		render(
			'<page-skip><page-skip-indicator active></page-skip-indicator></page-skip>'
		);
		document
			.querySelector('page-skip')
			?.dispatchEvent(new CustomEvent('page-skip-indicator-hide'));
		expect(document.querySelector('page-skip-indicator')).not.toHaveAttribute(
			'active'
		);
	});
});
