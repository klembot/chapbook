/* Author functions for embedding images. */

import color from '../author/color';
import factoryFor from '../util/class-factory';

export class Image {
	constructor(url) {
		this.el = document.createElement('img');
		this.url(url);
		this.altText('');
		this.ratio(16 / 9);
	}

	altText(value) {
		this.el.setAttribute('alt', value);
		return this;
	}

	placeholder(_color) {
		this.el.style.backgroundColor = color(_color).toString() || color;
		return this;
	}

	url(value) {
		this.imgUrl = () => value;
		return this;
	}

	flickr(embedCode) {
		const url = /img src="(.+?)"/.exec(embedCode)[1];

		this.imgUrl = () => url;
		return this;
	}

	unsplash(url) {
		const id = url.replace(/.*\//, '');

		this.imgUrl = () =>
			`https://source.unsplash.com/${id}/${this.width}x${this.height}`;
		return this;
	}

	ratio(value) {
		const pageWidth = document.querySelector('div.page').offsetWidth;

		this.el.setAttribute('width', pageWidth);
		this.el.setAttribute('height', (pageWidth * 1) / value);
		return this;
	}

	toString() {
		this.el.setAttribute('src', this.imgUrl());
		return this.el.outerHTML;
	}
}

export default factoryFor(Image);
