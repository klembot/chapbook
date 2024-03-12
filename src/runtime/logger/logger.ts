function prefix(text: string) {
	return text + ': ';
}

/**
 * Logger sources that have been unmuted.
 */
const unmuted: Record<string, boolean> =
	process.env.NODE_ENV === 'production'
		? {inserts: true}
		: {inserts: true, state: true};

/**
 * Mutes a log source.
 */
export function mute(source: string) {
	unmuted[source] = false;
}

/**
 * Unmutes a log source. (We can't use state directly to track this because it
 * causes a circular dependency, since the state module uses logging.)
 */
export function unmute(source: string) {
	unmuted[source] = true;
}

/**
 * Logs information for source. This emits a `log-info` event on the window.
 */
export function log(source: string, message: string) {
	if (unmuted[source]) {
		// eslint-disable-next-line no-console
		console.log(prefix(source) + message);
		window.dispatchEvent(
			new CustomEvent('log-info', {detail: {message, source}})
		);
	}
}

/**
 * Logs a warning for a source. This emits a `log-warning` event on the window.
 */
export function warn(source: string, message: string) {
	if (unmuted[source]) {
		console.warn(prefix(source) + message);
		window.dispatchEvent(
			new CustomEvent('log-warning', {detail: {message, source}})
		);
	}
}

/**
 * Convenience function for creating loggers for a particular source.
 */
export function createLoggers(sourceName: string) {
	return {
		log(message: string) {
			log(sourceName, message);
		},

		warn(message: string) {
			warn(sourceName, message);
		}
	};
}
