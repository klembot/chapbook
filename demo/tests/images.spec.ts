import {test, expect} from '@playwright/test';

test('Images', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Images'}).click();
	await expect(
		content.getByRole('img', {name: 'Placeholder image'})
	).toHaveAttribute('src', 'https://placehold.co/200');
	await expect(
		content.getByRole('img', {name: 'the Andromeda galaxy'})
	).toHaveAttribute(
		'src',
		'https://farm2.staticflickr.com/1857/43929816675_07357e53b0_m.jpg'
	);
	await expect(content.getByRole('img', {name: 'the moon'})).toHaveAttribute(
		'src',
		'https://source.unsplash.com/Na0BbqKbfAo/undefinedxundefined'
	);
});
