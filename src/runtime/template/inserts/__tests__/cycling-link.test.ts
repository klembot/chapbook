import {
	SpyInstance,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {cyclingLink} from '../cycling-link';
import * as state from '../../../state';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {render, screen} from '../../../../test-utils';

const choices = ['red', 'green', 'blue'];

describe('Cycling link insert', () => {
	function renderInsert() {
		render(
			cyclingLink.render(
				'variableName',
				{choices},
				'cycling link for: variableName'
			) ?? ''
		);
	}

	let getMock: SpyInstance;
	let setMock: SpyInstance;

	beforeAll(initTemplateCustomElements);

	beforeEach(() => {
		/* eslint-disable @typescript-eslint/no-empty-function */
		getMock = vi.spyOn(state, 'get').mockImplementation(() => {});
		setMock = vi.spyOn(state, 'set').mockImplementation(() => {});
		/* eslint-enable @typescript-eslint/no-empty-function */
	});

	describe('its invocations', () => {
		it('matches "cycling link"', () =>
			expect(cyclingLink.match.test('cycling link')).toBe(true));

		it('matches "cycling link for"', () =>
			expect(cyclingLink.match.test('cycling link for: foo')).toBe(true));
	});

	describe('when rendering', () => {
		it('renders a button with appropriate attributes', () => {
			renderInsert();

			const button = screen.getByRole('button');

			expect(button.nodeName).toBe('CYCLING-LINK');
			expect(button).toHaveAttribute('class', 'link');
			expect(button).toHaveAttribute('choices', JSON.stringify(choices));
			expect(button).toHaveAttribute('set', 'variableName');
		});

		describe('When a variable name is set, but the variable is undefined', () => {
			beforeEach(() => {
				getMock.mockImplementation(() => undefined);
			});

			it('sets the variable to the first choice', () => {
				renderInsert();
				expect(setMock.mock.calls).toEqual([['variableName', 'red']]);
			});

			it('displays the first choice', () => {
				renderInsert();
				expect(screen.getByRole('button')).toHaveTextContent('red');
			});
		});

		describe('When a variable name is set and the variable has a value', () => {
			beforeEach(() => {
				getMock.mockImplementation((name: string) => {
					if (name === 'variableName') {
						return 'green';
					}

					throw new Error(`Asked for unexpecte variable ${name}`);
				});
			});

			it('does not change the variable', () => {
				renderInsert();
				expect(setMock).not.toBeCalled();
			});

			it("displays the variable's value", () => {
				renderInsert();
				expect(screen.getByRole('button')).toHaveTextContent('green');
			});
		});
	});
});
