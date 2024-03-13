import {beforeAll, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {InlineButton} from '../inline-button';
import {fireEvent, render, screen} from '../../../../test-utils';

describe('<inline-button>', () => {
	beforeAll(() => {
		defineElements({'inline-button': InlineButton});
	});

	it('renders a button by default', () => {
		render('<inline-button>test</inline-button>');

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('test');
	});

	it('preserves a role set on itself externally', () => {
		render('<inline-button role="link">test</inline-button>');

		expect(screen.getByRole('link')).toBeTruthy();
	});

	it.each([[' '], ['Enter']])(
		'dispatches a click event when receiving a "%s" keypress',
		key => {
			const clickSpy = vi.fn();

			render('<inline-button>test</inline-button>');

			const button = screen.getByRole('button');

			button.addEventListener('click', clickSpy);
			expect(clickSpy).not.toBeCalled();
			fireEvent.keyDown(button, {key});
			expect(clickSpy).toBeCalled();
		}
	);
});
