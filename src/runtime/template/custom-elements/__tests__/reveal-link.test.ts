import {beforeAll, describe, expect, it, vi} from 'vitest';
import {
	fireEvent,
	mockContentElements,
	render,
	screen
} from '../../../../test-utils';
import * as story from '../../../story';
import {defineElements} from '../../../util/custom-element';
import {RevealLink} from '../reveal-link';

vi.spyOn(story, 'passageNamed').mockImplementation((name: string) => {
	switch (name) {
		case 'short passage':
			return {source: '*italicized*'} as story.Passage;
		case 'long passage':
			return {source: '*line 1*\n\nline 2'} as story.Passage;
	}

	return undefined;
});

describe('<reveal-link>', () => {
	beforeAll(() => {
		defineElements({'reveal-link': RevealLink});
	});

	it('shows its children', () => {
		render('<reveal-link text="test">child</reveal-link>');
		expect(screen.getByText('child')).toBeInTheDocument();
	});

	describe('when clicked', () => {
		describe('when it has a text attribute', () => {
			it('replaces itself with the rendered text inline if it contains no line breaks', () => {
				render(
					`<body-content><p>before <reveal-link text="**bold** text">link</reveal-link> after</p></body-content>`
				);
				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'link'}));
				expect(document.body.innerHTML).toBe(
					'<body-content><p>before <span><strong>bold</strong> text</span> after</p></body-content>'
				);
			});

			it('creates new paragraphs if the rendered text contains line breaks', () => {
				render(
					`<body-content><p>before <reveal-link text="line1\n\nline2">link</reveal-link> after</p></body-content>`
				);
				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'link'}));
				expect(document.body.innerHTML).toBe(
					'<body-content><p>before <span>line1</span></p>\n<p>line2 after</p></body-content>'
				);
			});
		});

		describe('when it has a passage attribute', () => {
			it('replaces itself with the rendered text inline if it contains no line breaks', () => {
				render(
					`<body-content><p>before <reveal-link passage="short passage">link</reveal-link> after</p></body-content>`
				);
				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'link'}));
				expect(document.body.innerHTML).toBe(
					'<body-content><p>before <span><em>italicized</em></span> after</p></body-content>'
				);
			});

			it('creates new paragraphs if the rendered text contains line breaks', () => {
				render(
					`<body-content><p>before <reveal-link passage="long passage">link</reveal-link> after</p></body-content>`
				);
				mockContentElements();
				fireEvent.click(screen.getByRole('button', {name: 'link'}));
				expect(document.body.innerHTML).toBe(
					'<body-content><p>before <span><em>line 1</em></span></p>\n<p>line 2 after</p></body-content>'
				);
			});
		});

		it('prefers the passage attribute to the text one', () => {
			render(
				`<body-content><p>before <reveal-link passage="short passage" text="text">link</reveal-link> after</p></body-content>`
			);
			mockContentElements();
			fireEvent.click(screen.getByRole('button', {name: 'link'}));
			expect(document.body.innerHTML).toBe(
				'<body-content><p>before <span><em>italicized</em></span> after</p></body-content>'
			);
		});

		it('does nothing if the passage attribute refers to a nonexistent passage', () => {
			render(
				`<body-content><p>before <reveal-link passage="bad">link</reveal-link> after</p></body-content>`
			);
			mockContentElements();
			fireEvent.click(screen.getByRole('button', {name: 'link'}));
			expect(document.body.innerHTML).toBe(
				'<body-content><p>before <reveal-link passage="bad" tabindex="0" role="button">link</reveal-link> after</p></body-content>'
			);
		});

		it('does nothing if it has neither a text or passage attribute', () => {
			render(
				`<body-content><p>before <reveal-link>link</reveal-link> after</p></body-content>`
			);
			mockContentElements();
			fireEvent.click(screen.getByRole('button', {name: 'link'}));
			expect(document.body.innerHTML).toBe(
				'<body-content><p>before <reveal-link tabindex="0" role="button">link</reveal-link> after</p></body-content>'
			);
		});
	});
});
