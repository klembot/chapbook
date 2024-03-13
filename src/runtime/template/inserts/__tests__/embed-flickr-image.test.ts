import {describe, expect, it} from 'vitest';
import {embedFlickrImage} from '../embed-flickr-image';
import {render, screen} from '../../../../test-utils';

describe('Flickr image insert', () => {
	function renderInsert(props: Record<string, string> = {}) {
		render(
			embedFlickrImage.render(
				`<a data-flickr-embed="true" href="https://www.flickr.com/photos/britishlibrary/11141228463/in/album-72157638733975756/" title="British Library digitised image from page 128 of &quot;The Poems of Sir John Suckling. (Edited by John Gray and decorated by C. Ricketts.)&quot;"><img src="https://live.staticflickr.com/2808/11141228463_817016a3d2.jpg" width="452" height="395" alt="British Library digitised image from page 128 of &quot;The Poems of Sir John Suckling. (Edited by John Gray and decorated by C. Ricketts.)&quot;"/></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
				`,
				props,
				''
			) ?? ''
		);
	}

	describe('its invocation', () => {
		it('matches "embed Flickr image"', () =>
			expect(embedFlickrImage.match.test('embed Flickr image')).toBe(true));

		it('matches "embed Flickr"', () =>
			expect(embedFlickrImage.match.test('embed Flickr')).toBe(true));
	});

	it('renders an image based on the embed code provided', () => {
		renderInsert();
		expect(screen.getByRole('img')).toHaveAttribute(
			'src',
			'https://live.staticflickr.com/2808/11141228463_817016a3d2.jpg'
		);
	});

	it('assigns other properties to the image tag as specified', () => {
		renderInsert({alt: 'alt-text'});
		expect(screen.getByRole('img')).toHaveAttribute('alt', 'alt-text');
	});

	it('returns nothing if not provided an embed code', () => {
		embedFlickrImage.render('', {}, '');
		expect(document.body.innerHTML).toBe('');
	});
});
