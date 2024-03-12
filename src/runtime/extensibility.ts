import {createLoggers, log, warn} from './logger';
import * as state from './state';
import * as story from './story';
import * as template from './template';

const {warn: extendWarn} = createLoggers('extensibility');

function parseVersion(value: string) {
	return value.split('.').map(window.parseInt);
}

/**
 * Exposes functionality to authors who would like to extend Chapbook via a
 * global named `engine`.
 */
export function initExtensibility() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window as any).engine = {
		extend(minimumEngineVersion: string, func: () => void) {
			const versionString = state.get('engine.version');

			if (typeof versionString !== 'string') {
				throw new Error(
					`engine.version has been set to a ${typeof versionString}, not a string.`
				);
			}

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
				// Same major versions

				if (version[1] < minVersion[1]) {
					extendWarn(
						`The current engine version (${versionString}) has a lower minor version than requested (${minimumEngineVersion}); running code but you may encounter problems`
					);
				}

				if (version[1] === minVersion[1] && version[2] < minVersion[2]) {
					extendWarn(
						`The current engine version (${versionString}) has a lower patch version than requested (${minimumEngineVersion}); running code but you may encounter problems`
					);
				}
			}

			func();
		},
		log,
		state,
		story,
		template,
		warn
	};
}
