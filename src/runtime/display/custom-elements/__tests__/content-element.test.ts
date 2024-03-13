import {beforeAll, describe, expect, it, vi} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {ContentElement} from '../content-element';
import {fireEvent, render, screen, within} from '../../../../test-utils';

describe('<content-element>', () => {
	beforeAll(() => {
		defineElements({'content-element': ContentElement});
	});

	describe('its allChildInputsValid method', () => {
		it('returns true if there are no inputs', () => {
			render('<content-element><p>text</p></content-element>');

			const el = document.querySelector('content-element') as ContentElement;

			expect(el.allChildInputsValid()).toBe(true);
		});

		it('returns true if all inputs are valid', () => {
			render(`<content-element>
				<label>Required <input type="text" required /></label>
				<label>Not required <input type="text" /></label>
			</content-element>`);

			const el = document.querySelector('content-element') as ContentElement;

			(screen.getByLabelText('Required') as HTMLInputElement).value = 'test';
			expect(el.allChildInputsValid()).toBe(true);
		});

		it('returns false if an input is invalid', () => {
			render(`<content-element>
				<label>Required <input type="text" required /></label>
				<label>Not required <input type="text" /></label>
			</content-element>`);

			const el = document.querySelector('content-element') as ContentElement;

			expect(el.allChildInputsValid()).toBe(false);
		});
	});

	describe('its moveContentsOffscreen method', () => {
		it('returns an exact clone of its children', () => {
			const listener = vi.fn();

			render(`<content-element><button>test</button></content-element>`);
			(screen.getByRole('button') as HTMLButtonElement).addEventListener(
				'click',
				listener
			);

			const result = (
				document.querySelector('content-element') as ContentElement
			).moveContentsOffscreen();

			expect(listener).not.toBeCalled();
			fireEvent.click(within(result).getByRole('button'));
			expect(listener).toBeCalled();
		});

		it('maintains the existing HTML', () => {
			render(`<content-element><button>test</button></content-element>`);

			const el = document.querySelector('content-element') as ContentElement;

			el.moveContentsOffscreen();
			expect(el.innerHTML).toBe('<button>test</button>');
		});
	});
});
