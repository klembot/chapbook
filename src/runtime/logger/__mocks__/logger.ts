import {vi} from 'vitest';

export const createLoggers = () => ({log: vi.fn(), warn: vi.fn()});
export const log = vi.fn();
export const mute = vi.fn();
export const unmute = vi.fn();
