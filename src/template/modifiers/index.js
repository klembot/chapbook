import After from './after';
import Append from './append';
import Conditionals from './conditionals';
import Continue from './continue';

export function addBuiltins(renderer) {
	renderer.addModifier('after', After);
	renderer.addModifier('append', Append);
	renderer.addModifier('conditionals', Conditionals);
	renderer.addModifier('continue', Continue);
}
