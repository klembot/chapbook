import {beforeAll, beforeEach, describe, it, expect, vi} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {ThemeSwitcher} from '../theme-switcher';
import {fireEvent, render, screen} from '../../../../test-utils';
import {get, set} from '../../../state';

vi.mock('../../../state');

describe('<theme-switcher>', () => {
  const getMock = vi.mocked(get);
  const setMock = vi.mocked(set);

  beforeAll(() => {
    defineElements({'theme-switcher': ThemeSwitcher});
  });

  describe.each([
    ['light', 'dark'],
    ['dark', 'light']
  ])('When the browser theme is %s', (theme, themeChange) => {
    beforeEach(() => {
      getMock.mockImplementation(name => {
        switch (name) {
          case 'browser.darkTheme':
            return theme === 'dark';
          case 'config.style.page.theme.enableSwitching':
            return true;
        }

        return undefined;
      });
      setMock.mockReset();
    });

    it(`shows the ${theme} label if set`, () => {
      render(`<theme-switcher ${theme}-label="test-label"></theme-switcher>`);
      expect(screen.getByRole('button')).toHaveTextContent('test-label');
    });

    it('shows a fallback label if no label is set', () => {
      render('<theme-switcher></theme-switcher>');
      expect(screen.getByRole('button')).toHaveTextContent('Switch Theme');
    });

    it(`sets the theme override to ${themeChange} when clicked`, () => {
      render('<theme-switcher></theme-switcher>');
      expect(setMock).not.toBeCalled();
      fireEvent.click(screen.getByRole('button'));
      expect(setMock.mock.calls).toEqual([
        ['config.style.page.theme.override', themeChange]
      ]);
    });
  });
});
