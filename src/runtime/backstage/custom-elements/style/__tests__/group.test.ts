import {beforeAll, describe, expect, it} from 'vitest';
import {render, screen} from '../../../../../test-utils';
import {defineElements} from '../../../../util/custom-element';
import {StyleGroup} from '../group';
import {VariableInput} from '../../variable-input';

describe('<backstage-style-group>', () => {
	beforeAll(() => {
		defineElements({
			'backstage-style-group': StyleGroup,
			'backstage-variable-input': VariableInput
		});
	});

	it.each([
		['font', 'Font', 'font'],
		['color', 'Color', 'color'],
		['link font', 'Link Font', 'link.font'],
		['link color', 'Link Color', 'link.color'],
		['link line color', 'Link Line Color', 'link.lineColor'],
		['active link font', 'Active Link Font', 'link.active.font'],
		['active link color', 'Active Link Color', 'link.active.color'],
		[
			'active link line color',
			'Active Link Line Color',
			'link.active.lineColor'
		]
	])(
		'shows a <backstage-variable-input> related to %s',
		(_, label, varName) => {
			render(
				'<backstage-style-group title="test-title" prefix="test-prefix"></backstage-style-group>'
			);

			const font = screen.getByRole('textbox', {name: label});
			const input = font.closest('backstage-variable-input');

			expect(input).not.toBeNull();
			expect(input).toHaveAttribute(
				'name',
				`config.style.test-prefix.${varName}`
			);
			expect(input).toHaveAttribute('string');
		}
	);
});
