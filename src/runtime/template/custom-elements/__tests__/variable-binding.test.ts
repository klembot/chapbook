import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import * as state from '../../../state';
import {defineElements} from '../../../util/custom-element';
import {VariableBinding} from '../variable-binding';
import {fireEvent, render, screen} from '../../../../test-utils';

describe('<variable-binding>', () => {
	const setSpy = vi.spyOn(state, 'set');

	beforeAll(() => {
		defineElements({'variable-binding': VariableBinding});
	});

	afterEach(() => {
		setSpy.mockClear();
	});

	it('displays children', () => {
		render('<variable-binding name="var-name">child</variable-binding>');
		expect(screen.getByText('child')).toBeInTheDocument();
	});

	it('sets the variable in the name attribute when a text input child is changed', () => {
		render(
			'<variable-binding name="var-name"><input type="text" /></variable-binding>'
		);
		expect(setSpy).not.toBeCalled();
		fireEvent.change(screen.getByRole('textbox'), {target: {value: 'change'}});
		expect(setSpy.mock.calls).toEqual([['var-name', 'change']]);
	});

	it('sets the variable in the name attribute when a select child is changed', () => {
		render(`
			<variable-binding name="var-name">
				<select><option value="1">one</option><option value="2">two</option></select>
			</variable-binding>
		`);
		expect(setSpy).not.toBeCalled();
		fireEvent.change(screen.getByRole('combobox'), {target: {value: '1'}});
		expect(setSpy.mock.calls).toEqual([['var-name', '1']]);
	});

	it('uses the data-json-value attribute of the option if set', () => {
		render(`
			<variable-binding name="var-name">
				<select>
					<option value="1" data-json-value="1">one</option>
					<option value="2" data-json-value="&quot;two&quot;">two</option>
				</select>
			</variable-binding>
		`);
		expect(setSpy).not.toBeCalled();
		fireEvent.change(screen.getByRole('combobox'), {
			target: {value: 1}
		});
		fireEvent.change(screen.getByRole('combobox'), {
			target: {value: 2}
		});
		expect(setSpy.mock.calls).toEqual([
			['var-name', 1],
			['var-name', 'two']
		]);
	});
});
