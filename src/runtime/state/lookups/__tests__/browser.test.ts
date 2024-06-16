import {describe, expect, it, vi} from 'vitest';
import {get, setLookup} from '../../state';
import {initBrowserLookups} from '../browser';

vi.mock('../../state');

describe('initBrowserLookups', () => {
  const getMock = vi.mocked(get);
  const setLookupMock = vi.mocked(setLookup);

  describe('browser.darkTheme', () => {
    it('is always false if config.style.page.theme.enableSwitching is set to false', () => {
      initBrowserLookups();
      vi.stubGlobal('matchMedia', (test: string) => ({
        matches: test === '(prefers-color-scheme: dark)'
      }));
      getMock.mockImplementation(name => {
        if (name === 'config.style.page.theme.enableSwitching') {
          return false;
        }

        return undefined;
      });

      const setupCall = setLookupMock.mock.calls.find(
        ([name]) => name === 'browser.darkTheme'
      );

      expect(setupCall).not.toBeUndefined();
      expect(setupCall?.[1]()).toBe(false);
    });

    it('is always true if config.style.page.theme.override is set to "dark"', () => {
      initBrowserLookups();
      vi.stubGlobal('matchMedia', (test: string) => ({
        matches: test !== '(prefers-color-scheme: dark)'
      }));
      getMock.mockImplementation(name => {
        switch (name) {
          case 'config.style.page.theme.enableSwitching':
            return true;
          case 'config.style.page.theme.override':
            return 'dark';
        }

        return undefined;
      });

      const setupCall = setLookupMock.mock.calls.find(
        ([name]) => name === 'browser.darkTheme'
      );

      expect(setupCall).not.toBeUndefined();
      expect(setupCall?.[1]()).toBe(true);
    });

    it('is always false if config.style.page.theme.override is set to "light"', () => {
      initBrowserLookups();
      vi.stubGlobal('matchMedia', (test: string) => ({
        matches: test === '(prefers-color-scheme: dark)'
      }));
      getMock.mockImplementation(name => {
        switch (name) {
          case 'config.style.page.theme.enableSwitching':
            return true;
          case 'config.style.page.theme.override':
            return 'light';
        }

        return undefined;
      });

      const setupCall = setLookupMock.mock.calls.find(
        ([name]) => name === 'browser.darkTheme'
      );

      expect(setupCall).not.toBeUndefined();
      expect(setupCall?.[1]()).toBe(false);
    });

    it('returns browser.darkSystemTheme if neither of those states is set', () => {
      initBrowserLookups();
      getMock.mockImplementation(name => {
        switch (name) {
          case 'config.style.page.theme.enableSwitching':
            return true;

          case 'browser.darkSystemTheme':
            return 'test-value';
        }

        return undefined;
      });

      const setupCall = setLookupMock.mock.calls.find(
        ([name]) => name === 'browser.darkTheme'
      );

      expect(setupCall).not.toBeUndefined();
      expect(setupCall?.[1]()).toBe('test-value');
    });
  });

  it('sets browser.darkSystemTheme to whether the browser is set to a dark UI', () => {
    initBrowserLookups();

    const setupCall = setLookupMock.mock.calls.find(
      ([name]) => name === 'browser.darkSystemTheme'
    );

    expect(setupCall).not.toBeUndefined();
    vi.stubGlobal('matchMedia', (test: string) => ({
      matches: test === '(prefers-color-scheme: dark)'
    }));
    expect(setupCall?.[1]()).toBe(true);
    vi.stubGlobal('matchMedia', (test: string) => ({
      matches: test === '(prefers-color-scheme: dark)' ? false : true
    }));
    expect(setupCall?.[1]()).toBe(false);
  });

  it('sets browser.height to the height of the browser window', () => {
    initBrowserLookups();

    const setupCall = setLookupMock.mock.calls.find(
      ([name]) => name === 'browser.height'
    );

    expect(setupCall).not.toBeUndefined();
    expect(setupCall?.[1]()).toBe(window.innerHeight);
  });

  it('sets browser.width to the width of the browser window', () => {
    initBrowserLookups();

    const setupCall = setLookupMock.mock.calls.find(
      ([name]) => name === 'browser.width'
    );

    expect(setupCall).not.toBeUndefined();
    expect(setupCall?.[1]()).toBe(window.innerWidth);
  });

  it('sets browser.online to whether the browser is online', () => {
    initBrowserLookups();

    const setupCall = setLookupMock.mock.calls.find(
      ([name]) => name === 'browser.online'
    );

    expect(setupCall).not.toBeUndefined();
    expect(setupCall?.[1]()).toBe(navigator.onLine);
  });
});
