/**
 * Coalesces multiple calls to a function during one execution context into a
 * single one. This assists with handling events that would lead to rendering,
 * for example-- we only want to render to the DOM once, even if there are
 * multiple changes occurring that, by themselves, would trigger a re-render.
 *
 * Recommended reading:
 * - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_%3E4ms
 * - https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
 */
export function coalesceCalls<T extends unknown[]>(
	func: (coalescedCalls: T[]) => void
) {
	let calls: T[] = [];
	let scheduled = false;

	return async (...args: T) => {
		if (!scheduled) {
			scheduled = true;

			// Changing this then() to an async function causes calls to get lost.

			Promise.resolve().then(() => {
				try {
					func(calls);
					calls = [];
					scheduled = false;
				} catch (error) {
					// Escape from the promise chain so that global error handlers can see
					// the error.

					window.setTimeout(() => {
						throw error;
					});
				}
			});
		}

		calls.push(args);
	};
}
