import {describe, expect, it} from 'vitest';
import {embedUnsplashImage} from '../embed-unsplash-image';
import {render, screen} from '../../../../test-utils';

describe('Unsplash image insert', () => {
	function renderInsert(
		src = 'https://unsplash.com/photos/xtgONQzGgOE',
		width = '100',
		height = '150',
		props: Record<string, string> = {}
	) {
		render(embedUnsplashImage.render(src, {width, height, ...props}, '') ?? '');
	}

	describe('its invocation', () => {
		it('matches "embed Unsplash image"', () =>
			expect(embedUnsplashImage.match.test('embed Unsplash image')).toBe(true));

		it('matches "embed Unsplash"', () =>
			expect(embedUnsplashImage.match.test('embed Unsplash')).toBe(true));
	});

	it('renders an image based on the source and dimensions provided', () => {
		renderInsert();
		expect(screen.getByRole('img')).toHaveAttribute(
			'src',
			'https://source.unsplash.com/xtgONQzGgOE/100x150'
		);
	});

	it('assigns other properties to the image tag as specified', () => {
		renderInsert('https://unsplash.com/photos/xtgONQzGgOE', '20', '50', {
			alt: 'alt-text'
		});

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('height', '50');
		expect(image).toHaveAttribute('width', '20');
		expect(image).toHaveAttribute('alt', 'alt-text');
	});

	it('returns nothing if not provided an embed code', () => {
		embedUnsplashImage.render('', {height: '0', width: '0'}, '');
		expect(document.body.innerHTML).toBe('');
	});
});
