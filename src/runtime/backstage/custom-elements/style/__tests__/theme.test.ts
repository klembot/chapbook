import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '../../../../../test-utils';
import {get, set} from '../../../../state';
import {defineElements} from '../../../../util/custom-element';
import {StyleTheme} from '../theme';

vi.mock('../../../../state');

describe('<backstage-style-theme>', () => {
  const getMock = vi.mocked(get);
  const setMock = vi.mocked(set);

  beforeAll(() => {
    defineElements({'backstage-style-theme': StyleTheme});
  });

  beforeEach(() => {
    setMock.mockReset();
  });

  describe.each([
    ['light', 'dark'],
    ['dark', 'light']
  ])('When the current theme is %s', (theme, otherTheme) => {
    beforeEach(() => {
      getMock.mockImplementation((name: string) => {
        switch (name) {
          case 'browser.darkTheme':
            return theme === 'dark';
          case 'config.style.page.theme.enableSwitching':
            return true;
        }

        return undefined;
      });
    });

    it('shows the right label', () => {
      render('<backstage-style-theme></backstage-style-theme>');
      expect(document.querySelector('strong')).toHaveTextContent(theme);
    });

    it('updates the label when the theme changes', () => {
      render('<backstage-style-theme></backstage-style-theme>');
      getMock.mockImplementation((name: string) => {
        switch (name) {
          case 'browser.darkTheme':
            return theme !== 'dark';
          case 'config.style.page.theme.enableSwitching':
            return true;
        }

        return undefined;
      });
      window.dispatchEvent(
        new CustomEvent('system-theme-change', {detail: {theme: otherTheme}})
      );
      expect(document.querySelector('strong')).toHaveTextContent(otherTheme);
    });

    it('shows a button that switches to the opposite theme', () => {
      render('<backstage-style-theme></backstage-style-theme>');
      expect(setMock).not.toBeCalled();
      fireEvent.click(screen.getByRole('button', {name: 'Switch Theme'}));
      getMock.mockImplementation((name: string) => {
        switch (name) {
          case 'browser.darkTheme':
            return theme === 'light';
          case 'config.style.page.theme.enableSwitching':
            return true;
        }

        return undefined;
      });
      fireEvent.click(screen.getByRole('button', {name: 'Switch Theme'}));
      expect(setMock.mock.calls).toEqual([
        ['config.style.page.theme.override', otherTheme],
        ['config.style.page.theme.override', theme]
      ]);
    });

    it('disables the button if theme switching is disabled', () => {
      getMock.mockImplementation((name: string) => {
        switch (name) {
          case 'browser.darkTheme':
            return theme === 'dark';
          case 'config.style.page.theme.enableSwitching':
            return false;
        }

        return undefined;
      });
      render('<backstage-style-theme></backstage-style-theme>');
      expect(screen.getByRole('button', {name: 'Switch Theme'})).toBeDisabled();
    });
  });

  describe('The theme switching checkbox', () => {
    describe.each([[true], [false]])(
      'when config.style.page.theme.enableSwitching is %s',
      enableSwitching => {
        beforeEach(() => {
          getMock.mockImplementation((name: string) => {
            switch (name) {
              case 'browser.darkTheme':
                return false;
              case 'config.style.page.theme.enableSwitching':
                return enableSwitching;
            }

            return undefined;
          });
        });

        it('has the correct checked state', () => {
          render('<backstage-style-theme></backstage-style-theme>');

          if (enableSwitching) {
            expect(
              screen.getByRole('checkbox', {name: 'Theme switching'})
            ).toBeChecked();
          } else {
            expect(
              screen.getByRole('checkbox', {name: 'Theme switching'})
            ).not.toBeChecked();
          }
        });

        it('updates checked state if config.style.page.theme.enableSwitching is changed', () => {
          render('<backstage-style-theme></backstage-style-theme>');
          getMock.mockImplementation((name: string) => {
            switch (name) {
              case 'browser.darkTheme':
                return false;
              case 'config.style.page.theme.enableSwitching':
                return !enableSwitching;
            }

            return undefined;
          });
          window.dispatchEvent(
            new CustomEvent('state-change', {
              detail: {
                name: 'config.style.page.theme.enableSwitching',
                value: !enableSwitching
              }
            })
          );

          if (enableSwitching) {
            expect(
              screen.getByRole('checkbox', {name: 'Theme switching'})
            ).not.toBeChecked();
          } else {
            expect(
              screen.getByRole('checkbox', {name: 'Theme switching'})
            ).toBeChecked();
          }
        });

        it('toggles the variable when clicked', () => {
          render('<backstage-style-theme></backstage-style-theme>');
          expect(setMock).not.toBeCalled();
          fireEvent.click(
            screen.getByRole('checkbox', {name: 'Theme switching'})
          );
          expect(setMock.mock.calls).toEqual([
            ['config.style.page.theme.enableSwitching', !enableSwitching]
          ]);
        });
      }
    );
  });
});
