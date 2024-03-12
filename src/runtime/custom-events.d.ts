/**
 * This defines the custom events used by Chapbook. See the source code for a
 * definitive list.
 * @packageDocumentation
 */

/**
 * The `detail` property of a `log-info` or `log-warning` custom event.
 */
export interface LogEventDetail {
	/**
	 * Log message.
	 */
	message: string;
	/**
	 * Source of the log event.
	 */
	source: string;
}

/**
 * The `detail` property of a `display-change` custom event.
 */
export interface DisplayChangeEventDetail {
	/**
	 * HTML to show in the body.
	 */
	body: string;
	footer: {
		/**
		 * HTML to show in the center part of the footer.
		 */
		center: string;
		/**
		 * HTML to show in the left part of the footer.
		 */
		left: string;
		/**
		 * HTML to show in the right part of the footer.
		 */
		right: string;
	};
	header: {
		/**
		 * HTML to show in the center part of the header.
		 */
		center: string;
		/**
		 * HTML to show in the left part of the header.
		 */
		left: string;
		/**
		 * HTML to show in the right part of the header.
		 */
		right: string;
	};
}

/**
 * The `detail` property of a `state-change` custom event.
 */
export interface StateChangeEventDetail {
	/**
	 * Name of the variable that has changed.
	 */
	name: string;
	/**
	 * Previous value of the variable, if any exists.
	 */
	previous?: Settable;
	/**
	 * Current value of the variable.
	 */
	value: Settable;
}

declare global {
	// Allows automatic typing of event listeners.
	// See https://43081j.com/2020/11/typed-events-in-typescript

	interface WindowEventHandlersEventMap {
		'backstage-state-recorder-update': CustomEvent;
		'backstage-state-snapshots-update': CustomEvent;
		'body-content-change': CustomEvent;
		'log-info': CustomEvent<LogEventDetail>;
		'log-warning': CustomEvent<LogEventDetail>;
		'display-change': CustomEvent<DisplayChangeEventDetail>;
		'page-skip-indicator-show': CustomEvent;
		'page-skip-indicator-hide': CustomEvent;
		'state-change': CustomEvent<StateChangeEventDetail>;
		'state-reset': CustomEvent;
	}
}
