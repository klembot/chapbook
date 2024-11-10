import {test, expect} from '@playwright/test';

test('Custom modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content.getByRole('link', {name: 'Custom modifier'}).click();
	await content.getByRole('link', {name: 'Test custom modifier'}).click();

	await expect(
		content.getByText('THIS TEXT SHOULD BE IN ALL UPPERCASE.')
	).toBeVisible();
	await expect(content.getByText('This text should not.')).toBeVisible();
});
