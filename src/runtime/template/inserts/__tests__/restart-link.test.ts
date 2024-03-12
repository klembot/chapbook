import {beforeAll, describe, expect, it} from 'vitest';
import {restartLink} from '../restart-link';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {render, screen} from '../../../../test-utils';

describe('Restart link insert', () => {
	function renderInsert(label?: string) {
		render(
			restartLink.render(
				null,
				{label},
				'restart link, label: "variableName"'
			) ?? ''
		);
	}

	beforeAll(initTemplateCustomElements);

	it('its invocation matches "restart link"', () =>
		expect(restartLink.match.test('restart link')).toBe(true));

	describe('when rendering', () => {
		it('renders a button with appropriate attributes', () => {
			renderInsert();

			const link = screen.getByRole('button');

			expect(link.nodeName).toBe('RESTART-LINK');
			expect(link).toHaveAttribute('class', 'link');
		});

		it('defaults the label to "Restart"', () => {
			renderInsert();
			expect(screen.getByRole('button')).toHaveTextContent('Restart');
		});

		it('uses the label property if provided', () => {
			renderInsert('test-label');
			expect(screen.getByRole('button')).toHaveTextContent('test-label');
		});
	});
});
