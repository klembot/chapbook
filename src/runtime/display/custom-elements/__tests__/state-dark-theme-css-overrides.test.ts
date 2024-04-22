import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {StateDarkThemeCssOverrides} from '../state-dark-theme-css-overrides';
import {render} from '../../../../test-utils';
import {get} from '../../../state';
import {StateChangeEventDetail} from '../../../custom-events';

vi.mock('../../../state');

function cssVariable(name: string) {
  const el = document.querySelector('state-dark-theme-css-overrides');

  if (!el) {
    return;
  }

  return window.getComputedStyle(el).getPropertyValue(name);
}

function renderWithParent(
  style = '--test-value: light; --dark-test-value: dark'
) {
  render(
    `<state-css-variables style="${style}">
      <state-dark-theme-css-overrides></state-dark-theme-css-overrides>
    </state-css-variables>`
  );

  const parent = document.querySelector('state-css-variables') as HTMLElement;

  return {parent};
}

describe('<state-dark-theme-css-overrides>', () => {
  const getMock = vi.mocked(get);

  function mockState(values: Record<string, unknown> = {}) {
    getMock.mockImplementation((name: string) => values[name]);
  }

  beforeAll(() =>
    defineElements({
      'state-dark-theme-css-overrides': StateDarkThemeCssOverrides
    })
  );

  beforeEach(() => {
    mockState();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('When the theme is light', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addEventListener: vi.fn()
      }));
      mockState({'browser.darkTheme': false});
    });

    it("doesn't set variables", () => {
      renderWithParent();
      expect(cssVariable('--test-value')).toBe('');
    });

    it("doesn't set variables after being mounted", () => {
      const {parent} = renderWithParent();

      parent.style.setProperty('--new-value', 'new-light');
      parent.style.setProperty('--dark-new-value', 'new-dark');
      window.dispatchEvent(
        new CustomEvent<StateChangeEventDetail>('state-change', {
          detail: {name: 'config.style.dark.new.value', value: 'ignored'}
        })
      );
      expect(cssVariable('--new-value')).toBe('');
    });
  });

  describe('When the theme is dark', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', () => ({
        matches: true,
        addEventListener: vi.fn()
      }));
      mockState({'browser.darkTheme': true});
    });

    it('sets variables', async () => {
      renderWithParent();
      await Promise.resolve();
      expect(cssVariable('--test-value')).toBe('var(--dark-test-value)');
    });

    it('sets variables after being mounted', async () => {
      const {parent} = renderWithParent();

      await Promise.resolve();
      parent.style.setProperty('--new-value', 'new-light');
      parent.style.setProperty('--dark-new-value', 'new-dark');
      window.dispatchEvent(
        new CustomEvent<StateChangeEventDetail>('state-change', {
          detail: {name: 'config.style.dark.new.value', value: 'ignored'}
        })
      );
      expect(cssVariable('--new-value')).toBe('var(--dark-new-value)');
    });

    it("sets variables that don't have a light counterpart", async () => {
      renderWithParent('--dark-test-value: dark');
      await Promise.resolve();
      expect(cssVariable('--test-value')).toBe('var(--dark-test-value)');
    });

    it("does nothing if there's no parent element to override", async () => {
      render(
        '<state-dark-theme-css-overrides></state-dark-theme-css-overrides>'
      );
      await Promise.resolve();
      expect(
        (
          document.querySelector(
            'state-dark-theme-css-overrides'
          ) as HTMLElement
        ).style.length
      ).toBe(0);
    });
  });

  describe('When the theme changes from light to dark', () => {
    it('sets all variables', async () => {
      const addEventListener = vi.fn();

      vi.stubGlobal('matchMedia', () => ({
        addEventListener,
        matches: false
      }));
      renderWithParent('--dark-test-value: dark');
      await Promise.resolve();
      expect(cssVariable('--test-value')).toBe('');
      mockState({'browser.darkTheme': true});
      addEventListener.mock.calls[0][1].handleEvent({
        type: 'change',
        matches: true
      });
      expect(cssVariable('--test-value')).toBe('var(--dark-test-value)');
    });

    it("sets variables that don't have a light counterpart", () => {
      const addEventListener = vi.fn();

      vi.stubGlobal('matchMedia', () => ({
        addEventListener,
        matches: false
      }));
      renderWithParent();
      expect(cssVariable('--test-value')).toBe('');
      mockState({'browser.darkTheme': true});
      addEventListener.mock.calls[0][1].handleEvent({
        type: 'change',
        matches: true
      });
      expect(cssVariable('--test-value')).toBe('var(--dark-test-value)');
    });

    it("does nothing if there's no parent element to override", () => {
      const addEventListener = vi.fn();

      vi.stubGlobal('matchMedia', () => ({
        addEventListener,
        matches: false
      }));
      render(
        '<state-dark-theme-css-overrides></state-dark-theme-css-overrides>'
      );
      expect(cssVariable('--test-value')).toBe('');
      mockState({'browser.darkTheme': true});
      addEventListener.mock.calls[0][1].handleEvent({
        type: 'change',
        matches: true
      });
      expect(
        (
          document.querySelector(
            'state-dark-theme-css-overrides'
          ) as HTMLElement
        ).style.length
      ).toBe(0);
    });
  });

  describe('When the theme changes from dark to light', () => {
    it('removes all variables', async () => {
      const addEventListener = vi.fn();

      vi.stubGlobal('matchMedia', (query: string) => ({
        addEventListener,
        matches: query === '(prefers-color-scheme: dark)'
      }));
      mockState({'browser.darkTheme': true});
      renderWithParent();
      await Promise.resolve();
      expect(cssVariable('--test-value')).toBe('var(--dark-test-value)');
      mockState({'browser.darkTheme': false});
      addEventListener.mock.calls[0][1].handleEvent({
        type: 'change',
        matches: false
      });
      expect(cssVariable('--test-value')).toBe('');
    });
  });
});
