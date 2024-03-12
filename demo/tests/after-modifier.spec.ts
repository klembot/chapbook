import {test, expect} from '@playwright/test';

test('After modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'After modifier'}).click();
	await expect(
		content.getByText('This text appears immediately')
	).toBeVisible();
	await expect(content.getByText('after 2 seconds')).toBeVisible();
	await expect(content.getByText('after 3 seconds')).toBeVisible();
	await expect(content.getByText('after 4 seconds')).toBeVisible();
});
