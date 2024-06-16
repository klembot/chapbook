import {beforeAll, describe, expect, it, vi} from 'vitest';
import {dispatchStateChange, render, screen} from '../../../../../test-utils';
import {get, varNames} from '../../../../state';
import {defineElements} from '../../../../util/custom-element';
import {StyleConfig} from '../config';

vi.mock('../../../../state');

describe('<backstage-style-config>', () => {
  const getMock = vi.mocked(get);
  const label =
    'Enter this code into your first passage’s variables section to permanently use this style:';
  const varNamesMock = vi.mocked(varNames);

  beforeAll(() => {
    defineElements({'backstage-style-config': StyleConfig});
    getMock.mockImplementation((name: string) => `${name}-value`);
    varNamesMock.mockReturnValue([
      'config.style.test',
      'config.style.dark.test'
    ]);
  });

  it('displays a read-only textarea showing how to set the current style in variables', () => {
    render('<backstage-style-config></backstage-config>');
    expect(screen.getByRole('textbox', {name: label})).toHaveValue(
      [
        'config.style.test: "config.style.test-value"',
        'config.style.dark.test: "config.style.dark.test-value"'
      ].join('\n')
    );
  });

  it('updates when state changes', () => {
    render('<backstage-style-config></backstage-config>');
    expect(
      screen.getByRole<HTMLTextAreaElement>('textbox', {name: label}).value
    ).toContain('config.style.test: "config.style.test-value"');
    getMock.mockImplementation((name: string) => `${name}-value-changed`);
    dispatchStateChange('config.style.test', 'ignored');
    expect(
      screen.getByRole<HTMLTextAreaElement>('textbox', {name: label}).value
    ).toContain('config.style.test: "config.style.test-value-changed"');
  });

  it('omits undefined state variables', () => {
    getMock.mockImplementation((name: string) => {
      if (name === 'config.style.test') {
        return 'defined';
      }

      return undefined;
    });
    render('<backstage-style-config></backstage-config>');
    expect(screen.getByRole('textbox', {name: label})).toHaveValue(
      'config.style.test: "defined"'
    );
  });

  it('omits config.style.page.theme.override', () => {
    varNamesMock.mockReturnValue(['config.style.page.theme.override']);
    getMock.mockImplementation((name: string) => {
      if (name === 'config.style.page.theme.override') {
        return 'light';
      }

      return undefined;
    });

    render('<backstage-style-config></backstage-config>');
    expect(screen.getByRole('textbox', {name: label})).toHaveValue('');
  });
});
