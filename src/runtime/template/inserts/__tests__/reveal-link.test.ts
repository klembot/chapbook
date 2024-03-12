import {beforeAll, describe, expect, it} from 'vitest';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {revealLink} from '../reveal-link';
import {render, screen} from '../../../../test-utils';

describe('Reveal link insert', () => {
	function renderInsert(
		label: string,
		props: {passage?: string; text?: string}
	) {
		render(revealLink.render(label, props, '') ?? '');
	}

	beforeAll(initTemplateCustomElements);

	it('its invocation matches "reveal link"', () =>
		expect(revealLink.match.test('reveal link')).toBe(true));

	describe('when rendering', () => {
		it('renders a reveal-link with appropriate attributes when given a text prop', () => {
			renderInsert('reveal label', {text: 'reveal text'});

			const button = screen.getByRole('button', {name: 'reveal label'});

			expect(button.nodeName).toBe('REVEAL-LINK');
			expect(button).toHaveAttribute('class', 'link');
			expect(button).toHaveAttribute('text', 'reveal text');
		});

		it('renders a reveal-link with appropriate attributes when given a passage prop', () => {
			renderInsert('reveal label', {passage: 'reveal passage'});

			const button = screen.getByRole('button', {name: 'reveal label'});

			expect(button.nodeName).toBe('REVEAL-LINK');
			expect(button).toHaveAttribute('class', 'link');
			expect(button).toHaveAttribute('passage', 'reveal passage');
		});

		it('renders nothing if not given a label', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderInsert(undefined as any, {text: 'reveal text'});
			expect(document.body).toHaveTextContent('');
		});
	});
});
