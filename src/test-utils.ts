import {BodyContent} from './runtime/display/custom-elements/body-content';

export * from '@testing-library/dom';

export interface MockContentElementMethods {
	allChildInputsValid?: InstanceType<typeof BodyContent>['allChildInputsValid'];
	changeContent?: InstanceType<typeof BodyContent>['changeContent'];
}

export function dispatchStateChange(
	name: string,
	value: unknown,
	previous?: unknown
) {
	window.dispatchEvent(
		new CustomEvent('state-change', {detail: {name, previous, value}})
	);
}

export function mockContentElements(mockMethods?: MockContentElementMethods) {
	for (const el of document.querySelectorAll(
		'body-content, marginal-content'
	)) {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		(el as any).allChildInputsValid =
			mockMethods?.allChildInputsValid ?? (() => true);
		(el as any).changeContent =
			mockMethods?.changeContent ?? ((callback: any) => callback());
		/* eslint-enable @typescript-eslint/no-explicit-any */
	}
}

export function render(source: string) {
	document.body.innerHTML = source;
}
