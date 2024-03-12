import {StateChangeEventDetail} from '../../custom-events';
import {get} from '../../state';
import {CustomElement} from '../../util/custom-element';
import './warning-list.css';

/**
 * Intercepts calls to `console.warn` and displays them if `config.testing` is
 * true in state. When the `trail` state variable changes, this list is emptied.
 * This is available as `<warning-list>`.
 */
export class WarningList extends CustomElement {
	warnings: string[];
	#originalWarn: unknown;

	constructor() {
		super();
		this.warnings = [];
	}

	connectedCallback() {
		window.addEventListener('state-change', this);
		this.spyOnWarnings();
		this.update();
	}

	disconnectedCallback() {
		window.removeEventListener('state-change', this);
		this.unspyOnWarnings();
	}

	handleEvent(event: Event) {
		if (event.type !== 'state-change') {
			return;
		}

		if (
			(event as CustomEvent<StateChangeEventDetail>).detail.name === 'trail'
		) {
			this.warnings = [];
			this.update();
		}
	}

	spyOnWarnings() {
		this.#originalWarn = console.warn;

		console.warn = (...messages) => {
			this.warnings.push(...messages);
			this.update();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(this.#originalWarn as any).apply(this.#originalWarn, messages);
		};
	}

	unspyOnWarnings() {
		if (this.#originalWarn) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			console.warn = this.#originalWarn as any;
		}
	}

	update() {
		if (!this.isConnected) {
			return;
		}

		if (this.warnings.length > 0 && get('config.testing')) {
			this.removeAttribute('hidden');
			this.innerHTML = `<ul>${this.warnings
				.map(warning => `<li>Warning: ${warning}</li>`)
				.join('')}</ul>`;
		} else {
			this.setAttribute('hidden', '');
		}
	}
}
