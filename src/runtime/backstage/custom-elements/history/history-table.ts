import {escape} from 'lodash-es';
import {Settable} from '../../../state';
import {CustomElement} from '../../../util/custom-element';
import {HistoryMoment, getHistory, rewindTo} from '../../state-recorder';
import './history-table.css';

function parseHistory(history: HistoryMoment[]) {
	// Group the history items by passage navigation.

	const result = [];
	let varChanges: {name: string; value: Settable}[] = [];
	let passageName: string | undefined;

	history.forEach(({change}, index) => {
		if (change.name === 'trail') {
			const trail = change.value as string[];

			result.push({
				historyIndex: index - 1,
				passage: passageName,
				varChanges
			});
			varChanges = [];
			passageName = trail[trail.length - 1];
		} else {
			// We need to create separate entries instead of just an object, so
			// that if a variable changes multiple times under one passage, we see
			// that.

			varChanges.push({name: change.name, value: change.value});
		}
	});

	result.push({
		historyIndex: history.length - 1,
		passage: passageName,
		varChanges
	});
	return result;
}

/**
 * A custom element that shows a table of passage navigation changes and
 * associated state changes, and allows the user to rewind backward to a
 * particular point in time. This is available as `<backstage-history-table>`
 * and is used in the History backstage tab.
 *
 * It listens to `backstage-state-recorder-update` events dispatched on `window`
 * and updates accordingly.
 */
export class HistoryTable extends CustomElement {
	root = document.createElement('div');

	constructor() {
		super();
		this.delegate('click', 'button[data-rewind]', (_, button) => {
			const index = parseInt(button.dataset.rewind ?? '');

			if (!isNaN(index)) {
				rewindTo(index);
			}
		});
	}

	connectedCallback() {
		window.addEventListener('backstage-state-recorder-update', this);
		this.update();
	}

	disconnectedCallback() {
		window.removeEventListener('backstage-state-recorder-update', this);
	}

	handleEvent() {
		this.update();
	}

	update() {
		this.innerHTML = parseHistory(getHistory()).reduce(
			(result, {historyIndex, passage, varChanges}) => {
				result += `
					<button
						data-rewind="${historyIndex}"
						aria-label="Rewind to ${passage ? escape(passage) : 'Startup'}">&#x21aa;
					${
						passage ? escape(passage) : '<em>Startup</em>'
					}</button><table><thead><tr><th>Variable</th><th>Value</th></thead><tbody>`;

				for (const change of varChanges) {
					result += `
						<tr>
							<td>${escape(change.name)}</td><td>${escape(JSON.stringify(change.value))}</td>
						</tr>`;
				}

				return result + '</tbody></table>';
			},
			''
		);
	}
}
