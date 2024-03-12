import {beforeAll, describe, expect, it} from 'vitest';
import {render, screen} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {TabPanel} from '../tab-panel';

describe('<backstage-tab-panel>', () => {
	beforeAll(() => {
		defineElements({'backstage-tab-panel': TabPanel});
	});

	it('displays a tab panel with children content', () => {
		render('<backstage-tab-panel>test</backstage-tab-panel>');
		expect(screen.getByRole('tabpanel')).toHaveTextContent('test');
	});
});
