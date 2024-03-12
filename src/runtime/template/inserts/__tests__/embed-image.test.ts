import {describe, expect, it} from 'vitest';
import {embedImage} from '../embed-image';
import {render, screen} from '../../../../test-utils';

describe('Image insert', () => {
	function renderInsert(props: Record<string, string> = {}) {
		render(embedImage.render('test-image-url', props, '') ?? '');
	}

	describe('its invocation', () => {
		it('matches "embed image"', () =>
			expect(embedImage.match.test('embed image')).toBe(true));
	});

	it('renders an image based on the source provided', () => {
		renderInsert();
		expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image-url');
	});

	it('assigns other properties to the image tag as specified', () => {
		renderInsert({alt: 'alt-text'});
		expect(screen.getByRole('img')).toHaveAttribute('alt', 'alt-text');
	});

	it('returns nothing if not provided a URL', () => {
		embedImage.render('', {}, '');
		expect(document.body.innerHTML).toBe('');
	});
});
