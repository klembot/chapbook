import leftPad from 'left-pad';
import {get} from './state';

export const defaults = {
	'config.logger.show.parse': false,
	'config.logger.show.render': false,
	'config.logger.show.state': true,
	'config.logger.show.style': true
};

function prefix(text) {
	return leftPad(text, 10) + ' \u2502 ';
}

export function log(source, message) {
	if (get(`config.logger.show.${source}`)) {
		console.log(prefix(source) + message);
	}
}

export function warn(source, message) {
	console.warn(prefix(source) + message);
}

export function error(source, message) {
	console.error(prefix(source) + message);
}

export default function createLoggers(sourceName) {
	return {
		log(message) {
			log(sourceName, message);
		},

		warn(message) {
			warn(sourceName, message);
		},

		error(message) {
			error(sourceName, message);
		}
	};
}
