import {
	SpyInstance,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import * as state from '../../../state';
import {textInput} from '../text-input';
import {render, screen} from '../../../../test-utils';

describe('Text input insert', () => {
	let getSpy: SpyInstance;
	let setSpy: SpyInstance;

	beforeEach(() => {
		getSpy = vi.spyOn(state, 'get');
		setSpy = vi.spyOn(state, 'set');
	});

	afterEach(() => {
		getSpy.mockRestore();
		setSpy.mockRestore();
	});

	function renderInsert(
		variableName: string | null = null,
		required?: boolean
	) {
		render(
			textInput.render(
				variableName,
				{required},
				variableName ? `text input for: "${variableName}"` : 'text input'
			) ?? ''
		);
	}

	it('its invocation matches "text input"', () =>
		expect(textInput.match.test('text input')).toBe(true));

	describe('When rendering', () => {
		it('renders a text input wrapped in variable-binding with appropriate attributes', () => {
			renderInsert('variableName');

			const input = screen.getByRole('textbox');

			expect(input.closest('variable-binding')).toHaveAttribute(
				'name',
				'variableName'
			);
		});

		it("sets the input's value to the variable value if defined", () => {
			getSpy.mockImplementation((name: string) => {
				if (name === 'variableName') {
					return 123;
				}

				throw new Error(`Unexpected variable: ${name}`);
			});

			renderInsert('variableName');
			expect(screen.getByRole('textbox')).toHaveValue('123');
		});

		it('leaves the input blank if the variable is not defined', () => {
			getSpy.mockReturnValue(undefined);
			renderInsert('variableName');
			expect(screen.getByRole('textbox')).toHaveValue('');
		});

		it('gives the input a required attribute if required was set', () => {
			renderInsert(null, true);
			expect(screen.getByRole('textbox')).toBeRequired();
		});

		it("doesn't give the input a required attribute if required wasn't set", () => {
			renderInsert(null, false);
			expect(screen.getByRole('textbox')).not.toBeRequired();
		});
	});
});
