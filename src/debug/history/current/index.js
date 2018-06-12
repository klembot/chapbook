import Panel from '../../panel';
import walkthrough from '../walkthrough';
import html from './index.html';

export default class extends Panel {
	constructor(vars, restart) {
		super('Current', html);
		this.vars = vars;
		this.restart = restart;
		this.historyList = this.hook('history');
		this.hook('replay').addEventListener('click', () => {
			this.replayTo(this.historyList.selectedIndex);
		});
		this.vars.addListener('trail', () => this.update());
		this.update();
	}

	replayTo(index) {
		const breadcrumbs = this.vars.get('breadcrumbs').slice(0, index);
		const oldTransitionDuration = this.vars.get(
			'config.view.transitionDuration'
		);

		this.vars.set('config.view.transitionDuration', 0);
		this.restart(true);
		walkthrough(breadcrumbs)
			.then(
				() =>
					(this.hook('replay-status').innerHTML = 'Replay completed.')
			)
			.catch(
				e =>
					(this.hook(
						'replay-status'
					).innerHTML = `Replay failed: ${e}`)
			);
	}

	update() {
		const breadcrumbs = this.vars.get('breadcrumbs');

		this.historyList.innerHTML = this.vars
			.get('trail')
			.reduce(
				(out, current, index) =>
					out +
					`<option>${
						breadcrumbs[index - 1] &&
						current !== breadcrumbs[index - 1]
							? breadcrumbs[index - 1] + ' &rarr; ' + current
							: current
					}</option>`,
				''
			);
	}
}
