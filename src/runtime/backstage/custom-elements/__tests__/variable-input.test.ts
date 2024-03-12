import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '../../../../test-utils';
import {set} from '../../../state';
import {defineElements} from '../../../util/custom-element';
import {VariableInput} from '../variable-input';

vi.mock('../../../state');

describe('<backstage-variable-input>', () => {
	const setMock = vi.mocked(set);

	beforeAll(() => {
		defineElements({'backstage-variable-input': VariableInput});
	});

	beforeEach(() => {
		setMock.mockClear();
	});

	it('displays a text input', () => {
		render('<backstage-variable-input name="test"></backstage-variable-input>');
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	describe('When the text input is changed', () => {
		describe('When the string attribute is unset', () => {
			it('sets the value to the value as parsed by JSON', () => {
				render(
					'<backstage-variable-input name="test"></backstage-variable-input>'
				);
				fireEvent.input(screen.getByRole('textbox'), {
					bubbles: true,
					target: {value: '{"test": true, "test2": "value"}'}
				});
				expect(setMock.mock.calls).toEqual([
					['test', {test: true, test2: 'value'}]
				]);
			});

			it("does nothing if the value can't be parsed as JSON", () => {
				render(
					'<backstage-variable-input name="test"></backstage-variable-input>'
				);
				fireEvent.input(screen.getByRole('textbox'), {
					bubbles: true,
					target: {value: 'not parseable'}
				});
				expect(setMock).not.toBeCalled();
			});
		});

		it('sets the value as string if the string attribute is set', () => {
			render(
				'<backstage-variable-input name="test" string></backstage-variable-input>'
			);
			fireEvent.input(screen.getByRole('textbox'), {
				bubbles: true,
				target: {value: 'true'}
			});
			expect(setMock.mock.calls).toEqual([['test', 'true']]);
		});
	});
});
