import test from 'ava';
import Append from './append';
import render from '../template/render';

test('causes text to appear with the previous block', t => {
	const output = render(
		{
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'append'},
				{type: 'text', content: 'there'}
			]
		},
		[Append]
	);

	t.is(output.trim(), 'Hello there');
});
