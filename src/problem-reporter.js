import escape from 'lodash.escape';

export default class {
	constructor(el, vars) {
		this.el = el;
		this.vars = vars;
		this.vars.default('config.problems.errorText', '<div class="system error fade-in"><p>A technical problem has occurred.</p><pre>%%%ERROR DETAIL%%%</pre><p>If you are unable to continue forward, then you may <a href="javascript:if(confirm(\'Are you sure you want to force restart? This will erase all saved progress.\')){localStorage&&localStorage.clear&&localStorage.clear();location.reload()}">force restart</a>.</p></div>');
		window.addEventListener('error', e => this.handleErrorEvent(e));
	}

	handleErrorEvent(e) {
		/*
		Marked will blame itself if rendering has problems, but it probably is
		our fault, so remove that pointer.
		*/
		
		const markedError = '\nPlease report this to https://github.com/chjj/marked.';

		try {
			let detail = '';

			if (e.error && e.error.stack) {
				detail = escape(e.error.stack.replace(markedError, ''));
			}
			else {
				detail = escape(e.message.replace(markedError, '')) +
					'\n[No stack trace available]';
			}

			this.el.innerHTML = this.el.innerHTML +
				this.vars.get('config.problems.errorText').replace(
					'%%%ERROR DETAIL%%%',
					detail
				);	
			e.preventDefault();
		}
		catch (e) {
			/* Things have gotten really screwy-- at least log the error. */

			console.log(e);
		}
	}
}