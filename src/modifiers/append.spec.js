import {expect} from 'chai';
import Append from './append';
import Renderer from '../template/renderer';

describe('Append modifier', () => {
	let renderer = new Renderer();
	renderer.addModifier('append', Append);

	it('causes text to appear with the previous block', () => {
		const output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'append'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello there');
	});
});