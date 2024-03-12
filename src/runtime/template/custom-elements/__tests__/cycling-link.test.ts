import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import * as state from '../../../state';
import {CyclingLink} from '../cycling-link';
import {
	fireEvent,
	mockContentElements,
	render,
	screen
} from '../../../../test-utils';

describe('<cycling-link>', () => {
	const setSpy = vi.spyOn(state, 'set');

	beforeAll(() => {
		defineElements({'cycling-link': CyclingLink});
	});

	afterEach(() => {
		setSpy.mockClear();
	});

	it('displays children', () => {
		document.body.innerHTML = '<cycling-link>child</cycling-link>';
		expect(screen.getByText('child')).toBeInTheDocument();
	});

	describe('When clicked', () => {
		describe("When the current choice isn't at the end of the array", () => {
			beforeEach(() => {
				render(`<body-content><cycling-link choices="[&quot;one&quot;,&quot;two&quot;]" set="var-name">
					one
				</cycling-link></body-content>`);

				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'one'}));
			});

			it('sets content to the next choice', () =>
				expect(screen.getByRole('button')).toHaveTextContent('two'));

			it('sets the variable in the set attribute', () => {
				expect(setSpy).toHaveBeenLastCalledWith('var-name', 'two');
			});
		});

		describe('When the current choice is at the end at the array', () => {
			beforeEach(() => {
				render(`<body-content><cycling-link choices="[&quot;one&quot;,&quot;two&quot;]" set="var-name">
					two
				</cycling-link></body-content>`);
				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'two'}));
			});

			it('sets content to the first choice', () =>
				expect(screen.getByRole('button')).toHaveTextContent('one'));

			it('sets the variable in the set attribute', () => {
				expect(setSpy).toHaveBeenLastCalledWith('var-name', 'one');
			});
		});

		// Can't test error conditions (e.g. choices attribute is malformed) because
		// there isn't a way to assert on a global error.
	});
});
