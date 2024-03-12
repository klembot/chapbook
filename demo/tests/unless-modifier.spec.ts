import {test, expect} from '@playwright/test';

test('Unless modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Unless modifier'}).click();
	await expect(
		content.getByText('Count is greater than or equal to 5.')
	).toBeVisible();
	await expect(
		content.getByText('This text should appear always.')
	).toBeVisible();
	await expect(
		content.getByText('This text should not display.')
	).not.toBeVisible();
});
