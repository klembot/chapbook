import {
	SpyInstance,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {createLoggers, log, mute, unmute, warn} from '../logger';

describe('createLoggers', () => {
	it('returns log and warn functions that come bound to a source', () => {
		const logMock = vi.spyOn(console, 'log');
		const warnMock = vi.spyOn(console, 'warn');
		const result = createLoggers('source');

		logMock.mockReturnValue(undefined);
		warnMock.mockReturnValue(undefined);
		unmute('source');
		result.log('log message');
		result.warn('warn message');
		expect(logMock.mock.calls).toEqual([['source: log message']]);
		expect(warnMock.mock.calls).toEqual([['source: warn message']]);
		logMock.mockRestore();
		warnMock.mockRestore();
	});
});

describe('log', () => {
	let logMock: SpyInstance;

	beforeEach(() => {
		unmute('source');
		logMock = vi.spyOn(console, 'log');
		logMock.mockReturnValue(undefined);
	});

	afterEach(() => {
		mute('source');
		logMock.mockRestore();
	});

	it('logs a message to the console', () => {
		log('source', 'message');
		expect(logMock.mock.calls).toEqual([['source: message']]);
	});

	it('dispatches a log-info message on the window', () => {
		const listener = vi.fn();

		window.addEventListener('log-info', listener);

		log('source', 'message');
		expect(listener).toBeCalledTimes(1);
		expect(listener).toBeCalledWith(
			expect.objectContaining({detail: {message: 'message', source: 'source'}})
		);
	});

	it('does nothing if the source has been muted', () => {
		const listener = vi.fn();

		window.addEventListener('log-info', listener);
		mute('source');
		log('source', 'message');
		expect(listener).not.toBeCalled();
		expect(logMock).not.toBeCalled();
	});
});

describe('warn', () => {
	let warnMock: SpyInstance;

	beforeEach(() => {
		unmute('source');
		warnMock = vi.spyOn(console, 'warn');
		warnMock.mockReturnValue(undefined);
	});

	afterEach(() => {
		mute('source');
		warnMock.mockRestore();
	});

	it('logs a warning to the console', () => {
		warn('source', 'message');
		expect(warnMock.mock.calls).toEqual([['source: message']]);
	});

	it('dispatches a log-warning message on the window', () => {
		const listener = vi.fn();

		window.addEventListener('log-warning', listener);

		warn('source', 'message');
		expect(listener).toBeCalledTimes(1);
		expect(listener).toBeCalledWith(
			expect.objectContaining({detail: {message: 'message', source: 'source'}})
		);
	});

	it('does nothing if the source has been muted', () => {
		const listener = vi.fn();

		window.addEventListener('log-warning', listener);
		mute('source');
		warn('source', 'message');
		expect(listener).not.toBeCalled();
		expect(warnMock).not.toBeCalled();
	});
});
