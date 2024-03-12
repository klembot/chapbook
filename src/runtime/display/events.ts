import {get} from '../state';
import {passageNamed} from '../story';
import {render} from '../template';
import {coalesceCalls} from '../util';

const collectStateChanges = coalesceCalls<boolean[]>(calls => {
	if (calls.some(call => call[0])) {
		// The trail has changed. Render content and emit a page-change event.
		const trail = get('trail');

		if (!Array.isArray(trail)) {
			throw new Error('The trail variable has been set to a non-array value.');
		}

		const passageName = trail[trail.length - 1];

		if (typeof passageName !== 'string') {
			throw new Error('The last value in the trail variable is not a string.');
		}

		const passage = passageNamed(trail[trail.length - 1]);

		if (!passage) {
			throw new Error(
				`There is no passage named "${trail[trail.length - 1]}".`
			);
		}

		const body = render(passage.source);
		const marginals = {
			footer: {
				center: '',
				left: '',
				right: ''
			},
			header: {
				center: '',
				left: '',
				right: ''
			}
		};

		for (const marginal in marginals) {
			for (const part in marginals[marginal as 'header' | 'footer']) {
				marginals[marginal as 'header' | 'footer'][
					part as 'center' | 'left' | 'right'
				] = render((get(`config.${marginal}.${part}`) as object).toString());
			}
		}

		window.dispatchEvent(
			new CustomEvent('display-change', {detail: {body, ...marginals}})
		);
	}
});

/**
 * Sets up a listener that emits `display-change` events with rendered content
 * when the trail state variable changes.
 */
export function initDisplayEvents() {
	window.addEventListener('state-change', ({detail}) => {
		collectStateChanges(detail.name === 'trail');
	});
}
