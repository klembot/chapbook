import {escape} from 'lodash-es';
import {CustomElement} from '../../../util/custom-element';
import {
	addSnapshot,
	loadSnapshot,
	removeSnapshot,
	snapshotNames
} from '../../state-snapshots';
import './state-snapshots.css';

/**
 * Lists user-created state snapshots. This is available as
 * `<backstage-state-snapshots>` and is used in the Snapshots section of the
 * State backstage tab.
 */
export class StateSnapshots extends CustomElement {
	constructor() {
		super();
		this.delegate('click', '[data-add-snapshot]', () => {
			const name = window.prompt('Enter a name for this snapshot:');

			if (!name) {
				return;
			}

			if (snapshotNames().includes(name)) {
				window.alert('A snapshot already exists with this name.');
			} else {
				addSnapshot(name);
			}
		});
		this.delegate('click', '[data-remove]', ({target}) => {
			const name = (target as HTMLElement).dataset.remove;

			if (!name) {
				return;
			}

			if (
				window.confirm(
					`Are you sure you want to delete the snapshot "${name}"? This cannot be undone.`
				)
			) {
				removeSnapshot(name);
			}
		});
		this.delegate('click', '[data-restore]', ({target}) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			loadSnapshot((target as HTMLElement).dataset.restore!);
		});
	}

	connectedCallback() {
		this.defaultHtml(`
			<details open>
				<summary>Snapshots</summary>
				<div class="snapshots"></div>
				<button data-add-snapshot>Add Snapshot</button>
			</details>
		`);
		window.addEventListener('backstage-state-snapshots-update', this);
		this.update();
	}

	disconnectedCallback() {
		window.removeEventListener('backstage-state-snapshots-update', this);
	}

	handleEvent() {
		this.update();
	}

	update() {
		const snapshots = this.querySelector('.snapshots');

		if (!snapshots) {
			return;
		}

		snapshots.innerHTML = snapshotNames()
			.map(name => {
				const escapedName = escape(name);

				return `
					<div class="snapshot-button">
						<button data-restore="${escapedName}" aria-label="Restore '${escapedName}' snapshot">
							${escapedName}
						</button>
						<button data-remove="${escapedName}" aria-label="Remove '${escapedName}' snapshot">
							&times;
						</button>
					</div class="snapshot-button">
				`;
			})
			.join('');
	}
}
