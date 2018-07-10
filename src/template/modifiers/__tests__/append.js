import append from '../append';
import render from '../../render';

describe('append modifier', () => {
	test('causes text to appear with the previous block', () => {
		const output = render(
			{
				blocks: [
					{type: 'text', content: 'Hello'},
					{type: 'modifier', content: 'append'},
					{type: 'text', content: 'there'}
				],
				vars: []
			},
			[append]
		);

		expect(output.trim()).toBe('<p>Hello there</p>');
	});
});
