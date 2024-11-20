import {test, expect} from '@playwright/test';

test('If/else modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content.getByRole('link', {name: 'If/else modifier'}).click();
	await expect(
		content.getByText('This text should not appear.')
	).not.toBeVisible();
	await expect(
		content.getByText('Count is greater than or equal to 5.')
	).toBeVisible();
	await expect(
		content.getByText('This text should appear always.')
	).toBeVisible();
});
