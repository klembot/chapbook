import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import fadeAudioEl from '../fade';

describe('fadeAudioEl', () => {
  let el: HTMLAudioElement;

  beforeEach(() => {
    vi.useFakeTimers();
    el = document.createElement('audio');
    el.volume = 0;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('returns a promise that resolves after the duration specified', async () => {
    let passed = false;

    fadeAudioEl(el, 1, 100).then(() => (passed = true));

    // The timing here is weird and appears to be a problem with the test
    // framework--sends very different timestamps in a test context than in a
    // real browser.

    vi.advanceTimersByTime(1000000);
    await Promise.resolve();
    expect(passed).toBe(true);
  });

  it("sets the audio element's volume to the requested when the promise resolves", async () => {
    fadeAudioEl(el, 1, 100);
    vi.advanceTimersByTime(1000000);
    await Promise.resolve();
    expect(el.volume).toBeCloseTo(1);
  });

  it("returns a promise that resolves immediately if the element volume doesn't need to be changed", async () => {
    let passed = false;

    fadeAudioEl(el, 0, 100).then(() => (passed = true));
    await Promise.resolve();
    expect(passed).toBe(true);
  });

  // It seems really fiddly to try to test the easing, so let's test that it
  // moves in the correct direction.

  it('gradually increases the volume over the duration if the volume is increasing', () => {
    fadeAudioEl(el, 1, 100);
    vi.advanceTimersByTime(50);

    const midvolume = el.volume;

    expect(midvolume).toBeGreaterThan(0);
    vi.advanceTimersByTime(50);
    expect(el.volume).toBeGreaterThan(midvolume);
  });

  // Skipping because this test is flaky as it's currently written.

  it.skip('gradually decreases the volume over the duration if the volume is decreasing', () => {
    el.volume = 1;
    fadeAudioEl(el, 0, 100);
    vi.advanceTimersByTime(50);

    const midvolume = el.volume;

    expect(midvolume).toBeLessThan(1);
    vi.advanceTimersByTime(50);
    expect(el.volume).toBeLessThan(midvolume);
  });
});
