import test from 'ava';
import Append from './append';
import Renderer from '../template/renderer';

test('causes text to appear with the previous block', t => {
	let renderer = new Renderer();

	renderer.alarm = {update: () => {}};
	renderer.addModifier('append', Append);

	const output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'append'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello there');
});
