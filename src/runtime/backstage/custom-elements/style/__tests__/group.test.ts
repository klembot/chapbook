import {beforeAll, describe, expect, it, vi} from 'vitest';
import {render, screen} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {StyleGroup} from '../group';
import {VariableInput} from '../../variable-input';
import {get} from '../../../../state';

vi.mock('../../../../state');

describe('<backstage-style-group>', () => {
  const getMock = vi.mocked(get);

  beforeAll(() => {
    defineElements({
      'backstage-style-group': StyleGroup,
      'backstage-variable-input': VariableInput
    });
  });

  describe.each([
    ['font', 'Font', 'font'],
    ['color', 'Color', 'color'],
    ['link font', 'Link Font', 'link.font'],
    ['link color', 'Link Color', 'link.color'],
    ['link line color', 'Link Line Color', 'link.lineColor'],
    ['active link font', 'Active Link Font', 'link.active.font'],
    ['active link color', 'Active Link Color', 'link.active.color'],
    [
      'active link line color',
      'Active Link Line Color',
      'link.active.lineColor'
    ]
  ])('%s', (_, label, varName) => {
    it('shows a <backstage-variable-input> for the config.style variable in light theme', () => {
      getMock.mockReturnValue(false);
      render(
        '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
      );

      const input = screen
        .getByRole('textbox', {name: label})
        .closest('backstage-variable-input');

      expect(input).not.toBeNull();
      expect(input).toHaveAttribute(
        'name',
        `config.style.test-prefix.${varName}`
      );
      expect(input).not.toHaveAttribute('placeholder');
      expect(input).toHaveAttribute('string');
    });

    describe('When the theme is dark', () => {
      it('shows a <backstage-variable-input> for the config.dark.style variable', () => {
        getMock.mockImplementation((name: string) => {
          switch (name) {
            case 'browser.darkTheme':
              return true;

            case `config.style.test-prefix.${varName}`:
              return 'light-version';
          }

          return undefined;
        });
        render(
          '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
        );

        const input = screen
          .getByRole('textbox', {name: label})
          .closest('backstage-variable-input');

        expect(input).not.toBeNull();
        expect(input).toHaveAttribute(
          'name',
          `config.style.dark.test-prefix.${varName}`
        );
        expect(input).toHaveAttribute('placeholder', 'light-version');
      });

      it("doesn't show a placeholder if there is no light version of the variable set", () => {
        getMock.mockImplementation((name: string) => {
          if (name === 'browser.darkTheme') {
            return true;
          }

          return undefined;
        });
        render(
          '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
        );

        expect(
          screen
            .getByRole('textbox', {name: label})
            .closest('backstage-variable-input')
        ).not.toHaveAttribute('placeholder');
      });
    });

    it("updates the input's name when the system theme changes from light to dark", () => {
      getMock.mockReturnValue(false);
      render(
        '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
      );

      const input = screen
        .getByRole('textbox', {name: label})
        .closest('backstage-variable-input');

      expect(input).toHaveAttribute(
        'name',
        `config.style.test-prefix.${varName}`
      );
      getMock.mockReturnValue(true);
      window.dispatchEvent(new CustomEvent('system-theme-change'));
      expect(input).toHaveAttribute(
        'name',
        `config.style.dark.test-prefix.${varName}`
      );
    });

    it("updates the input's name when the system theme changes from light to dark", () => {
      getMock.mockReturnValue(true);
      render(
        '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
      );

      const input = screen
        .getByRole('textbox', {name: label})
        .closest('backstage-variable-input');

      expect(input).toHaveAttribute(
        'name',
        `config.style.dark.test-prefix.${varName}`
      );
      getMock.mockReturnValue(false);
      window.dispatchEvent(new CustomEvent('system-theme-change'));
      expect(input).toHaveAttribute(
        'name',
        `config.style.test-prefix.${varName}`
      );
    });

    it("updates the input's name when the theme override is set to 'light'", () => {
      getMock.mockReturnValue(true);
      render(
        '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
      );

      const input = screen
        .getByRole('textbox', {name: label})
        .closest('backstage-variable-input');

      expect(input).toHaveAttribute(
        'name',
        `config.style.dark.test-prefix.${varName}`
      );
      getMock.mockReturnValue(false);
      window.dispatchEvent(
        new CustomEvent('state-change', {
          detail: {name: 'config.style.page.theme.override', value: 'light'}
        })
      );
      expect(input).toHaveAttribute(
        'name',
        `config.style.test-prefix.${varName}`
      );
    });

    it("updates the input's name when the theme override is set to 'dark'", () => {
      getMock.mockReturnValue(false);
      render(
        '<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
      );

      const input = screen
        .getByRole('textbox', {name: label})
        .closest('backstage-variable-input');

      expect(input).toHaveAttribute(
        'name',
        `config.style.test-prefix.${varName}`
      );
      getMock.mockReturnValue(true);
      window.dispatchEvent(
        new CustomEvent('state-change', {
          detail: {name: 'config.style.page.theme.override', value: 'dark'}
        })
      );
      expect(input).toHaveAttribute(
        'name',
        `config.style.dark.test-prefix.${varName}`
      );
    });
  });
});
