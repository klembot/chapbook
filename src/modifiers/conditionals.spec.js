import {expect} from 'chai';
import {stub} from 'sinon';
import Conditionals from './conditionals';
import Renderer from '../template/renderer';

describe('Conditional modifier', () => {
	let renderer;

	beforeEach(() => {
		renderer = new Renderer();
		renderer.alarm = {update: () => {}};
		renderer.addModifier('conditionals', Conditionals);
	});

	afterEach(() => {
		if (window.testCall) {
			delete window.testCall;
		}
	});

	it('renders text conditionally with if', () => {
		let output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'if true'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello\n\nthere');

		output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'if false'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello');
	});

	it('renders text conditionally with unless', () => {
		let output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'unless true'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello');

		output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'unless false'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello\n\nthere');
	});

	it('inverts conditions with else', () => {
		let output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'if true'},
				{type: 'text', content: 'there'},
				{type: 'modifier', content: 'else'},
				{type: 'text', content: 'never seen'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello\n\nthere');

		output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'if false'},
				{type: 'text', content: 'never seen'},
				{type: 'modifier', content: 'else'},
				{type: 'text', content: 'there'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello\n\nthere');
	});

	it('only evaluates a condition once with an else', () => {
		window.testCall = stub().returns(true);

		let output = renderer.render({
			blocks: [
				{type: 'text', content: 'Hello'},
				{type: 'modifier', content: 'if window.testCall()'},
				{type: 'text', content: 'there'},
				{type: 'modifier', content: 'else'},
				{type: 'text', content: 'never seen'}
			]
		});

		expect(output.markdown.trim()).to.equal('Hello\n\nthere');
		expect(window.testCall.callCount).to.equal(1);
	});

	it('signals an error if else is used without a matching if', () => {
		let output = renderer.render({
			blocks: [
				{type: 'modifier', content: 'else'},
				{type: 'text', content: 'oops'}
			]
		});

		expect(output.errors.length).to.equal(1);
	});
});
