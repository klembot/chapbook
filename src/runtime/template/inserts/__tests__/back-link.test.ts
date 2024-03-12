import {
	SpyInstance,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import * as state from '../../../state';
import {backLink} from '../back-link';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {render, screen} from '../../../../test-utils';

describe('Back link insert', () => {
	let getSpy: SpyInstance;

	function renderInsert(label?: string) {
		render(
			backLink.render(null, {label}, 'back link, label: "variableName"') ?? ''
		);
	}

	beforeAll(initTemplateCustomElements);

	beforeEach(() => {
		getSpy = vi.spyOn(state, 'get');
		getSpy.mockImplementation((name: string) => {
			if (name === 'trail') {
				return ['last-passage', 'current-passage'];
			}

			throw new Error(`Unexpected variable: ${name}`);
		});
	});

	it('its invocation matches "back link"', () =>
		expect(backLink.match.test('back link')).toBe(true));

	describe('when rendering', () => {
		it('renders a link with appropriate attributes', () => {
			renderInsert();

			const link = screen.getByRole('link');

			expect(link.nodeName).toBe('PASSAGE-LINK');
			expect(link).toHaveAttribute('class', 'link');
			expect(link).toHaveAttribute('to', 'last-passage');
		});

		it('defaults the label to "Back"', () => {
			renderInsert();
			expect(screen.getByRole('link')).toHaveTextContent('Back');
		});

		it('uses the label property if provided', () => {
			renderInsert('test-label');
			expect(screen.getByRole('link')).toHaveTextContent('test-label');
		});

		it('does nothing if the trail in state is not an array', () => {
			getSpy.mockReturnValue(false);
			expect(backLink.render(null, {}, 'back link')).toBeUndefined();
		});

		it('does nothing if the trail in state is an empty array', () => {
			getSpy.mockReturnValue([]);
			expect(backLink.render(null, {}, 'back link')).toBeUndefined();
		});

		it('renders a link to the first passage if the trail has only one entry', () => {
			getSpy.mockReturnValue(['first-passage']);
			renderInsert();
			expect(screen.getByRole('link')).toHaveAttribute('to', 'first-passage');
		});
	});
});
