/*
This exposes functionality to authors who would like to extend Chapbook via a
global named `engine`.
*/

import event from './event';
import {log, warn} from './logger';
import createLoggers from './logger';
import * as state from './state';
import * as story from './story';
import {render} from './template';

const {warn: extendWarn} = createLoggers('extensibility');

function parseVersion(value) {
	return value.split('.').map(window.parseInt);
}

export default function init() {
	window.engine = {
		extend(minimumEngineVersion, func) {
			const versionString = state.get('engine.version');
			const minVersion = parseVersion(minimumEngineVersion);
			const version = parseVersion(versionString);

			if (version[0] < minVersion[0]) {
				extendWarn(
					`The current engine version (${versionString}) has a lower major version than requested (${minimumEngineVersion}); skipping`
				);
				return;
			}

			if (version[0] > minVersion[0]) {
				extendWarn(
					`The current engine version (${versionString}) has a higher major version than requested (${minimumEngineVersion}); running code but you may encounter problems`
				);
			} else {
				/* Same major versions. */

				if (version[1] < minVersion[1]) {
					extendWarn(
						`The current engine version (${versionString}) has a lower minor version than requested (${minimumEngineVersion}); running code but you may encounter problems`
					);
				}

				if (
					version[1] === minVersion[1] &&
					version[2] < minVersion[2]
				) {
					extendWarn(
						`The current engine version (${versionString}) has a lower patch version than requested (${minimumEngineVersion}); running code but you may encounter problems`
					);
				}
			}

			func();
		},
		event,
		log,
		render,
		state,
		story,
		warn
	};
}
