import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {StateCssVariables} from '../state-css-variables';
import {dispatchStateChange, render} from '../../../../test-utils';
import {get} from '../../../state';

vi.mock('../../../state');

function cssVariable(name: string) {
	const el = document.querySelector('state-css-variables');

	if (!el) {
		return;
	}

	return window.getComputedStyle(el).getPropertyValue(name);
}

describe('<state-css-variables>', () => {
	const getMock = vi.mocked(get);

	beforeAll(() => {
		defineElements({
			'state-css-variables': StateCssVariables
		});
		getMock.mockImplementation((name: string) => {
			if (name === 'config.style.page.style.borderColor') {
				return 'test-border-color';
			}

			return undefined;
		});
	});

	beforeEach(() => render('<state-css-variables></state-css-variables>'));

	it('sets config.style.*.color variables', () => {
		dispatchStateChange('config.style.test.color', '#000 on #fff');
		expect(cssVariable('--test-background-color')).toBe('#fff');
		expect(cssVariable('--test-color')).toBe('#000');
		dispatchStateChange('config.style.test.nested.color', '#f0f on #0f0');
		expect(cssVariable('--test-nested-background-color')).toBe('#0f0');
		expect(cssVariable('--test-nested-color')).toBe('#f0f');
	});

	it('sets config.style.*.lineColor variables', () => {
		dispatchStateChange('config.style.test.lineColor', '#000');
		expect(cssVariable('--test-text-decoration-color')).toBe('#000');
		dispatchStateChange('config.style.test.nested.lineColor', '#fff');
		expect(cssVariable('--test-nested-text-decoration-color')).toBe('#fff');
	});

	it('sets config.style.*.font variables', () => {
		dispatchStateChange(
			'config.style.test.font',
			'test-font 18 bold italic small caps underline'
		);
		expect(cssVariable('--test-text-decoration')).toBe('underline');
		expect(cssVariable('--test-font-family')).toBe('"test-font"');
		expect(cssVariable('--test-font-size')).toBe('18px');
		expect(cssVariable('--test-font-style')).toBe('italic');
		expect(cssVariable('--test-text-transform')).toBe('lowercase');
		expect(cssVariable('--test-font-variant')).toBe('small-caps');
		expect(cssVariable('--test-font-weight')).toBe('bold');
		dispatchStateChange(
			'config.style.test.nested.font',
			'test-font 18 bold italic small caps underline'
		);
		expect(cssVariable('--test-nested-text-decoration')).toBe('underline');
		expect(cssVariable('--test-nested-font-family')).toBe('"test-font"');
		expect(cssVariable('--test-nested-font-size')).toBe('18px');
		expect(cssVariable('--test-nested-font-style')).toBe('italic');
		expect(cssVariable('--test-nested-text-transform')).toBe('lowercase');
		expect(cssVariable('--test-nested-font-variant')).toBe('small-caps');
		expect(cssVariable('--test-nested-font-weight')).toBe('bold');
	});

	it('sets config.style.backdrop', () => {
		dispatchStateChange('config.style.backdrop', '#fff');
		expect(cssVariable('--backdrop-color')).toBe('#fff');
	});

	it('sets config.style.page.fork.divider.size', () => {
		dispatchStateChange('config.style.page.fork.divider.size', 4);
		expect(cssVariable('--page-fork-divider-size')).toBe('4px');
	});

	it('sets config.style.page.fork.divider.style', () => {
		dispatchStateChange('config.style.page.fork.divider.style', 'test');
		expect(cssVariable('--page-fork-divider-style')).toBe('test');
	});

	it.each([
		['top', 'flex-start'],
		['center', 'center'],
		['bottom', 'flex-end']
	])(
		'when config.style.page.verticalAlign is set to %s, sets the variable to %s',
		(value, expected) => {
			dispatchStateChange('config.style.page.verticalAlign', value);
			expect(cssVariable('--page-current-passage-justify-content')).toBe(
				expected
			);
		}
	);

	describe.each([['border'], ['borderColor']])(
		'When config.style.page.style.%s is set',
		name =>
			it.each([
				['none', 'none', 'none'],
				['shadow', 'none', '0 4px 8px hsla(0, 0%, 0%, 0.25)'],
				['thick-line', '4px solid test-border-color', 'none'],
				['thin-line', '1px solid test-border-color', 'none']
			])(
				'to %s, sets border and shadow correctly',
				(value, expectedBorder, expectedShadow) => {
					dispatchStateChange(`config.style.page.style.${name}`, value);
					expect(cssVariable('--page-border')).toBe(expectedBorder);
					expect(cssVariable('--page-box-shadow')).toBe(expectedShadow);
				}
			)
	);

	it("ignores values that aren't strings or numbers", () => {
		dispatchStateChange('config.style.page.fork.divider.size', false);
		expect(cssVariable('--page-fork-divider-size')).toBe('');
		dispatchStateChange('config.style.page.fork.divider.size', ['4px']);
		expect(cssVariable('--page-fork-divider-size')).toBe('');
	});
});
