const Append = require('./append');
const Conditionals = require('./conditionals');
const Continue = require('./continue');

module.exports = {
	addBuiltins(renderer) {
		renderer.addModifier('append', Append);
		renderer.addModifier('conditionals', Conditionals);
		renderer.addModifier('continue', Continue);
	}
}