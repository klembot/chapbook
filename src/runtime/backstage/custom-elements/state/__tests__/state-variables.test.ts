import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../../util/custom-element';
import {StateVariables} from '../state-variables';
import {varNames} from '../../../../state';
import {fireEvent, render, screen} from '../../../../../test-utils';
import {VariableInput} from '../../variable-input';

vi.mock('../../../../state');

describe('<state-variables>', () => {
	const varNamesMock = vi.mocked(varNames);

	beforeAll(() => {
		defineElements({
			'backstage-state-variables': StateVariables,
			'backstage-variable-input': VariableInput
		});
	});

	beforeEach(() => {
    varNamesMock.mockImplementation(includeDefaults => {
      if (includeDefaults) {
        return ['var-1', 'default-1', 'config.random.privateState.x'];
      }

      return ['var-1', 'config.random.privateState.x'];
    });
  });

  it('defaults to showing a <backstage-variable-input> for all user-set variables', () => {
    render('<backstage-state-variables></backstage-state-variables>');

    const field = screen.getByRole('textbox', {name: 'var-1'});
    const input = field.closest('backstage-variable-input');

    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', 'var-1');
    expect(input).not.toHaveAttribute('string');
    expect(
      screen.queryByRole('textbox', {name: 'default-1'})
    ).not.toBeInTheDocument();
  });

  it('includes defaults if the defaults checkbox is checked', () => {
    render('<backstage-state-variables></backstage-state-variables>');
    fireEvent.click(screen.getByRole('checkbox', {name: 'Show Defaults'}));

    for (const name of ['var-1', 'default-1']) {
      const field = screen.getByRole('textbox', {name});
      const input = field.closest('backstage-variable-input');

      expect(input).not.toBeNull();
      expect(input).toHaveAttribute('name', name);
      expect(input).not.toHaveAttribute('string');
    }
  });

  it("doesn't show variables under config.random.privateState", () => {
    render('<backstage-state-variables></backstage-state-variables>');
    expect(
      screen.queryByRole('textbox', {name: 'config.random.privateState.x'})
    ).not.toBeInTheDocument();
  });
});
