import {SpyInstance, beforeEach, describe, expect, it, vi} from 'vitest';
import {dropdownMenu} from '../dropdown-menu';
import * as state from '../../../state';
import {render, screen, within} from '../../../../test-utils';

const choices = ['red', 'green', 'blue'];

describe('Dropdown menu insert', () => {
	function renderInsert() {
		render(
			dropdownMenu.render(
				'variableName',
				{choices},
				'dropdown menu link for: variableName'
			) ?? ''
		);
	}

	let getMock: SpyInstance;
	let setMock: SpyInstance;

	beforeEach(() => {
		/* eslint-disable @typescript-eslint/no-empty-function */
		getMock = vi.spyOn(state, 'get').mockImplementation(() => {});
		setMock = vi.spyOn(state, 'set').mockImplementation(() => {});
		/* eslint-enable @typescript-eslint/no-empty-function */
	});

	describe('its invocations', () => {
		it('matches "dropdown menu"', () =>
			expect(dropdownMenu.match.test('dropdown menu')).toBe(true));

		it('matches "dropdown menu for"', () =>
			expect(dropdownMenu.match.test('dropdown menu for: foo')).toBe(true));
	});

	describe('when rendering', () => {
		it('renders a select wrapped in variable-binding with appropriate options', () => {
			renderInsert();

			const select = screen.getByRole('combobox');

			expect(select).toBeInTheDocument();
			expect(select.closest('variable-binding')).toHaveAttribute(
				'name',
				'variableName'
			);

			const options = within(select).getAllByRole('option');

			expect(options.length).toBe(3);

			for (let i = 0; i < choices.length; i++) {
				expect(options[i]).toHaveAttribute(
					'data-json-value',
					JSON.stringify(choices[i])
				);
				expect(options[i]).toHaveTextContent(choices[i]);
			}
		});

		describe('When a variable name is set, but the variable is undefined', () => {
			beforeEach(() => {
				getMock.mockImplementation(() => undefined);
			});

			it('sets the variable to the first choice', () => {
				renderInsert();
				expect(setMock.mock.calls).toEqual([['variableName', 'red']]);
			});

			it('selects the first choice', () => {
				renderInsert();
				expect(screen.getByRole('combobox')).toHaveTextContent('red');
			});
		});

		describe('When a variable name is set and the variable has a value', () => {
			beforeEach(() => {
				getMock.mockImplementation((name: string) => {
					if (name === 'variableName') {
						return 'green';
					}

					throw new Error(`Asked for unexpected variable ${name}`);
				});
			});

			it('does not change the variable', () => {
				renderInsert();
				expect(setMock).not.toBeCalled();
			});

			it("sets the selected option to the variable's value", () => {
				renderInsert();
				expect(screen.getByRole('combobox')).toHaveValue('green');
			});
		});
	});
});
