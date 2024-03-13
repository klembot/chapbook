import {describe, expect, it} from 'vitest';
import {embedYouTubeVideo} from '../embed-youtube-video';
import {render} from '../../../../test-utils';

describe('Embed YouTube insert', () => {
	function renderInsert(
		src = 'https://www.youtube.com/watch?v=9bZkp7q19f0',
		props: Record<string, boolean> = {}
	) {
		render(embedYouTubeVideo.render(src, props, '') ?? '');
	}

	describe('its invocation', () => {
		it('matches "embed YouTube video"', () =>
			expect(embedYouTubeVideo.match.test('embed YouTube video')).toBe(true));

		it('matches "embed YouTube"', () =>
			expect(embedYouTubeVideo.match.test('embed YouTube')).toBe(true));
	});

	it('embeds a YouTube video based on the source provided', () => {
		renderInsert();

		const iframe = document.querySelector('iframe');

		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute(
			'src',
			expect.stringContaining(
				'https://www.youtube-nocookie.com/embed/9bZkp7q19f0'
			)
		);
	});

	it("doesn't loop the video by default", () => {
		renderInsert();
		expect(document.querySelector('iframe')).not.toHaveAttribute(
			'src',
			expect.stringContaining('loop=1')
		);
	});

	it('adds a loop parameter to the video if specified', () => {
		renderInsert('https://www.youtube.com/watch?v=9bZkp7q19f0', {loop: true});
		expect(document.querySelector('iframe')).toHaveAttribute(
			'src',
			expect.stringContaining('loop=1')
		);
	});

	it("doesn't autoplay the video by default", () => {
		renderInsert();
		expect(document.querySelector('iframe')).not.toHaveAttribute(
			'src',
			expect.stringContaining('autoplay=1')
		);
	});

	it('adds a loop parameter to the video if specified', () => {
		renderInsert('https://www.youtube.com/watch?v=9bZkp7q19f0', {
			autoplay: true
		});
		expect(document.querySelector('iframe')).toHaveAttribute(
			'src',
			expect.stringContaining('autoplay=1')
		);
	});
});
