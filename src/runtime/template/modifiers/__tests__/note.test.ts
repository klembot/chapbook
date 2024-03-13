import {describe, expect, it} from 'vitest';
import {ModifierOutput} from '../types';
import {noteModifier} from '../note';

describe('Note modifier', () => {
	describe('its invocation', () => {
		it('matches "note"', () =>
			expect(noteModifier.match.test('note')).toBe(true));
		it('matches "n.b."', () =>
			expect(noteModifier.match.test('n.b.')).toBe(true));
		it('matches "note to myself"', () =>
			expect(noteModifier.match.test('note to myself')).toBe(true));
		it('matches "todo"', () =>
			expect(noteModifier.match.test('todo')).toBe(true));
		it('matches "fixme"', () =>
			expect(noteModifier.match.test('fixme')).toBe(true));
	});

	it('removes all text from the output', () => {
		const output: ModifierOutput = {
			startsNewParagraph: true,
			text: 'One line\n\nTwo lines'
		};

		noteModifier.process?.(output, {invocation: 'note', state: {}});
		expect(output).toEqual({
			startsNewParagraph: true,
			text: ''
		});
	});
});
