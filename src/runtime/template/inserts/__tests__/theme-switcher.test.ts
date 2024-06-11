import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {initTemplateCustomElements} from '../../custom-elements/init';
import {themeSwitcher} from '../theme-switcher';
import {render, screen} from '../../../../test-utils';
import {get} from '../../../state';

vi.mock('../../../state');

describe('Theme switcher insert', () => {
  const getMock = vi.mocked(get);

  function renderInsert(
    label: string,
    props: {darkLabel?: string; lightLabel?: string}
  ) {
    render(themeSwitcher.render(label, props, '') ?? '');
  }

  beforeAll(initTemplateCustomElements);

  it('its invocation matches "theme switcher"', () =>
    expect(themeSwitcher.match.test('theme switcher')).toBe(true));

  describe('when rendering', () => {
    beforeEach(() => {
      getMock.mockImplementation(name => {
        if (name === 'config.style.page.theme.enableSwitching') {
          return true;
        }

        return undefined;
      });
    });

    it('renders a theme-switcher element', () => {
      renderInsert('theme switcher', {});

      const button = screen.getByRole('button', {name: 'Switch Theme'});

      expect(button.nodeName).toBe('THEME-SWITCHER');
      expect(button).toHaveAttribute('class', 'link');
    });

    it('renders a theme-switcher element with appropriate elements when given label props', () => {
      renderInsert('theme switcher', {
        darkLabel: 'dark-label',
        lightLabel: 'light-label'
      });

      const button = screen.getByRole('button');

      expect(button.nodeName).toBe('THEME-SWITCHER');
      expect(button).toHaveAttribute('dark-label', 'dark-label');
      expect(button).toHaveAttribute('light-label', 'light-label');
    });
  });
});
