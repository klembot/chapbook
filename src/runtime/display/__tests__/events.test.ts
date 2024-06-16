import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {initDisplayEvents} from '../events';
import {get} from '../../state';
import {passageNamed} from '../../story';

vi.mock('../../state');
vi.mock('../../story');

describe('Display events', () => {
  const getMock = vi.mocked(get);
  const matchMediaMock = {
    addEventListener: vi.fn(),
    matches: false
  };
  const passageNamedMock = vi.mocked(passageNamed);

  beforeAll(() => {
    vi.stubGlobal('matchMedia', () => matchMediaMock);
    initDisplayEvents();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    getMock.mockImplementation((name: string) => {
      if (/config\.(header|footer)\.(left|center|right)/.test(name)) {
        return `${name} source`;
      }

      if (name === 'trail') {
        return ['test-passage'];
      }

      return undefined;
    });

    passageNamedMock.mockImplementation((name: string) => {
      if (name === 'test-passage') {
        return {name: 'test-passage', source: 'mock-source', tags: []};
      }

      return undefined;
    });
  });

  it('dispatches a display-change event when the trail changes', async () => {
    const listener = vi.fn();

    window.addEventListener('display-change', listener);
    window.dispatchEvent(
      new CustomEvent('state-change', {detail: {name: 'trail'}})
    );

    // Need to wait here because the event dispatch doesn't happen immediately.

    await Promise.resolve();
    expect(listener).toBeCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({
      body: '<p>mock-source</p>\n',
      footer: {
        center: '<p>config.footer.center source</p>\n',
        left: '<p>config.footer.left source</p>\n',
        right: '<p>config.footer.right source</p>\n'
      },
      header: {
        center: '<p>config.header.center source</p>\n',
        left: '<p>config.header.left source</p>\n',
        right: '<p>config.header.right source</p>\n'
      }
    });
  });

  it('does nothing if a nontrail state variable has changed', async () => {
    const listener = vi.fn();

    window.addEventListener('display-change', listener);
    window.dispatchEvent(
      new CustomEvent('state-change', {detail: {name: 'something-else'}})
    );

    // Need to wait here because the event dispatch doesn't happen immediately.

    await Promise.resolve();
    expect(listener).not.toBeCalled();
  });

  it('dispatches only one display-change event when multiple trail state changes happen in a tick', async () => {
    const listener = vi.fn();

    window.addEventListener('display-change', listener);
    window.dispatchEvent(
      new CustomEvent('state-change', {detail: {name: 'trail'}})
    );
    window.dispatchEvent(
      new CustomEvent('state-change', {detail: {name: 'trail'}})
    );

    // Need to wait here because the event dispatch doesn't happen immediately.

    await Promise.resolve();
    expect(listener).toBeCalledTimes(1);
  });

  it('dispatches a system-theme-change event when the system theme changes from light to dark', async () => {
    const listener = vi.fn();

    window.addEventListener('system-theme-change', listener);
    matchMediaMock.matches = true;
    matchMediaMock.addEventListener.mock.calls[0][1]({
      type: 'change',
      matches: true
    });

    // Need to wait here because the event dispatch doesn't happen immediately.

    await Promise.resolve();
    expect(listener.mock.calls).toEqual([
      [expect.objectContaining({detail: {theme: 'dark'}})]
    ]);
  });

  it('dispatches a system-theme-change event when the system theme changes from dark to light', async () => {
    const listener = vi.fn();

    window.addEventListener('system-theme-change', listener);
    matchMediaMock.matches = false;
    matchMediaMock.addEventListener.mock.calls[0][1]({
      type: 'change',
      matches: false
    });

    // Need to wait here because the event dispatch doesn't happen immediately.

    await Promise.resolve();
    expect(listener.mock.calls).toEqual([
      [expect.objectContaining({detail: {theme: 'light'}})]
    ]);
  });
});
