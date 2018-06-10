import test from 'ava';
import {stub} from 'sinon';
import Conditionals from './conditionals';
import Renderer from '../template/renderer';

let renderer;

test.beforeEach(() => {
	renderer = new Renderer();
	renderer.alarm = {update: () => {}};
	renderer.addModifier('conditionals', Conditionals);
});

test.afterEach(() => {
	if (window.testCall) {
		delete window.testCall;
	}
});

test('renders text conditionally with if', t => {
	let output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'if true'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello\n\nthere');

	output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'if false'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello');
});

test('renders text conditionally with unless', t => {
	let output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'unless true'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello');

	output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'unless false'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello\n\nthere');
});

test('inverts conditions with else', t => {
	let output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'if true'},
			{type: 'text', content: 'there'},
			{type: 'modifier', content: 'else'},
			{type: 'text', content: 'never seen'}
		]
	});

	t.is(output.markdown.trim(), 'Hello\n\nthere');

	output = renderer.render({
		blocks: [
			{type: 'text', content: 'Hello'},
			{type: 'modifier', content: 'if false'},
			{type: 'text', content: 'never seen'},
			{type: 'modifier', content: 'else'},
			{type: 'text', content: 'there'}
		]
	});

	t.is(output.markdown.trim(), 'Hello\n\nthere');
});

test('only evaluates a condition once with an else', t => {
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

	t.is(output.markdown.trim(), 'Hello\n\nthere');
	t.is(window.testCall.callCount, 1);
});

test('signals an error if else is used without a matching if', t => {
	let output = renderer.render({
		blocks: [
			{type: 'modifier', content: 'else'},
			{type: 'text', content: 'oops'}
		]
	});

	t.is(output.errors.length, 1);
});
