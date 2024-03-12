import {test, expect} from '@playwright/test';

test('Basic JavaScript', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'JavaScript'}).click();
	page.on('dialog', async dialog => {
		expect(dialog.message()).toEqual('Hello');
		await dialog.accept();
	});

	await content.getByRole('link', {name: 'Test basic JavaScript'}).click();
});

test('Display content using JavaScript', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'JavaScript'}).click();
	await content
		.getByRole('link', {name: 'Display content using JavaScript'})
		.click();
	await expect(content.getByText('This should count to 10:')).toBeVisible();
	await expect(
		content.getByText('1… 2… 3… 4… 5… 6… 7… 8… 9… 10…')
	).toBeVisible();
});
