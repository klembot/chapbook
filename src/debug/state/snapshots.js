/* A panel displaying allowing the user to save and restore state snapshots. */

import cloneDeep from 'lodash.clonedeep';
import closest from 'closest';
import Panel from '../panel';
import html from './snapshots.html';

export default class extends Panel {
	constructor(vars, view, story, passage) {
		super('Snapshots', html);
		this.vars = vars;
		this.view = view;
		this.story = story;
		this.passage = passage;
		this.snapshots = {};
		this.restore();

		this.snapshotList = this.hook('snapshot-list');
		this.snapshotList.addEventListener('click', e => {
			const loadSnapshot = closest(e.target, '[data-load-snapshot]', true);

			if (loadSnapshot) {
				this.loadSnapshot(loadSnapshot.dataset.loadSnapshot);
				return;
			}

			const deleteSnapshot = closest(e.target, '[data-delete-snapshot]', true);

			if (
				deleteSnapshot &&
				window.confirm(
					`Are you sure you want to delete the snapshot "${
						deleteSnapshot.dataset.deleteSnapshot
					}"? This cannot be undone.`
				)
			) {
				this.removeSnapshot(deleteSnapshot.dataset.deleteSnapshot);
				return;
			}
		});

		this.hook('add-snapshot').addEventListener('click', () => {
			const name = window.prompt('Enter a name for this snapshot:');

			if (name) {
				this.addSnapshot(name);
			}
		});

		this.update();
	}

	update() {
		this.snapshotList.innerHTML = Object.keys(this.snapshots)
			.sort()
			.reduce(
				(result, current) =>
					result +
					`<div class="segmented-button block"><button data-load-snapshot="${current}" aria-label="Load snapshot &quot;${current}&quot;">${current}</button><button data-delete-snapshot="${current}" aria-label="Delete snapshot &quot;${current}&quot;" class="fixed"><strong>&times;</strong></button></div>`,
				''
			);
	}

	addSnapshot(name) {
		this.snapshots[name] = cloneDeep(this.vars.toJSON());
		this.update();
		this.save();
	}

	removeSnapshot(name) {
		delete this.snapshots[name];
		this.update();
		this.save();
	}

	loadSnapshot(name) {
		const snapshot = this.snapshots[name];

		if (!snapshot) {
			throw new Error(`There is no snapshot named "${name}".`);
		}

		/*
		Restore variables. We have to be careful here to create copies so that
		further changes don't alter the snapshot.
		*/

		Object.keys(this.snapshots[name].vars).forEach(k =>
			this.vars.set(k, cloneDeep(snapshot.vars[k]))
		);

		/* Re-display the last passage without altering the trail. */

		this.view.show(
			this.passage(snapshot.vars.trail[snapshot.vars.trail.length - 1])
		);
	}

	save() {
		window.localStorage.setItem(
			`cb-snapshots-${this.story.name}`,
			JSON.stringify(this.snapshots)
		);
	}

	restore() {
		const toRestore = window.localStorage.getItem(
			`cb-snapshots-${this.story.name}`
		);

		if (toRestore) {
			this.snapshots = JSON.parse(toRestore);
		}
	}
}
