import event from './event';
import {get} from './state';

export const defaults = {
	'config.logger.show.parse': false,
	'config.logger.show.render': false,
	'config.logger.show.sound': false,
	'config.logger.show.state': false,
	'config.logger.show.story': false,
	'config.logger.show.style': false,
};

function prefix(text) {
	return text + ': ';
}

export function log(source, message) {
	if (get(`config.logger.show.${source}`)) {
		// eslint-disable-next-line no-console
		console.log(prefix(source) + message);
	}

	event.emit('log', {source, message});
}

export function warn(source, message) {
	console.warn(prefix(source) + message);
	event.emit('log-warning', {source, message});
}

export default function createLoggers(sourceName) {
	return {
		log(message) {
			log(sourceName, message);
		},

		warn(message) {
			warn(sourceName, message);
		},
	};
}

window.logger = {log, warn};
