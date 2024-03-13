import {beforeAll, describe, expect, it, vi} from 'vitest';
import {dispatchStateChange, render, screen} from '../../../../../test-utils';
import {get} from '../../../../state';
import {defineElements} from '../../../../util/custom-element';
import {StyleConfig} from '../config';

vi.mock('../../../../state');

describe('<backstage-style-config>', () => {
	const getMock = vi.mocked(get);
	const label =
		'Enter this code into your first passage’s variables section to permanently use this style:';

	beforeAll(() => {
		defineElements({'backstage-style-config': StyleConfig});
		getMock.mockImplementation((name: string) => `${name}-value`);
	});

	it('displays a read-only textarea showing how to set the current style in variables', () => {
		render('<backstage-style-config></backstage-config>');
		expect(screen.getByRole('textbox', {name: label}))
			.toHaveValue(`config.style.page.font: "config.style.page.font-value"
config.style.page.color: "config.style.page.color-value"
config.style.page.link.font: "config.style.page.link.font-value"
config.style.page.link.color: "config.style.page.link.color-value"
config.style.page.link.lineColor: "config.style.page.link.lineColor-value"
config.style.page.link.active.font: "config.style.page.link.active.font-value"
config.style.page.link.active.color: "config.style.page.link.active.color-value"
config.style.page.link.active.lineColor: "config.style.page.link.active.lineColor-value"
config.style.page.header.font: "config.style.page.header.font-value"
config.style.page.header.color: "config.style.page.header.color-value"
config.style.page.header.link.font: "config.style.page.header.link.font-value"
config.style.page.header.link.color: "config.style.page.header.link.color-value"
config.style.page.header.link.lineColor: "config.style.page.header.link.lineColor-value"
config.style.page.header.link.active.font: "config.style.page.header.link.active.font-value"
config.style.page.header.link.active.color: "config.style.page.header.link.active.color-value"
config.style.page.header.link.active.lineColor: "config.style.page.header.link.active.lineColor-value"
config.style.page.footer.font: "config.style.page.footer.font-value"
config.style.page.footer.color: "config.style.page.footer.color-value"
config.style.page.footer.link.font: "config.style.page.footer.link.font-value"
config.style.page.footer.link.color: "config.style.page.footer.link.color-value"
config.style.page.footer.link.lineColor: "config.style.page.footer.link.lineColor-value"
config.style.page.footer.link.active.font: "config.style.page.footer.link.active.font-value"
config.style.page.footer.link.active.color: "config.style.page.footer.link.active.color-value"
config.style.page.footer.link.active.lineColor: "config.style.page.footer.link.active.lineColor-value"`);
	});

	it('updates when state changes', () => {
		render('<backstage-style-config></backstage-config>');
		expect(
			screen.getByRole<HTMLTextAreaElement>('textbox', {name: label}).value
		).toContain('config.style.page.color: "config.style.page.color-value"');
		getMock.mockImplementation((name: string) => `${name}-value-changed`);
		dispatchStateChange('config.style.page.color', 'ignored');
		expect(
			screen.getByRole<HTMLTextAreaElement>('textbox', {name: label}).value
		).toContain(
			'config.style.page.color: "config.style.page.color-value-changed"'
		);
	});

	it('omits undefined state variables', () => {
		getMock.mockImplementation((name: string) => {
			if (name === 'config.style.page.color') {
				return 'red';
			}

			return undefined;
		});

		render('<backstage-style-config></backstage-config>');
		expect(screen.getByRole('textbox', {name: label})).toHaveValue(
			'config.style.page.color: "red"'
		);
	});
});
