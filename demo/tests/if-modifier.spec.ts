import {test, expect} from '@playwright/test';

test('If modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'If modifier'}).click();
	await expect(content.getByText('Count is greater than 1.')).toBeVisible();
	await expect(content.getByText('Count is less than 10.')).toBeVisible();
	await expect(content.getByText('Count is equal to 5.')).toBeVisible();
	await expect(
		content.getByText('This text should not display.')
	).not.toBeVisible();
	await expect(
		content.getByText('This text is visible in all cases.')
	).toBeVisible();
});
