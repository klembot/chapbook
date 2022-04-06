/*
A tiny utility function that coalesces multiple calls to a function during
one execution context into a single one. This assists with handling events
that would lead to rendering, for example-- we only want to render to the DOM
once, even if there are multiple changes occurring that, by themselves, would
trigger a re-render.

Recommended reading:
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_%3E4ms
- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
*/

export default function coalesceCalls(func) {
	let calls = [];
	let scheduled = false;

	return (...args) => {
		if (!scheduled) {
			scheduled = true;
			Promise.resolve().then(() => {
				try {
					func(calls);
				} catch (e) {
					/*
					Escape from the promise chain so that global error handlers,
					e.g. the problems module, will see the error.
					*/

					window.setTimeout(() => {
						throw e;
					}, 0);
				}

				calls = [];
				scheduled = false;
			});
		}

		calls.push(args);
	};
}
