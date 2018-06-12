/*
This is a lightweight Selenium-esque function to step through passage links sequentially.
*/

import {selectAll} from '../../util/dom-select';

export default function walkthrough(steps, opts = {}) {
	opts.maxFailures = opts.maxFailures || 20;
	opts.checkDelay = opts.checkDelay || 100;

	return new Promise((resolve, reject) => {
		let failures = 0;
		let currentStep = 0;

		function tryStep() {
			const link = selectAll(document.body, 'a[data-cb-passage]').find(
				l => l.innerText === steps[currentStep]
			);

			if (link) {
				failuresCount = 0;
				link.dispatchEvent(
					new MouseEvent('click', {
						view: window,
						bubbles: true,
						cancellable: true
					})
				);

				if (++currentStep < steps.length) {
					window.setTimeout(tryStep, opts.checkDelay);
				} else {
					resolve();
				}
			} else {
				if (++failures < opts.maxFailures) {
					window.setTimeout(tryStep, opts.checkDelay);
				} else {
					reject(
						`Could not find a link named "${steps[currentStep]}"`
					);
				}
			}
		}

		tryStep();
	});
}
