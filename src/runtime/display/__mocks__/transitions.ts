import {vi} from 'vitest';

export const none = vi.fn((el: HTMLElement, html: string) => {
	return new Promise<void>(resolve => {
		el.innerHTML = html;
		resolve();
	});
});

export const fadeInOut = none;
export const crossfade = none;

export const transition = vi.fn((el: HTMLElement, html: string) => {
	return none(el, html);
});
