import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {ExternalFonts} from '../external-fonts';
import {render} from '../../../../test-utils';
import {get} from '../../../state';

vi.mock('../../../state');

describe('<external-fonts>', () => {
	const getMock = vi.mocked(get);

	beforeAll(() => {
		defineElements({'external-fonts': ExternalFonts});
	});

	beforeEach(() => {
		getMock.mockImplementation((name: string) => {
			switch (name) {
				case 'config.style.fonts':
					return {
						test: {
							name: 'test-name',
							url: 'test-url.ttf'
						},
						test2: {
							name: 'test2-name',
							url: 'test2-url.ttf'
						}
					};
				case 'config.style.fonts.test.name':
					return 'test-name';
				case 'config.style.fonts.test.url':
					return 'test-url.ttf';
				default:
					return undefined;
			}
		});
	});

	describe.each([
		['googleFont', 'google'],
		['typekitFont', 'typekit']
	])('When set config.style.%s is set', (type, selector) => {
		it('loads CSS as-is if set', () => {
			render('<external-fonts></external-fonts');
			expect(document.querySelector(`[data-${selector}]`)).toHaveTextContent(
				''
			);
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {
						name: `config.style.${type}`,
						value: `mock-font-${type}-css`
					}
				})
			);
			expect(document.querySelector(`[data-${selector}]`)).toHaveTextContent(
				`mock-font-${type}-css`
			);
		});

		it('ignores non-string values', () => {
			render('<external-fonts></external-fonts');
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {
						name: `config.style.${type}`,
						value: false
					}
				})
			);
			expect(document.querySelector(`[data-${selector}]`)).toHaveTextContent(
				''
			);
		});
	});

	it('loads and defines an external font when set', () => {
		render('<external-fonts></external-fonts');
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {
					name: 'config.style.fonts.test.name',
					value: 'test-name'
				}
			})
		);
		expect(document.querySelector('style[data-url-test]')?.innerHTML).toBe(
			'@font-face { font-family: "test-name"; src: url("test-url.ttf") format("ttf"); }'
		);
	});

	it('reuses the same element if changing the font URL for an existing one', () => {
		render('<external-fonts></external-fonts');
		for (let i = 0; i < 2; i++) {
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {
						name: 'config.style.fonts.test.name',
						value: 'test-name'
					}
				})
			);
		}
		expect(document.querySelectorAll('style').length).toBe(1);
	});

	it.each([['config'], ['config.style'], ['config.style.fonts']])(
		'loads all external fonts when %s is set',
		name => {
			render('<external-fonts></external-fonts');
			window.dispatchEvent(
				new CustomEvent('state-change', {
					detail: {name, value: 'ignored'}
				})
			);
			expect(document.querySelector('style[data-url-test]')?.innerHTML).toBe(
				'@font-face { font-family: "test-name"; src: url("test-url.ttf") format("ttf"); }'
			);
			expect(document.querySelector('style[data-url-test2]')?.innerHTML).toBe(
				'@font-face { font-family: "test2-name"; src: url("test2-url.ttf") format("ttf"); }'
			);
		}
	);
});
