import {beforeAll, describe, expect, it} from 'vitest';
import {link} from '../link';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {render, screen} from '../../../../test-utils';

describe('Link insert', () => {
	function renderInsert(target?: string, label?: string) {
		render(
			link.render(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				target as any,
				{label},
				`link to: "${target}", label: "variableName"`
			) ?? ''
		);
	}

	beforeAll(initTemplateCustomElements);

	it('its invocation matches "link to"', () =>
		expect(link.match.test('link to')).toBe(true));

	it('renders a link to its target', () => {
		renderInsert('other passage');

		const link = screen.getByRole('link');

		expect(link.nodeName).toBe('PASSAGE-LINK');
		expect(link).toHaveAttribute('to', 'other passage');
		expect(link).toHaveTextContent('other passage');
	});

	it('uses the label provided', () => {
		renderInsert('other passage', 'test-label');

		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('to', 'other passage');
		expect(link).toHaveTextContent('test-label');
	});

	it("does not render anything if a target wasn't provided", () =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(link.render(undefined as any, {}, 'link to:')).toBeUndefined());
});
