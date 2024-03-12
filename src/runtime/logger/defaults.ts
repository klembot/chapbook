/**
 * State defaults. We can't set these in our module, because that would create a
 * circular dependency; instead, we do it in index.ts.
 */
export const loggerDefaults = {
	'config.logger.show.parse': false,
	'config.logger.show.render': false,
	'config.logger.show.sound': false,
	'config.logger.show.state': false,
	'config.logger.show.story': false,
	'config.logger.show.style': false
};
