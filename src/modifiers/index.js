const Conditionals = require('./conditionals');
const Continue = require('./continue');

module.exports = {
	addBuiltins(renderer) {
		renderer.addModifier('conditionals', Conditionals);
		renderer.addModifier('continue', Continue);
	}
}