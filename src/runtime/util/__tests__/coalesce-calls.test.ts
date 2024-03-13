import {describe, expect, it, vi} from 'vitest';
import {coalesceCalls} from '../coalesce-calls';

describe('coalesceCalls', () => {
	it('creates a function that receives all calls in a microtask queue in a single array', async () => {
		const spy = vi.fn();
		const test = coalesceCalls(spy);

		test(1);
		test(2);
		expect(spy).not.toHaveBeenCalled();
		await Promise.resolve();
		expect(spy).toBeCalledTimes(1);
		expect(spy).toBeCalledWith([[1], [2]]);
	});

	it('calls the original function multiple times if there are calls across microtask queues', async () => {
		const spy = vi.fn();
		const test = coalesceCalls(spy);

		test(1);
		await Promise.resolve();
		test(2);
		await Promise.resolve();
		expect(spy).toBeCalledTimes(2);
		expect(spy).toBeCalledWith([[1]]);
		expect(spy).toBeCalledWith([[2]]);
	});

	it('rethrows an error outside of the current microtask queue if the function itself throws', async () => {
		const error = new Error();
		const thrower = () => {
			throw error;
		};
		const test = coalesceCalls(thrower);
		const setTimeoutSpy = vi
			.spyOn(window, 'setTimeout')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.mockReturnValue(0 as any);

		test();
		await Promise.resolve();
		expect(setTimeoutSpy).toBeCalledTimes(1);
		expect(setTimeoutSpy.mock.calls[0][0]).toThrow(error);
	});
});
