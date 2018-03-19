/*
Handles reporting problems to the user. This mainly is designed to handle the
warnings and errors coming from a Renderer instance, but it also listens for
uncaught JS exceptions.
*/

import escape from 'lodash.escape';

export default class {
	constructor(el, vars) {
		this.el = el;
		this.vars = vars;
		this.vars.default(
			'config.alarm.forceRestartMessage',
			'<p>If you are unable to continue forward, then you may <a href="javascript:if(confirm(\'Are you sure you want to force restart? This will erase all saved progress.\')){localStorage&&localStorage.clear&&localStorage.clear();location.reload()}">force restart</a>.</p>'
		);
		this.vars.default('config.alarm.enabled', true);
		this.warnings = [];
		this.errors = [];
		window.addEventListener('error', e => this.handleErrorEvent(e));
	}

	update(errors, warnings) {
		this.errors = errors;
		this.warnings = warnings;
		this.render();
	}

	addError(err) {
		this.errors.push(err);
		this.render();
	}

	addWarning(warn) {
		this.warnings.push(warn);
		this.render();
	}

	render() {
		let result = '';

		if (this.vars.get('config.alarm.enabled')) {
			this.errors.forEach((err, index) => {
				result += `<div class="system error">${err}`;

				if (index === this.errors.length - 1) {
					result += this.vars.get('config.alarm.forceRestartMessage');
				}

				result += '</div>';
			});

			if (this.vars.get('testing')) {
				this.warnings.forEach(warn => {
					result += `<div class="system warning">${warn}</div>`;
				});
			}
		}

		this.el.innerHTML = result;
	}

	handleErrorEvent(e) {
		/*
		Marked will blame itself if rendering has problems, but it probably is
		our fault, so remove that pointer.
		*/

		const markedError =
			'\nPlease report this to https://github.com/chjj/marked.';

		try {
			let detail = '';

			if (e.error && e.error.stack) {
				detail = e.error.stack;
			} else {
				detail = e.message + '\n[No stack trace available]';
			}

			detail = detail.replace(markedError, '');
			this.addError(
				`<p>An unexpected problem has occurred.</p><pre>${escape(detail)}</pre>`
			);
			e.preventDefault();
		} catch (e) {
			/* Things have gotten really screwy-- at least log the error. */

			console.log(e);
		}
	}
}
