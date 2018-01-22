/* Functions for embedding images. */

module.exports = {
	unsplash(url, altText = '') {
		const id = url.replace(/.*\//, '');
		const width = document.querySelector('div.page').offsetWidth;
		const height = Math.round(width * 9 / 16);

		return `<img src="https://source.unsplash.com/${id}/${width}x${height}" width="${width}" height="${height}" alt="${altText}">`;
	}
};