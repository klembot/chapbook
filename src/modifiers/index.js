const After = require('./after');
const Append = require('./append');
const Conditionals = require('./conditionals');
const Continue = require('./continue');

module.exports = {
	addBuiltins(renderer) {
		renderer.addModifier('after', After);
		renderer.addModifier('append', Append);
		renderer.addModifier('conditionals', Conditionals);
		renderer.addModifier('continue', Continue);
	}
}